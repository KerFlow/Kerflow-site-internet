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
  },
});
