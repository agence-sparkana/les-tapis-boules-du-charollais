import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, sessionId } = await req.json();

    if (!productId || !sessionId) {
      return NextResponse.json(
        { error: "productId et sessionId requis" },
        { status: 400 }
      );
    }

    const { writeClient } = await import("@/lib/sanity/client");
    const { supabaseAdmin } = await import("@/lib/supabase/client");

    // Vérifier que le produit est disponible dans Sanity
    const tapis = await writeClient.fetch(
      `*[_type == "tapis" && _id == $id][0]{ statut }`,
      { id: productId }
    );

    if (!tapis) {
      return NextResponse.json(
        { error: "Tapis introuvable" },
        { status: 404 }
      );
    }

    if (tapis.statut !== "disponible") {
      return NextResponse.json(
        { error: "Ce tapis n'est plus disponible" },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();

    // Créer la réservation dans Supabase
    const { data: reservation, error: dbError } = await supabaseAdmin
      .from("reservations")
      .insert({
        product_id: productId,
        session_id: sessionId,
        reserved_at: now,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Erreur Supabase:", dbError);
      return NextResponse.json(
        { error: "Erreur lors de la réservation" },
        { status: 500 }
      );
    }

    // Mettre à jour le statut dans Sanity
    await writeClient
      .patch(productId)
      .set({ statut: "réservé", reservedAt: now })
      .commit();

    return NextResponse.json({
      success: true,
      reservationId: reservation.id,
      reservedAt: now,
    });
  } catch (error) {
    console.error("Erreur réservation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
