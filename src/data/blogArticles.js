const modules = import.meta.glob("../content/blog/*.json", { eager: true });

export const blogArticles = Object.entries(modules)
  .map(([path, module]) => ({
    visualMode: "color",
    slug: path.split("/").pop().replace(".json", ""),
    ...module.default,
  }))
  .sort((a, b) => a.order - b.order);

export const featuredBlogArticles = blogArticles.filter((article) => !article.archived);
export const archivedBlogArticles = blogArticles.filter((article) => article.archived);
