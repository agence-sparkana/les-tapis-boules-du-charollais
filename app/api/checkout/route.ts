import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe non configuré" },
        { status: 503 }
      );
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { productId, productName, price } = await req.json();

    if (!productId || !productName || !price) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productName,
              description: "Tapis en laine feutrée — Pièce unique",
              images: [`${siteUrl}/hero-tapis.jpg`],
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_id: productId,
      },
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU"],
      },
      success_url: `${siteUrl}/commande/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur checkout:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
