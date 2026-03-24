import { NextResponse } from "next/server";

// En production : import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderRequest {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  diametre: number;
  client: {
    nom: string;
    email: string;
    telephone?: string;
    adresse?: string;
  };
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json();
    const { productName, price, diametre, client } = body;

    if (!client.nom || !client.email) {
      return NextResponse.json(
        { error: "Nom et email requis" },
        { status: 400 }
      );
    }

    // ============================================
    // COORDONNÉES BANCAIRES — À REMPLIR PAR MADELEINE
    // ============================================
    const rib = {
      titulaire: "Madeleine Benifei",
      iban: "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
      bic: "XXXXXXXX",
      banque: "À compléter",
    };

    const priceFormatted = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);

    // ============================================
    // EMAIL 1 : Confirmation au client
    // ============================================
    // En production avec Resend :
    // await resend.emails.send({
    //   from: 'Les Tapis Boules <commandes@lestapisboules-du-charollais.fr>',
    //   to: client.email,
    //   subject: `Commande confirmée — ${productName}`,
    //   html: `...`
    // });
    console.log(`[VIREMENT] Email client → ${client.email}`, {
      subject: `Commande confirmée — ${productName}`,
      contenu: `
        Bonjour ${client.nom},

        Merci pour votre commande du tapis "${productName}" (Ø${diametre}cm) — ${priceFormatted}.

        Pour finaliser votre achat, veuillez effectuer un virement bancaire :

        Titulaire : ${rib.titulaire}
        IBAN : ${rib.iban}
        BIC : ${rib.bic}
        Banque : ${rib.banque}
        Montant : ${priceFormatted}
        Référence : ${productName}

        Votre tapis est réservé 48h. Passé ce délai sans réception du virement,
        il sera remis en vente.

        Cordialement,
        Madeleine Benifei
        Les Tapis Boules du Charollais
      `,
    });

    // ============================================
    // EMAIL 2 : Notification à Madeleine
    // ============================================
    // En production avec Resend :
    // await resend.emails.send({
    //   from: 'Boutique <notifications@lestapisboules-du-charollais.fr>',
    //   to: 'madeleinebenifei@gmail.com',
    //   subject: `Nouvelle commande — ${productName}`,
    //   html: `...`
    // });
    console.log(`[VIREMENT] Email Madeleine → madeleinebenifei@gmail.com`, {
      subject: `Nouvelle commande — ${productName}`,
      contenu: `
        Nouvelle commande reçue !

        Tapis : ${productName} (Ø${diametre}cm) — ${priceFormatted}

        Client :
        - Nom : ${client.nom}
        - Email : ${client.email}
        - Téléphone : ${client.telephone || "Non renseigné"}
        - Adresse : ${client.adresse || "Non renseignée"}

        En attente du virement. Le tapis est réservé 48h.
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[VIREMENT] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la commande" },
      { status: 500 }
    );
  }
}
