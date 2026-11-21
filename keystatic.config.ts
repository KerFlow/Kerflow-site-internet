import { collection, config, fields } from "@keystatic/core";

import { personLinksField, personSpacesField } from "./src/keystatic/person-fields";
import { photoField } from "./src/keystatic/photo-field";
import { blogFormats, peopleFormats, workshopFormats } from "./src/keystatic/photo-formats";

const siteVisualField = (label: string, aspect = 4 / 3, gallery = false) =>
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
      photo: photoField({
        directory: "public/uploads/site",
        publicPath: "/uploads/site/",
        formats: [{ key: "default", label: "Cadrage sur le site", aspect }],
        gallery,
        compact: true,
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
      ...(!gallery ? { wide: fields.checkbox({ label: "Format large", defaultValue: false }) } : {}),
    },
    { label }
  );

export default config({
  storage: {
    kind: import.meta.env.DEV ? "local" : "cloud",
  },
  cloud: {
    project: "gaelle-and-zelie/kerflow",
  },
  locale: "fr-FR",
  ui: {
    brand: { name: "KerFlow" },
    navigation: {
      "Activités et équipe": ["workshops", "courses", "pricing", "people"],
      Blog: ["blog", "blogSettings"],
      "Photos et galeries": ["siteVisuals", "photosLeLieu", "photosCare", "photosRental"],
      "Pages et réglages": ["homeContent", "siteSettings"],
    },
  },
  collections: {
    blog: collection({
      label: "Articles du blog",
      path: "src/content/blog/*",
      slugField: "title",
      format: "json",
      columns: ["title", "tag", "date", "archived"],
      schema: {
        title: fields.slug({
          name: {
            label: "Titre",
            validation: { isRequired: true },
          },
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
                label: "Texte du paragraphe",
                multiline: true,
                validation: { isRequired: true },
              }),
              {
                label: "Texte de cette section",
                description:
                  "Chaque bloc correspond à un paragraphe affiché sous le titre de section.",
                itemLabel: (props) => props.value || "Paragraphe",
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
        visualMode: fields.select({
          label: "Type de visuel",
          defaultValue: "color",
          options: [
            { label: "Aplat couleur", value: "color" },
            { label: "Photo importée", value: "image" },
          ],
        }),
        photo: photoField({
          directory: "public/uploads/blog",
          publicPath: "/uploads/blog/",
          formats: blogFormats,
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
        archived: fields.checkbox({
          label: "Placer dans les archives",
          defaultValue: false,
          description: "L'article reste accessible et quitte la sélection récente. Les quatre premières entrées selon l'ordre d'affichage apparaissent dans « 03 - Archives ».",
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
      },
    }),
    people: collection({
      label: "Équipe et profils",
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
        specialty: fields.text({
          label: "Spécialité",
          validation: { isRequired: true },
        }),
        spaces: personSpacesField,
        summary: fields.text({
          label: "Résumé du profil",
          description: "Apparaît dans la liste de l’équipe et en haut de la fiche.",
          multiline: true,
          validation: { isRequired: true },
        }),
        approachTitle: fields.text({
          label: "Première ligne du grand titre",
          defaultValue: "Prendre le temps",
          validation: { isRequired: true },
        }),
        approachAccent: fields.text({
          label: "Texte du titre affiché en couleur brique",
          defaultValue: "de sentir.",
          description: "Cette partie apparaît en brique sous le titre.",
          validation: { isRequired: true },
        }),
        approachSections: fields.array(
          fields.object({
            heading: fields.text({
              label: "Sous-titre (facultatif)",
            }),
            headingStyle: fields.select({
              label: "Taille du sous-titre",
              defaultValue: "small",
              options: [
                { label: "Petit, en gras", value: "small" },
                { label: "Grand, mis en avant", value: "large" },
              ],
            }),
            paragraphs: fields.array(
              fields.text({
                label: "Paragraphe",
                multiline: true,
                validation: { isRequired: true },
              }),
              {
                label: "Paragraphes",
                itemLabel: (props) => props.value || "Paragraphe",
                validation: { length: { min: 1 } },
              }
            ),
          }),
          {
            label: "Description longue (page intervenante)",
            itemLabel: (props) => props.fields.heading.value || "Bloc de texte",
            validation: { length: { min: 1 } },
          }
        ),
        visualMode: fields.select({
          label: "Type de visuel",
          defaultValue: "color",
          options: [
            { label: "Aplat couleur", value: "color" },
            { label: "Photo importée", value: "image" },
          ],
        }),
        photo: photoField({
          directory: "public/uploads/people",
          publicPath: "/uploads/people/",
          formats: peopleFormats,
          compact: true,
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
        links: personLinksField,
        visible: fields.checkbox({
          label: "Visible sur le site",
          defaultValue: true,
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
      },
    }),
    courses: collection({
      label: "Cours",
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
          label: "Description courte",
          multiline: true,
          validation: { isRequired: true },
        }),
        longDescription: fields.text({
          label: "Description longue - fenêtre au clic",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
    pricing: collection({
      label: "Tarifs et formules",
      path: "src/content/pricing/*",
      slugField: "name",
      format: "json",
      columns: ["name", "visible"],
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
        intro: fields.text({
          label: "Texte court optionnel",
          multiline: true,
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
    workshops: collection({
      label: "Ateliers",
      path: "src/content/workshops/*",
      slugField: "title",
      format: "json",
      columns: ["title", "date", "visible", "archived"],
      schema: {
        title: fields.slug({
          name: {
            label: "Titre",
            validation: { isRequired: true },
          },
        }),
        visible: fields.checkbox({
          label: "Visible sur le site",
          defaultValue: true,
          description: "Décochez pour retirer complètement l'atelier du site. Cochez « Archiver » pour le conserver dans les événements passés.",
        }),
        archived: fields.checkbox({
          label: "Placer dans les archives",
          defaultValue: false,
          description: "Retire l'atelier des événements à venir. Les quatre premières entrées archivées selon l'ordre d'affichage apparaissent dans « 03 - Archives ».",
        }),
        date: fields.text({
          label: "Date",
          validation: { isRequired: true },
        }),
        time: fields.text({
          label: "Heure",
          validation: { isRequired: true },
        }),
        duration: fields.text({
          label: "Durée",
          validation: { isRequired: true },
        }),
        price: fields.text({
          label: "Prix",
          validation: { isRequired: true },
        }),
        bookingRequired: fields.checkbox({
          label: "Réservation nécessaire",
          defaultValue: true,
          description: "Désactivez cette option pour afficher « Sans réservation » à la place du bouton.",
        }),
        ctaLabel: fields.text({
          label: "Texte du bouton",
          defaultValue: "Réserver",
          validation: { isRequired: true },
        }),
        ctaUrl: fields.text({
          label: "Lien de réservation",
          defaultValue: "/contact/",
        }),
        summary: fields.text({
          label: "Résumé court",
          description: "Quelques lignes pour présenter l'atelier sur la page d'accueil.",
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
                label: "Texte du paragraphe",
                multiline: true,
                validation: { isRequired: true },
              }),
              {
                label: "Texte de cette section",
                description:
                  "Chaque bloc correspond à un paragraphe affiché sous le titre de section.",
                itemLabel: (props) => props.value || "Paragraphe",
                validation: { length: { min: 1 } },
              }
            ),
          }),
          {
            label: "Description de l’atelier",
            itemLabel: (props) => props.fields.heading.value,
            validation: { length: { min: 1 } },
          }
        ),
        photo: photoField({
          directory: "public/uploads/workshops",
          publicPath: "/uploads/workshops/",
          formats: workshopFormats,
        }),
        imageClass: fields.select({
          label: "Couleur du visuel",
          defaultValue: "photo-clay",
          options: [
            { label: "Photo pétrole", value: "photo-petrol" },
            { label: "Photo écume", value: "photo-foam" },
            { label: "Photo argile", value: "photo-clay" },
            { label: "Photo pierre", value: "photo-stone" },
          ],
        }),
        imageLabel: fields.text({
          label: "Repère visuel",
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: "Mettre en avant",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 1,
          validation: { isRequired: true },
        }),
      },
    }),
  },
  singletons: {
    siteSettings: {
      label: "Contact, documents et fondatrices",
      path: "src/content/settings/site",
      format: "json",
      schema: {
        openingLabel: fields.text({
          label: "Mention d'ouverture",
          defaultValue: "Ouverture prochaine - automne 26",
          validation: { isRequired: true },
        }),
        phoneVisible: fields.checkbox({
          label: "Afficher le téléphone",
          defaultValue: false,
        }),
        phoneDisplay: fields.text({
          label: "Numéro affiché",
          description: "Exemple : 06 00 00 00 00",
        }),
        phoneHref: fields.text({
          label: "Numéro pour le lien mobile",
          description: "Exemple : +33600000000",
        }),
        rentalPdfs: fields.object(
          {
            studio: fields.file({
              label: "PDF location - Le Salon",
              directory: "public/uploads/location",
              publicPath: "/uploads/location/",
              description: "Description complète et tarifs du Salon.",
            }),
            bulle: fields.file({
              label: "PDF location - La Bulle",
              directory: "public/uploads/location",
              publicPath: "/uploads/location/",
              description: "Description complète et tarifs de La Bulle.",
            }),
            cocon: fields.file({
              label: "PDF location - Le Cocon",
              directory: "public/uploads/location",
              publicPath: "/uploads/location/",
              description: "Description complète et tarifs du Cocon.",
            }),
          },
          { label: "PDF de location" }
        ),
        leLieu: fields.object(
          {
            founders: fields.object(
              {
                sectionLabel: fields.text({
                  label: "Petit libellé",
                  defaultValue: "04 — Les fondatrices",
                  validation: { isRequired: true },
                }),
                titleStart: fields.text({
                  label: "Titre - début",
                  defaultValue: "Un projet",
                  validation: { isRequired: true },
                }),
                titleHighlight: fields.text({
                  label: "Titre - mot mis en valeur",
                  defaultValue: "mère-fille",
                  validation: { isRequired: true },
                }),
                intro: fields.text({
                  label: "Introduction",
                  multiline: true,
                  validation: { isRequired: true },
                }),
                gaelle: fields.object(
                  {
                    name: fields.text({
                      label: "Nom",
                      defaultValue: "Gaëlle",
                      validation: { isRequired: true },
                    }),
                    role: fields.text({
                      label: "Rôle",
                      defaultValue: "Professeur de Yoga & Napsothérapeute",
                      validation: { isRequired: true },
                    }),
                    paragraphs: fields.array(
                      fields.text({
                        label: "Paragraphe",
                        multiline: true,
                        validation: { isRequired: true },
                      }),
                      {
                        label: "Biographie",
                        itemLabel: (props) => props.value,
                        validation: { length: { min: 1 } },
                      }
                    ),
                    primaryLinkLabel: fields.text({
                      label: "Libellé du lien principal",
                      defaultValue: "Contact",
                      validation: { isRequired: true },
                    }),
                    primaryLinkUrl: fields.text({
                      label: "URL du lien principal",
                      defaultValue: "/contact/",
                      validation: { isRequired: true },
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
                  { label: "Gaëlle" }
                ),
                zelie: fields.object(
                  {
                    name: fields.text({
                      label: "Nom",
                      defaultValue: "Zélie",
                      validation: { isRequired: true },
                    }),
                    role: fields.text({
                      label: "Rôle",
                      defaultValue: "Communication & Développement",
                      validation: { isRequired: true },
                    }),
                    paragraphs: fields.array(
                      fields.text({
                        label: "Paragraphe",
                        multiline: true,
                        validation: { isRequired: true },
                      }),
                      {
                        label: "Biographie",
                        itemLabel: (props) => props.value,
                        validation: { length: { min: 1 } },
                      }
                    ),
                    primaryLinkLabel: fields.text({
                      label: "Libellé du lien principal",
                      defaultValue: "Contact",
                      validation: { isRequired: true },
                    }),
                    primaryLinkUrl: fields.text({
                      label: "URL du lien principal",
                      defaultValue: "/contact/",
                      validation: { isRequired: true },
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
                  { label: "Zélie" }
                ),
              },
              { label: "Les fondatrices" }
            ),
          },
          { label: "Page Le lieu" }
        ),
      },
    },
    blogSettings: {
      label: "Article mis en avant",
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
    homeContent: {
      label: "Avis sur l’accueil",
      path: "src/content/settings/home",
      format: "json",
      schema: {
        testimonials: fields.array(
          fields.object({
            visible: fields.checkbox({
              label: "Visible sur le site",
              defaultValue: true,
            }),
            author: fields.text({
              label: "Prénom / nom affiché",
              validation: { isRequired: true },
            }),
            context: fields.text({
              label: "Contexte court",
              description: "Exemple : Yoga, Yoga Vinyasa, Pilates...",
              validation: { isRequired: true },
            }),
            rating: fields.integer({
              label: "Nombre d'étoiles",
              defaultValue: 5,
              validation: { isRequired: true, min: 1, max: 5 },
            }),
            quote: fields.text({
              label: "Avis",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Avis affichés sur la page d'accueil",
            itemLabel: (props) => props.fields.author.value,
            validation: { length: { min: 1 } },
          }
        ),
      },
    },
    siteVisuals: {
      label: "Accueil",
      path: "src/data/siteVisuals",
      format: "json",
      schema: {
        homeGallery: fields.array(siteVisualField("Image de galerie", 4 / 5, true), {
          label: "Galerie défilante",
          itemLabel: (props) => props.fields.label.value,
          validation: { length: { min: 7, max: 7 } },
        }),
        homeSpaces: fields.object(
          {
            studio: siteVisualField("Accueil - Le Salon"),
            bulle: siteVisualField("Accueil - La Bulle"),
            cocon: siteVisualField("Accueil – Le Cocon dans la section Trois espaces"),
          },
          { label: "Trois espaces" }
        ),
        homeOffers: fields.object(
          {
            bulle: siteVisualField("Accueil - Accompagnements La Bulle"),
            cocon: siteVisualField("Accueil – Le Cocon dans la section Rendez-vous individuels"),
          },
          { label: "Rendez-vous individuels" }
        ),
      },
    },
    photosLeLieu: {
      label: "Le lieu",
      path: "src/data/photosLeLieu",
      format: "json",
      schema: {
        leLieu: fields.object(
          {
            gallery: fields.array(siteVisualField("Le lieu - image de galerie", 4 / 5, true), {
              label: "Galerie défilante",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 7, max: 7 } },
            }),
            spaces: fields.object(
              {
                studio: siteVisualField("Le lieu - Le Salon", 16 / 10),
                bulle: siteVisualField("Le lieu - La Bulle"),
                cocon: siteVisualField("Le lieu - Le Cocon"),
              },
              { label: "Les trois espaces" }
            ),
            founders: fields.object(
              {
                gaelle: siteVisualField("Le lieu - Gaëlle", 3 / 4),
                zelie: siteVisualField("Le lieu - Zélie", 3 / 4),
              },
              { label: "Portraits des fondatrices" }
            ),
          }
        ),
      },
    },
    photosCare: {
      label: "Accompagnements & soins",
      path: "src/data/photosCare",
      format: "json",
      schema: {
        care: fields.object(
          {
            bulleHero: siteVisualField("La Bulle – photo de la section KerFlow Consult"),
            overviewCocon: siteVisualField("Le Cocon – photo de la section KerFlow Rituel"),
          },
          { label: "Photos aussi affichées sur la page Prévention santé" }
        ),
      },
    },
    photosRental: {
      label: "Louer un espace",
      path: "src/data/photosRental",
      format: "json",
      schema: {
        rental: fields.object(
          {
            studio: fields.array(siteVisualField("Location - Le Salon"), {
              label: "Galerie du Salon",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
            bulle: fields.array(siteVisualField("Location - La Bulle"), {
              label: "Galerie de La Bulle",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
            cocon: fields.array(siteVisualField("Location - Le Cocon"), {
              label: "Galerie du Cocon",
              itemLabel: (props) => props.fields.label.value,
              validation: { length: { min: 1 } },
            }),
          }
        ),
      },
    },
  },
});
