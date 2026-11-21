// Keystatic 0.5.50 opens the conflict dialog for every stale create: new
// entries have no initial tree key, so the existing equality check cannot pass.
const original = `            const treeKey = getTreeKey(getDirectoriesForTreeKey(object(args.schema), args.basePath, (_args$slug3 = args.slug) === null || _args$slug3 === void 0 ? void 0 : _args$slug3.value, args.format), tree.tree);
            if (treeKey === args.currentLocalTreeKey) {
              result = await runMutation(refData.data.repository.ref.target.oid);
`;

const replacement = `            const paths = getDirectoriesForTreeKey(object(args.schema), args.basePath, args.slug?.value, args.format);
            const isCreating = args.currentLocalTreeKey === undefined;
            if (isCreating && paths.some(path => getTreeNodeAtPath(tree.tree, path))) {
              throw new Error("Cette adresse de fiche est déjà utilisée. Modifiez le champ « Slug », puis cliquez à nouveau sur Créer.");
            }
            if (isCreating || getTreeKey(paths, tree.tree) === args.currentLocalTreeKey) {
              result = await runMutation(refData.data.repository.ref.target.oid);
              if (isCreating && result.error?.graphQLErrors[0]?.originalError?.type === 'STALE_DATA') {
                throw new Error("Le site vient d’être mis à jour. Votre saisie est toujours là. Cliquez à nouveau sur Créer.");
              }
`;

export default function keystaticCreateRetry() {
  return {
    name: "kerflow-keystatic-create-retry",
    apply: "build",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("/@keystatic/core/dist/keystatic-core-ui.js")) return;

      if (code.split(original).length !== 2) {
        this.error("Le code d’enregistrement Keystatic a changé. Vérifier si le correctif de création est toujours nécessaire.");
      }

      return { code: code.replace(original, replacement), map: null };
    },
  };
}
