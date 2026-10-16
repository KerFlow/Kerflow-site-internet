import { defineMiddleware } from "astro:middleware";

const oldHosts = new Set(["kerflow.fr", "www.kerflow.fr"]);
const keystaticPaths = ["/keystatic", "/api/keystatic"];

const isKeystaticPath = (pathname: string) =>
  keystaticPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

const unauthorized = () =>
  new Response("Authentification Keystatic requise.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Administration Kerflow", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });

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

  if (isKeystaticPath(requestUrl.pathname)) {
    const username = import.meta.env.KEYSTATIC_ADMIN_USERNAME;
    const password = import.meta.env.KEYSTATIC_ADMIN_PASSWORD;

    // Fail closed if the local credentials are missing.
    if (!username || !password) {
      return new Response("Identifiants Keystatic non configurés.", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const authorization = context.request.headers.get("authorization");

    if (!authorization?.startsWith("Basic ")) {
      return unauthorized();
    }

    try {
      const credentials = atob(authorization.slice(6));
      const separatorIndex = credentials.indexOf(":");
      const providedUsername = credentials.slice(0, separatorIndex);
      const providedPassword = credentials.slice(separatorIndex + 1);

      if (
        separatorIndex === -1 ||
        providedUsername !== username ||
        providedPassword !== password
      ) {
        return unauthorized();
      }
    } catch {
      return unauthorized();
    }
  }

  return next();
});
