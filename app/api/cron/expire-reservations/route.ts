import { NextRequest, NextResponse } from "next/server";

// Cron job Vercel : exécuté quotidiennement
// Vérifie les réservations expirées (>48h) et les libère

export async function GET(req: NextRequest) {
  // Vérifier le secret pour sécuriser l'endpoint
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { supabaseAdmin } = await import("@/lib/supabase/client");
    const { writeClient } = await import("@/lib/sanity/client");

    // Récupérer les réservations pending dont expires_at est passé
    const { data: expired, error } = await supabaseAdmin
      .from("reservations")
      .select("id, product_id")
      .eq("status", "pending")
      .lt("expires_at", new Date().toISOString());

    if (error) {
      console.error("Erreur récupération réservations expirées:", error);
      return NextResponse.json({ error: "Erreur BDD" }, { status: 500 });
    }

    if (!expired || expired.length === 0) {
      return NextResponse.json({ message: "Aucune réservation expirée", count: 0 });
    }

    let freedCount = 0;

    for (const reservation of expired) {
      try {
        // Passer le status à "expired" dans Supabase
        await supabaseAdmin
          .from("reservations")
          .update({ status: "expired" })
          .eq("id", reservation.id);

        // Remettre le produit en "disponible" dans Sanity
        await writeClient
          .patch(reservation.product_id)
          .set({ statut: "disponible", reservedAt: null })
          .commit();

        freedCount++;
      } catch (err) {
        console.error(
          `Erreur libération réservation ${reservation.id}:`,
          err
        );
      }
    }

    return NextResponse.json({
      message: `${freedCount} réservation(s) libérée(s)`,
      count: freedCount,
    });
  } catch (error) {
    console.error("Erreur cron expire-reservations:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
