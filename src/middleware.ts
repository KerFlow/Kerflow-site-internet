import { defineMiddleware } from "astro:middleware";

const oldHosts = new Set(["kerflow.fr", "www.kerflow.fr"]);

export const onRequest = defineMiddleware((context, next) => {
  if (context.isPrerendered) {
    return next();
  }

  const requestUrl = new URL(context.request.url);
  const host = context.request.headers.get("host")?.split(":")[0];

  if (host && oldHosts.has(host)) {
    requestUrl.protocol = "https:";
    requestUrl.host = "kerflow-studio.fr";
    return context.redirect(requestUrl.toString(), 308);
  }

  return next();
});
