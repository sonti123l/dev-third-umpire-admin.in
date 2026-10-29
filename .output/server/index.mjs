globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as NodeResponse, i as defineLazyEventHandler, l as serve, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/chunk-BHe-jwch.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd-oed+/PJavFpEIvuOvBOJyseqyfo\"",
		"mtime": "2026-10-29T08:36:22.091Z",
		"size": 957,
		"path": "../public/assets/chunk-BHe-jwch.js"
	},
	"/assets/dashboard-D1ddPTq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-A2c7gYig+E94sN7XFme2kXHAWxo\"",
		"mtime": "2026-10-29T08:36:22.104Z",
		"size": 185,
		"path": "../public/assets/dashboard-D1ddPTq5.js"
	},
	"/assets/AuthGuard-D6K2w2I1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55a-snxdWMBypKXxMrWN/xn8II8RNyw\"",
		"mtime": "2026-10-29T08:36:22.086Z",
		"size": 1370,
		"path": "../public/assets/AuthGuard-D6K2w2I1.js"
	},
	"/assets/dashboardService-BTfUOW_k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2489-gwEAqgPhu10oQ+nkzp4KDAJKinY\"",
		"mtime": "2026-10-29T08:36:22.108Z",
		"size": 9353,
		"path": "../public/assets/dashboardService-BTfUOW_k.js"
	},
	"/assets/DashboardPage-CAvWNnQ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23408-Ws69VAIWxjpWeOLZJkXXvdg4msU\"",
		"mtime": "2026-10-29T08:36:22.087Z",
		"size": 144392,
		"path": "../public/assets/DashboardPage-CAvWNnQ1.js"
	},
	"/assets/info-l7mjV5UM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-BcQomJocPgpicMJz2LnfhTkcxRg\"",
		"mtime": "2026-10-29T08:36:22.111Z",
		"size": 246,
		"path": "../public/assets/info-l7mjV5UM.js"
	},
	"/assets/fota-information-IVxSDHWa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37937-P7yhKIBAUrpnHtx4WNvk0RUITCI\"",
		"mtime": "2026-10-29T08:36:22.110Z",
		"size": 227639,
		"path": "../public/assets/fota-information-IVxSDHWa.js"
	},
	"/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2": {
		"type": "font/woff2",
		"etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
		"mtime": "2026-10-29T08:36:22.193Z",
		"size": 11232,
		"path": "../public/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2"
	},
	"/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2": {
		"type": "font/woff2",
		"etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
		"mtime": "2026-10-29T08:36:22.193Z",
		"size": 18748,
		"path": "../public/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2"
	},
	"/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2": {
		"type": "font/woff2",
		"etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
		"mtime": "2026-10-29T08:36:22.191Z",
		"size": 25960,
		"path": "../public/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2"
	},
	"/assets/inter-greek-wght-normal-CkhJZR-_.woff2": {
		"type": "font/woff2",
		"etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
		"mtime": "2026-10-29T08:36:22.195Z",
		"size": 18996,
		"path": "../public/assets/inter-greek-wght-normal-CkhJZR-_.woff2"
	},
	"/assets/jsx-runtime-CQSWVoIU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-nofgoiVwtLbMQZa1feZ8J9/8lXk\"",
		"mtime": "2026-10-29T08:36:22.129Z",
		"size": 424,
		"path": "../public/assets/jsx-runtime-CQSWVoIU.js"
	},
	"/assets/index-Bn5rIujQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b508-YTgTkDC4nBus/+fbn9BXd/ifY5U\"",
		"mtime": "2026-10-29T08:36:22.086Z",
		"size": 374024,
		"path": "../public/assets/index-Bn5rIujQ.js"
	},
	"/assets/login-CO1abYb0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bac-tVe+pOOHcKfRCNU/puMpI6ZtIrA\"",
		"mtime": "2026-10-29T08:36:22.133Z",
		"size": 7084,
		"path": "../public/assets/login-CO1abYb0.js"
	},
	"/assets/settings-DpCIgncI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-oG2B6W39DUCaA43NcbjKHCmCBrI\"",
		"mtime": "2026-10-29T08:36:22.155Z",
		"size": 156,
		"path": "../public/assets/settings-DpCIgncI.js"
	},
	"/assets/routes-L1ZlZwr5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-C3jhY4OhWY/JendVceOnx8RF4bY\"",
		"mtime": "2026-10-29T08:36:22.155Z",
		"size": 225,
		"path": "../public/assets/routes-L1ZlZwr5.js"
	},
	"/assets/inter-latin-wght-normal-Dx4kXJAl.woff2": {
		"type": "font/woff2",
		"etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
		"mtime": "2026-10-29T08:36:22.195Z",
		"size": 48256,
		"path": "../public/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
	},
	"/assets/__vite-browser-external-DhMFdDJY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c-VJlyoZLSh/OMexnCReAyya4nlZE\"",
		"mtime": "2026-10-29T08:36:22.089Z",
		"size": 92,
		"path": "../public/assets/__vite-browser-external-DhMFdDJY.js"
	},
	"/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2": {
		"type": "font/woff2",
		"etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
		"mtime": "2026-10-29T08:36:22.197Z",
		"size": 10252,
		"path": "../public/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2"
	},
	"/assets/useRouter-NlGqF4HX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1db4-x6FIGGMxAgwWFKlfHrp8GRJ53XE\"",
		"mtime": "2026-10-29T08:36:22.169Z",
		"size": 7604,
		"path": "../public/assets/useRouter-NlGqF4HX.js"
	},
	"/assets/_layout-D2GVRI18.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-fB9Up87an9KN8bcEB1gCqaxBpkM\"",
		"mtime": "2026-10-29T08:36:22.089Z",
		"size": 320,
		"path": "../public/assets/_layout-D2GVRI18.js"
	},
	"/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2": {
		"type": "font/woff2",
		"etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
		"mtime": "2026-10-29T08:36:22.195Z",
		"size": 85068,
		"path": "../public/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2"
	},
	"/assets/styles-Dy8THmZ9.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d51b-fxNakPyoJCopsaWKkRkpQrwunV8\"",
		"mtime": "2026-10-29T08:36:22.197Z",
		"size": 54555,
		"path": "../public/assets/styles-Dy8THmZ9.css"
	},
	"/assets/updates-D3CMSBb9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-XtPaM36UX8Q9I0f0gYNRfhdzP+A\"",
		"mtime": "2026-10-29T08:36:22.159Z",
		"size": 155,
		"path": "../public/assets/updates-D3CMSBb9.js"
	},
	"/assets/7zz-CgkXYLdN.wasm": {
		"type": "application/wasm",
		"etag": "\"1934db-JwolgTMcwuoy1u/vEx8V0uwTj2Y\"",
		"mtime": "2026-10-29T08:36:22.173Z",
		"size": 1651931,
		"path": "../public/assets/7zz-CgkXYLdN.wasm"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_SJSPpl = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_SJSPpl
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
