import { collection, config, fields } from "@keystatic/core";

const siteVisualField = (label: string) =>
  fields.object(
    {
      label: fields.text({
        label: "Nom interne",
        defaultValue: label,
        validation: { isRequired: true },
      }),
      visualMode: fields.select({
        label: "Type de visuel",
        defaultValue: "color",
        options: [
          { label: "Aplat couleur", value: "color" },
          { label: "Photo importée", value: "image" },
        ],
      }),
      image: fields.image({
        label: "Photo importée",
        directory: "public/uploads/site",
        publicPath: "/uploads/site/",
        description: "Utilisée si le type de visuel est « Photo importée ».",
      }),
      imageClass: fields.select({
        label: "Couleur de l'aplat",
        defaultValue: "t-petrol",
        options: [
          { label: "Pétrole", value: "t-petrol" },
          { label: "Pétrole 2", value: "t-petrol t-petrol-2" },
          { label: "Pétrole 3", value: "t-petrol t-petrol-3" },
          { label: "Fougère", value: "t-fern" },
          { label: "Orage", value: "t-storm" },
          { label: "Sable", value: "t-sand" },
          { label: "Écume", value: "t-foam" },
          { label: "Écume 2", value: "t-foam t-foam-2" },
          { label: "Écume 3", value: "t-foam t-foam-3" },
          { label: "Argile", value: "t-clay" },
          { label: "Argile 2", value: "t-clay t-clay-2" },
          { label: "Argile 3", value: "t-clay t-clay-3" },
          { label: "Pierre", value: "t-stone" },
          { label: "Photo pétrole", value: "photo-petrol" },
          { label: "Photo écume", value: "photo-foam" },
          { label: "Photo argile", value: "photo-clay" },
          { label: "Prévention écume", value: "pv-foam" },
          { label: "Prévention argile", value: "pv-clay" },
          { label: "Bulle écume", value: "bulle-foam" },
          { label: "Cocon écume", value: "cocon-foam" },
        ],
      }),
      description: fields.text({
        label: "Description de l'image",
        multiline: true,
        validation: { isRequired: true },
      }),
      wide: fields.checkbox({
        label: "Format large",
        defaultValue: false,
      }),
    },
    { label }
  );

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
        visualMode: fields.select({
          label: "Type de visuel",
          defaultValue: "color",
          options: [
            { label: "Aplat couleur", value: "color" },
            { label: "Photo importée", value: "image" },
          ],
        }),
        image: fields.image({
          label: "Photo importée",
          directory: "public/uploads/blog",
          publicPath: "/uploads/blog/",
          description: "Utilisée si le type de visuel est « Photo importée ».",
        }),
        imageClass: fields.select({
          label: "Couleur de l'aplat",
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
          label: "Texte alternatif / repère visuel",
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
      columns: ["name", "spaces", "visible"],
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
        visualMode: fields.select({
          label: "Type de visuel",
          defaultValue: "color",
          options: [
            { label: "Aplat couleur", value: "color" },
            { label: "Photo importée", value: "image" },
          ],
        }),
        image: fields.image({
          label: "Photo importée",
          directory: "public/uploads/people",
          publicPath: "/uploads/people/",
          description: "Utilisée si le type de visuel est « Photo importée ».",
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
    siteVisuals: {
      label: "Visuels du site",
      path: "src/data/siteVisuals",
      format: "json",
      schema: {
        homeGallery: fields.array(siteVisualField("Image de galerie"), {
          label: "Accueil - galerie défilante",
          itemLabel: (props) => props.fields.label.value,
          validation: { length: { min: 7, max: 7 } },
        }),
        homeSpaces: fields.object(
          {
            studio: siteVisualField("Accueil - La Salle"),
            bulle: siteVisualField("Accueil - La Bulle"),
            cocon: siteVisualField("Accueil - Le Cocon"),
          },
          { label: "Accueil - Trois espaces" }
        ),
        homeOffers: fields.object(
          {
            bulle: siteVisualField("Accueil - Accompagnements La Bulle"),
            cocon: siteVisualField("Accueil - Soins Le Cocon"),
          },
          { label: "Accueil - Accompagnements & soins" }
        ),
        leLieu: fields.object(
          {
            hero: siteVisualField("Le lieu - hero"),
            spaces: fields.object(
              {
                studio: siteVisualField("Le lieu - La Salle"),
                bulle: siteVisualField("Le lieu - La Bulle"),
                cocon: siteVisualField("Le lieu - Le Cocon"),
              },
              { label: "Le lieu - espaces" }
            ),
            founders: fields.object(
              {
                gaelle: siteVisualField("Le lieu - Gaëlle"),
                zelie: siteVisualField("Le lieu - Zélie"),
              },
              { label: "Le lieu - fondatrices" }
            ),
          },
          { label: "Page Le lieu" }
        ),
        care: fields.object(
          {
            overviewBulle: siteVisualField("Prévention santé - La Bulle"),
            overviewCocon: siteVisualField("Prévention santé - Le Cocon"),
            bulleHero: siteVisualField("La Bulle - visuel cabinet"),
            coconHero: siteVisualField("Le Cocon - visuel cabinet"),
          },
          { label: "Accompagnements & soins" }
        ),
        rental: fields.object(
          {
            studio: fields.array(siteVisualField("Location - La Salle"), {
              label: "Location - galerie La Salle",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
            bulle: fields.array(siteVisualField("Location - La Bulle"), {
              label: "Location - galerie La Bulle",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
            cocon: fields.array(siteVisualField("Location - Le Cocon"), {
              label: "Location - galerie Le Cocon",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
          },
          { label: "Location d'espace - galeries" }
        ),
      },
    },
  },
});
