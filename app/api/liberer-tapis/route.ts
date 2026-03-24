import { NextResponse } from "next/server";
import { client, writeClient } from "@/lib/sanity/client";
export async function GET(request: Request) {
  // Vérifier le secret cron (Vercel envoie le header Authorization)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const now = new Date().toISOString();

    // Trouver tous les tapis réservés dont la réservation a expiré
    const expiredTapis = await client.fetch(
      `*[_type == "tapis" && statut == "réservé" && reservedUntil < $now]{
        _id, name, prix, diametre,
        reservedByEmail, reservedByName, reservedUntil
      }`,
      { now }
    );

    if (expiredTapis.length === 0) {
      return NextResponse.json({ message: "Aucune réservation expirée", freed: 0 });
    }

    const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

    for (const tapis of expiredTapis) {
      // Remettre le tapis en disponible
      await writeClient
        .patch(tapis._id)
        .set({ statut: "disponible" })
        .unset(["reservedUntil", "reservedByEmail", "reservedByName"])
        .commit();

      // Notifier le client que sa réservation a expiré
      if (tapis.reservedByEmail) {
        await resend.emails.send({
          from: fromEmail,
          to: tapis.reservedByEmail,
          subject: `Réservation expirée — ${tapis.name}`,
          html: `
            <h2>Votre réservation a expiré</h2>
            <p>Bonjour ${tapis.reservedByName || ""}, votre réservation pour le tapis <strong>${tapis.name}</strong> a expiré car nous n'avons pas reçu votre virement dans le délai de 48h.</p>
            <p>Le tapis est remis en vente. Si vous souhaitez toujours l'acquérir, vous pouvez le réserver à nouveau sur notre site.</p>
            <br/>
            <p>Cordialement,<br/>Madeleine Benifei<br/>Les Tapis Boules du Charollais</p>
          `,
        });
      }

      console.log(`[CRON] Libéré : ${tapis.name} (${tapis._id})`);
    }

    return NextResponse.json({
      message: `${expiredTapis.length} tapis libéré(s)`,
      freed: expiredTapis.length,
      details: expiredTapis.map((t: { _id: string; name: string }) => ({
        id: t._id,
        name: t.name,
      })),
    });
  } catch (error) {
    console.error("[CRON-LIBERER] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la libération" },
      { status: 500 }
    );
  }
}
