import { NextResponse } from "next/server";

interface ReserverRequest {
  tapisId: string;
  clientNom: string;
  clientEmail: string;
  clientTel?: string;
  clientAdresse?: string;
}

export async function POST(request: Request) {
  try {
    const { client, writeClient } = await import("@/lib/sanity/client");
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body: ReserverRequest = await request.json();
    const { tapisId, clientNom, clientEmail, clientTel, clientAdresse } = body;

    if (!tapisId || !clientNom || !clientEmail) {
      return NextResponse.json(
        { error: "tapisId, clientNom et clientEmail sont requis" },
        { status: 400 }
      );
    }

    const tapis = await client.fetch(
      `*[_type == "tapis" && _id == $id][0]{ _id, name, statut, prix, diametre }`,
      { id: tapisId }
    );

    if (!tapis) {
      return NextResponse.json({ error: "Tapis introuvable" }, { status: 404 });
    }

    if (tapis.statut !== "disponible") {
      return NextResponse.json(
        { error: "Ce tapis n'est plus disponible" },
        { status: 409 }
      );
    }

    const now = new Date();
    const reservedUntil = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    await writeClient
      .patch(tapisId)
      .set({
        statut: "réservé",
        reservedUntil: reservedUntil.toISOString(),
        reservedByEmail: clientEmail,
        reservedByName: clientNom,
      })
      .commit();

    const priceFormatted = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(tapis.prix);

    const dateExpiration = reservedUntil.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";
    const madeleineEmail = process.env.MADELEINE_EMAIL || "madeleinebenifei@gmail.com";

    await resend.emails.send({
      from: fromEmail,
      to: madeleineEmail,
      subject: `Nouvelle commande — ${tapis.name}`,
      html: `
        <h2>Nouvelle commande reçue !</h2>
        <p><strong>Tapis :</strong> ${tapis.name} (Ø${tapis.diametre}cm) — ${priceFormatted}</p>
        <hr/>
        <p><strong>Client :</strong></p>
        <ul>
          <li>Nom : ${clientNom}</li>
          <li>Email : ${clientEmail}</li>
          <li>Téléphone : ${clientTel || "Non renseigné"}</li>
          <li>Adresse : ${clientAdresse || "Non renseignée"}</li>
        </ul>
        <hr/>
        <p>Le client doit virer avant le <strong>${dateExpiration}</strong>.</p>
        <p>Référence : <strong>${tapisId}</strong></p>
      `,
    });

    const ribNom = process.env.MADELEINE_RIB_NOM || "Madeleine Benifei";
    const ribIban = process.env.MADELEINE_RIB_IBAN || "FR76 XXXX XXXX XXXX XXXX XXXX XXX";
    const ribBic = process.env.MADELEINE_RIB_BIC || "XXXXXXXX";

    await resend.emails.send({
      from: fromEmail,
      to: clientEmail,
      subject: `Votre réservation — ${tapis.name}`,
      html: `
        <h2>Merci pour votre commande !</h2>
        <p>Votre tapis <strong>${tapis.name}</strong> (Ø${tapis.diametre}cm) est réservé jusqu'au <strong>${dateExpiration}</strong>.</p>
        <p><strong>Prix : ${priceFormatted}</strong></p>
        <hr/>
        <h3>Coordonnées bancaires</h3>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Titulaire</td><td>${ribNom}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">IBAN</td><td>${ribIban}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">BIC</td><td>${ribBic}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Référence</td><td>${tapisId}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Montant</td><td>${priceFormatted}</td></tr>
        </table>
        <hr/>
        <p>⚠️ Sans virement avant le ${dateExpiration}, le tapis sera remis en vente.</p>
        <br/>
        <p>Cordialement,<br/>Madeleine Benifei<br/>Les Tapis Boules du Charollais</p>
      `,
    });

    return NextResponse.json({
      success: true,
      reservedUntil: reservedUntil.toISOString(),
      tapisName: tapis.name,
      tapisPrix: tapis.prix,
    });
  } catch (error) {
    console.error("[RESERVER] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la réservation" },
      { status: 500 }
    );
  }
}
