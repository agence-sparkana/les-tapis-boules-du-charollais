import { NextResponse } from "next/server";
import { client, writeClient } from "@/lib/sanity/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { tapisId } = await request.json();

    if (!tapisId) {
      return NextResponse.json({ error: "tapisId requis" }, { status: 400 });
    }

    // Récupérer le tapis et les infos client
    const tapis = await client.fetch(
      `*[_type == "tapis" && _id == $id][0]{
        _id, name, prix, diametre, statut,
        reservedByEmail, reservedByName
      }`,
      { id: tapisId }
    );

    if (!tapis) {
      return NextResponse.json({ error: "Tapis introuvable" }, { status: 404 });
    }

    // Patcher Sanity : statut → vendu
    await writeClient
      .patch(tapisId)
      .set({ statut: "vendu" })
      .commit();

    const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
    const madeleineEmail = process.env.MADELEINE_EMAIL || "madeleinebenifei@gmail.com";
    const priceFormatted = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(tapis.prix);

    // Email au client
    if (tapis.reservedByEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: tapis.reservedByEmail,
        subject: `Virement reçu — ${tapis.name}`,
        html: `
          <h2>Votre virement a été reçu !</h2>
          <p>Merci ${tapis.reservedByName || ""} ! Votre paiement pour le tapis <strong>${tapis.name}</strong> (${priceFormatted}) a bien été reçu.</p>
          <p>Votre tapis sera expédié sous <strong>3 à 5 jours ouvrés</strong> depuis Rigny-sur-Arroux, Bourgogne.</p>
          <p>Vous recevrez un email avec le numéro de suivi dès l'expédition.</p>
          <br/>
          <p>Cordialement,<br/>Madeleine Benifei<br/>Les Tapis Boules du Charollais</p>
        `,
      });
    }

    // Email à Madeleine
    await resend.emails.send({
      from: fromEmail,
      to: madeleineEmail,
      subject: `Commande confirmée — ${tapis.name} à expédier`,
      html: `
        <h2>Virement reçu — commande confirmée</h2>
        <p><strong>Tapis :</strong> ${tapis.name} (Ø${tapis.diametre}cm) — ${priceFormatted}</p>
        <p><strong>Client :</strong> ${tapis.reservedByName || "?"} (${tapis.reservedByEmail || "?"})</p>
        <p>Le tapis est maintenant marqué comme <strong>vendu</strong>. À expédier !</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CONFIRMER-VIREMENT] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la confirmation" },
      { status: 500 }
    );
  }
}
