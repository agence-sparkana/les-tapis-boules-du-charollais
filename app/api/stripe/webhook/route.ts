import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: import("stripe").Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const productId = session.metadata?.product_id;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const shippingAddress = (session as Record<string, unknown>).shipping_details as { address?: { line1?: string; postal_code?: string; city?: string } } | undefined;

    if (!productId) {
      console.error("Pas de product_id dans les metadata");
      return NextResponse.json({ received: true });
    }

    try {
      const { supabaseAdmin } = await import("@/lib/supabase/client");
      const { writeClient } = await import("@/lib/sanity/client");

      // 1. Supabase : status → completed
      await supabaseAdmin
        .from("reservations")
        .update({ status: "completed" })
        .eq("product_id", productId)
        .eq("status", "pending");

      // 2. Sanity : statut → vendu
      await writeClient
        .patch(productId)
        .set({ statut: "vendu" })
        .commit();

      // 3. Récupérer les infos du tapis
      const tapis = await writeClient.fetch(
        `*[_type == "tapis" && _id == $id][0]{ name, prix, diametre }`,
        { id: productId }
      );

      // 4. Email confirmation au client
      if (customerEmail && process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.RESEND_FROM || "commandes@lestapisboules-du-charollais.fr",
          to: customerEmail,
          subject: "Votre tapis est confirmé — Les Tapis Boules du Charollais",
          html: `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F7F2EA;">
              <h1 style="font-family: 'Lora', serif; color: #3D2010; font-size: 24px;">Merci ${customerName || ""} !</h1>
              <p style="color: #7A6250; line-height: 1.6;">
                Votre commande est confirmée. Madeleine prépare votre tapis avec soin
                avant de vous l'expédier depuis son atelier en Bourgogne.
              </p>
              <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #D9CCBB;">
                <p style="color: #3D2010; font-weight: 600; margin: 0 0 8px;">${tapis?.name || "Votre tapis"}</p>
                <p style="color: #7A6250; margin: 0;">Diamètre : ${tapis?.diametre || "—"} cm</p>
                <p style="color: #7A4E2D; font-weight: 700; font-size: 18px; margin: 8px 0 0;">${tapis?.prix || "—"} €</p>
              </div>
              <p style="color: #7A6250; font-size: 14px; line-height: 1.6;">
                Pour toute question, contactez Madeleine :<br>
                <a href="mailto:madeleinebenifei@gmail.com" style="color: #7A4E2D;">madeleinebenifei@gmail.com</a>
                — 06 23 01 67 22
              </p>
              <hr style="border: none; border-top: 1px solid #D9CCBB; margin: 24px 0;">
              <p style="color: #7A6250; font-size: 12px;">
                Les Tapis Boules du Charollais — Laine cardée feutrée 100% Bourgogne
              </p>
            </div>
          `,
        });

        // 5. Email notification à Madeleine
        const addr = shippingAddress?.address;
        const addressText = addr
          ? `${addr.line1}, ${addr.postal_code} ${addr.city}`
          : "Non renseignée";

        await resend.emails.send({
          from: process.env.RESEND_FROM || "commandes@lestapisboules-du-charollais.fr",
          to: process.env.MADELEINE_EMAIL || "madeleinebenifei@gmail.com",
          subject: `Nouvelle commande — ${tapis?.name || "Tapis"}`,
          html: `
            <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
              <h1 style="font-family: 'Lora', serif; color: #3D2010;">Nouvelle commande !</h1>
              <div style="background: #F7F2EA; border-radius: 12px; padding: 20px; margin: 16px 0;">
                <p><strong>Tapis :</strong> ${tapis?.name || "—"}</p>
                <p><strong>Prix :</strong> ${tapis?.prix || "—"} €</p>
                <p><strong>Client :</strong> ${customerName || "—"} (${customerEmail || "—"})</p>
                <p><strong>Adresse :</strong> ${addressText}</p>
              </div>
            </div>
          `,
        });
      }
    } catch (error) {
      console.error("Erreur traitement webhook:", error);
    }
  }

  return NextResponse.json({ received: true });
}
