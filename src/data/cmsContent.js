const peopleModules = import.meta.glob("../content/people/*.json", { eager: true });
const courseModules = import.meta.glob("../content/courses/*.json", { eager: true });
const pricingModules = import.meta.glob("../content/pricing/*.json", { eager: true });
const settingsModules = import.meta.glob("../content/settings/*.json", { eager: true });

const fromModules = (modules) =>
  Object.entries(modules)
    .map(([path, module]) => ({
      slug: path.split("/").pop().replace(".json", ""),
      ...module.default,
    }))
    .sort((a, b) => a.order - b.order);

export const people = fromModules(peopleModules);
export const visiblePeople = people.filter((person) => person.visible);
export const courseTypes = fromModules(courseModules).filter((course) => course.visible);
export const pricingPlans = fromModules(pricingModules).filter((plan) => plan.visible);
export const blogSettings = settingsModules["../content/settings/blog.json"]?.default ?? {};

export const peopleForSpace = (space) =>
  visiblePeople.filter((person) => person.spaces.includes(space));
