export type PhotoFormat = { key: string; label: string; aspect: number; mobileAspect?: number };
export const peopleFormats: PhotoFormat[] = [
  { key: 'profile', label: 'Grand portrait · page intervenante', aspect: 4 / 5, mobileAspect: 4 / 4.5 },
  { key: 'horizontalCard', label: 'Autres intervenantes · carte horizontale', aspect: 3 / 2 },
  { key: 'portraitCard', label: 'Cours et équipe · carte portrait', aspect: .79 },
  { key: 'careCard', label: 'Accompagnements et soins · carte paysage', aspect: 4 / 3 },
  { key: 'preventionCard', label: 'Prévention santé · carte large', aspect: 16 / 9 },
];
export const blogFormats: PhotoFormat[] = [
  { key: 'list', label: 'Liste et articles associés', aspect: 3 / 2 },
  { key: 'featured', label: 'Mise en avant · page blog', aspect: 4 / 3 },
  { key: 'home', label: 'Mise en avant · accueil', aspect: 4 / 3 },
  { key: 'detail', label: 'Grande photo · page article', aspect: 4 / 5, mobileAspect: 4 / 3 },
];
export const workshopFormats: PhotoFormat[] = [
  { key: 'card', label: 'Carte atelier · accueil et listes', aspect: 4 / 3 },
  { key: 'detail', label: 'Grande photo · page atelier', aspect: 4 / 5, mobileAspect: 4 / 3 },
];
