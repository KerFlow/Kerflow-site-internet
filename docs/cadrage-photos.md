# Cadrer les photos dans Keystatic

Importez une photo dans « Photo et cadrage ». Choisissez son emplacement avec
« Affichage à régler », puis faites glisser la photo dans le cadre. Le curseur
« Zoom » permet de se rapprocher du sujet ; « Recentrer » réinitialise le format
actif. Chaque format conserve son cadrage. Enregistrez la fiche pour les conserver.
Le clavier permet aussi de déplacer la photo avec les flèches (Maj pour accélérer).

Quand un bloc change de proportions sur mobile, les boutons Ordinateur/Mobile
montrent les deux rendus du même cadrage. Dans une galerie, la case « format large »
change à la fois le cadre de l’éditeur et le format sur le site.

## Maintenance

Le champ `photoField` dans `src/keystatic/photo-field.tsx` regroupe une image native
Keystatic et les coordonnées de cadrage dans `photo: { image, crops, wide? }`.
L’import, la sérialisation des fichiers et la sauvegarde restent gérés par les
champs natifs Keystatic ; le composant ObjectField.Input remplace uniquement leur
interface. Vérifier une ouverture/enregistrement après une mise à jour Keystatic.
Les photos originales sont conservées sans modification des pixels.

`src/lib/photo.js` fournit les mêmes calculs au CMS et au site. Les positions
internes x/y restent comprises entre 0 et 100 ; le zoom entre 1 et 3. L’origine du
zoom suit le cadrage pour empêcher l’apparition de bords vides, y compris lorsque
le cadre change de taille. Ces valeurs ne sont pas à saisir par les éditrices.

Les proportions de l’éditeur sont dans `src/keystatic/photo-formats.ts` et les appels
à `siteVisualField` de la configuration. Une modification des proportions d’un bloc
sur le site doit être répercutée ici. Les anciennes valeurs ont été déplacées dans
les groupes photo ; les fichiers image restent aux mêmes chemins jusqu’à leur
prochaine sauvegarde native par Keystatic.
