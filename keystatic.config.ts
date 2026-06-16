import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "gaelle-and-zelie/kerflow",
  },
  collections: {
    blog: collection({
      label: "Articles du blog",
      path: "src/content/blog/*",
      slugField: "title",
      format: "json",
      columns: ["title", "tag", "date"],
      schema: {
        title: fields.slug({
          name: {
            label: "Titre",
            validation: { isRequired: true },
          },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
        tag: fields.text({
          label: "Catégorie",
          validation: { isRequired: true },
        }),
        date: fields.text({
          label: "Date",
          description: "Exemple : Juin 2026",
          validation: { isRequired: true },
        }),
        readingTime: fields.text({
          label: "Temps de lecture",
          description: "Exemple : 4 min",
          validation: { isRequired: true },
        }),
        excerpt: fields.text({
          label: "Résumé court",
          multiline: true,
          validation: { isRequired: true },
        }),
        imageClass: fields.select({
          label: "Couleur de l'image",
          defaultValue: "t-sand",
          options: [
            { label: "Sable", value: "t-sand" },
            { label: "Orage", value: "t-storm" },
            { label: "Fougère", value: "t-fern" },
            { label: "Argile", value: "t-clay" },
            { label: "Écume", value: "t-foam" },
            { label: "Brume", value: "t-mist" },
          ],
        }),
        imageLabel: fields.text({
          label: "Texte de l'image",
          validation: { isRequired: true },
        }),
        intro: fields.text({
          label: "Introduction",
          multiline: true,
          validation: { isRequired: true },
        }),
        sections: fields.array(
          fields.object({
            heading: fields.text({
              label: "Titre de section",
              validation: { isRequired: true },
            }),
            paragraphs: fields.array(
              fields.text({
                label: "Paragraphe",
                multiline: true,
                validation: { isRequired: true },
              }),
              {
                label: "Paragraphes",
                itemLabel: (props) => props.value,
                validation: { length: { min: 1 } },
              }
            ),
          }),
          {
            label: "Sections",
            itemLabel: (props) => props.fields.heading.value,
            validation: { length: { min: 1 } },
          }
        ),
      },
    }),
    people: collection({
      label: "Profils intervenants",
      path: "src/content/people/*",
      slugField: "name",
      format: "json",
      columns: ["name", "profileType", "visible"],
      schema: {
        name: fields.slug({
          name: {
            label: "Nom",
            validation: { isRequired: true },
          },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
        visible: fields.checkbox({
          label: "Visible sur le site",
          defaultValue: true,
        }),
        profileType: fields.select({
          label: "Type de profil",
          defaultValue: "praticien",
          options: [
            { label: "Professeur·e", value: "professeur" },
            { label: "Praticien·ne", value: "praticien" },
            { label: "Intervenant·e atelier", value: "atelier" },
          ],
        }),
        spaces: fields.multiselect({
          label: "Espace associé",
          defaultValue: ["la-bulle"],
          options: [
            { label: "Cours", value: "cours" },
            { label: "La Bulle", value: "la-bulle" },
            { label: "Le Cocon", value: "le-cocon" },
            { label: "Atelier", value: "atelier" },
          ],
        }),
        specialty: fields.text({
          label: "Spécialité",
          validation: { isRequired: true },
        }),
        bio: fields.text({
          label: "Courte présentation",
          multiline: true,
          validation: { isRequired: true },
        }),
        imageClass: fields.select({
          label: "Aplat / visuel",
          defaultValue: "foam",
          options: [
            { label: "Fougère", value: "fern" },
            { label: "Orage", value: "storm" },
            { label: "Écume", value: "foam" },
            { label: "Argile", value: "clay" },
            { label: "Sable", value: "sand" },
          ],
        }),
        imageLabel: fields.text({
          label: "Texte du visuel",
          validation: { isRequired: true },
        }),
        primaryLinkLabel: fields.text({
          label: "Libellé du lien principal",
          defaultValue: "Prendre rendez-vous",
        }),
        primaryLinkUrl: fields.text({
          label: "URL du lien principal",
          defaultValue: "/contact/",
        }),
        secondaryLinkLabel: fields.text({
          label: "Libellé du lien secondaire",
          defaultValue: "Instagram",
        }),
        secondaryLinkUrl: fields.text({
          label: "URL du lien secondaire",
          defaultValue: "#",
        }),
      },
    }),
    courses: collection({
      label: "Descriptifs des cours",
      path: "src/content/courses/*",
      slugField: "title",
      format: "json",
      columns: ["title", "visible"],
      schema: {
        title: fields.slug({
          name: {
            label: "Nom du cours",
            validation: { isRequired: true },
          },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
        visible: fields.checkbox({
          label: "Visible sur le site",
          defaultValue: true,
        }),
        label: fields.text({
          label: "Petit libellé",
          description: "Exemple : i - Yoga",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
    pricing: collection({
      label: "Tarifs cours",
      path: "src/content/pricing/*",
      slugField: "name",
      format: "json",
      columns: ["name", "amount", "visible"],
      schema: {
        name: fields.slug({
          name: {
            label: "Nom du tarif",
            validation: { isRequired: true },
          },
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
        visible: fields.checkbox({
          label: "Visible sur le site",
          defaultValue: true,
        }),
        featured: fields.checkbox({
          label: "Mettre en avant",
          defaultValue: false,
        }),
        amount: fields.text({
          label: "Montant",
          description: "Sans symbole euro. Exemple : 150",
          validation: { isRequired: true },
        }),
        unit: fields.text({
          label: "Précision",
          description: "Exemple : soit 15 € le cours - valable 4 mois",
          validation: { isRequired: true },
        }),
        features: fields.array(
          fields.text({
            label: "Avantage",
            validation: { isRequired: true },
          }),
          {
            label: "Avantages",
            itemLabel: (props) => props.value,
            validation: { length: { min: 1 } },
          }
        ),
        ctaLabel: fields.text({
          label: "Texte du bouton",
          validation: { isRequired: true },
        }),
        ctaUrl: fields.text({
          label: "Lien du bouton",
          defaultValue: "/contact/",
        }),
      },
    }),
  },
  singletons: {
    blogSettings: {
      label: "Réglages du blog",
      path: "src/content/settings/blog",
      format: "json",
      schema: {
        featuredArticleSlug: fields.text({
          label: "Slug de l'article mis en avant",
          description: "Exemple : reprise-activite-apres-50-ans",
          validation: { isRequired: true },
        }),
      },
    },
  },
});
