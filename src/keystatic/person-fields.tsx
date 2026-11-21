import { fields, type FormFieldInputProps } from "@keystatic/core";

const spaces = fields.multiselect({
  label: "Où afficher ce profil ?",
  description: "Choisissez au moins un espace. Pour un prof, cochez Cours.",
  options: [
    { label: "Cours", value: "cours" },
    { label: "La Bulle", value: "la-bulle" },
    { label: "Le Cocon", value: "le-cocon" },
    { label: "Atelier", value: "atelier" },
  ],
});

const spaceRequired = "Choisissez au moins un espace.";

export const personSpacesField = {
  ...spaces,
  validate(value: ReturnType<typeof spaces.defaultValue>) {
    if (!value.length) throw new Error(spaceRequired);
    return spaces.validate(value);
  },
  Input(props: Parameters<typeof spaces.Input>[0]) {
    return (
      <>
        <spaces.Input {...props} />
        {props.forceValidation && !props.value.length && <p role="alert">{spaceRequired}</p>}
      </>
    );
  },
};

const links = fields.object({
  primaryLinkLabel: fields.text({ label: "Libellé du lien principal" }),
  primaryLinkUrl: fields.text({ label: "Adresse du lien principal" }),
  secondaryLinkLabel: fields.text({ label: "Libellé du lien secondaire" }),
  secondaryLinkUrl: fields.text({ label: "Adresse du lien secondaire" }),
}, { label: "Liens facultatifs" });

type LinkInputProps = FormFieldInputProps<string> & { schema: ReturnType<typeof fields.text> };
type LinkFields = Record<keyof typeof links.fields, LinkInputProps>;

export const personLinksField = {
  ...links,
  Input(props: unknown) {
    const { fields: inputs, forceValidation } = props as { fields: LinkFields; forceValidation: boolean };
    return (
      <details>
        <summary>Liens facultatifs</summary>
        <div style={{ display: "grid", gap: 16, marginTop: 12 }}>
          {Object.entries(inputs).map(([key, input]) => (
            <input.schema.Input key={key} {...input} autoFocus={false} forceValidation={forceValidation} />
          ))}
        </div>
      </details>
    );
  },
};
