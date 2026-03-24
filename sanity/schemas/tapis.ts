import { defineType, defineField } from "sanity";

export default defineType({
  name: "tapis",
  title: "Tapis",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom du tapis",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      options: {
        list: [
          { title: "Naturelle", value: "naturelle" },
          { title: "Teintée", value: "teintee" },
        ],
        layout: "radio",
      },
      initialValue: "naturelle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "diametre",
      title: "Diamètre (cm)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "prix",
      title: "Prix (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "statut",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Réservé", value: "réservé" },
          { title: "Vendu", value: "vendu" },
        ],
      },
      initialValue: "disponible",
      description:
        "Géré automatiquement par le site. Vous pouvez passer manuellement à 'vendu' quand le virement est reçu.",
    }),
    defineField({
      name: "reservedUntil",
      title: "Réservé jusqu'au",
      type: "datetime",
      description: "Date d'expiration de la réservation (48h après commande).",
    }),
    defineField({
      name: "reservedByEmail",
      title: "Email du client",
      type: "string",
      description: "Email du client qui a réservé ce tapis.",
    }),
    defineField({
      name: "reservedByName",
      title: "Nom du client",
      type: "string",
      description: "Nom du client qui a réservé ce tapis.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "statut",
      media: "photos.0",
    },
    prepare({ title, subtitle, media }) {
      const emoji =
        subtitle === "disponible"
          ? "🟢"
          : subtitle === "réservé"
          ? "🟠"
          : "🔴";
      return {
        title: `${emoji} ${title}`,
        subtitle: `${subtitle}`,
        media,
      };
    },
  },
});
