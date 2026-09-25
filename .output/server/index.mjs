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
	"/assets/AuthGuard-7nRIarl-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"534-B00cewIUCB0PkeLHCpCfwCw4JgA\"",
		"mtime": "2026-09-25T09:22:51.999Z",
		"size": 1332,
		"path": "../public/assets/AuthGuard-7nRIarl-.js"
	},
	"/assets/DashboardPage-ncGwfrO0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bb7-+CvdHQu/Fy0ccQZx/vcyWXBuIWQ\"",
		"mtime": "2026-09-25T09:22:52.001Z",
		"size": 35767,
		"path": "../public/assets/DashboardPage-ncGwfrO0.js"
	},
	"/assets/dashboard-DE8rUmQH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-JmJjpWzWubNhflnq69uEjZ1LyxU\"",
		"mtime": "2026-09-25T09:22:52.001Z",
		"size": 185,
		"path": "../public/assets/dashboard-DE8rUmQH.js"
	},
	"/assets/fota-information-CPF4ymW-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37827-5zOwiZOWbBr7FVgewHHPd9Ji1uE\"",
		"mtime": "2026-09-25T09:22:52.013Z",
		"size": 227367,
		"path": "../public/assets/fota-information-CPF4ymW-.js"
	},
	"/assets/index-5hwYjP5J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b4c2-ky57hNUMrFhCc1xsQj0Bkc91PLE\"",
		"mtime": "2026-09-25T09:22:51.999Z",
		"size": 373954,
		"path": "../public/assets/index-5hwYjP5J.js"
	},
	"/assets/dashboardService-NHP7txnC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"246d-oLIi8okyYlWpLZT+ye1tVWIxiZQ\"",
		"mtime": "2026-09-25T09:22:52.011Z",
		"size": 9325,
		"path": "../public/assets/dashboardService-NHP7txnC.js"
	},
	"/assets/info-ZHgS4zsO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-AiTtXRmogWxwAdaThhPTL+zjuMs\"",
		"mtime": "2026-09-25T09:22:52.014Z",
		"size": 246,
		"path": "../public/assets/info-ZHgS4zsO.js"
	},
	"/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2": {
		"type": "font/woff2",
		"etag": "\"6568-cF1iUGbboMFZ8TfnP5HiMgl9II0\"",
		"mtime": "2026-09-25T09:22:52.061Z",
		"size": 25960,
		"path": "../public/assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2"
	},
	"/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2": {
		"type": "font/woff2",
		"etag": "\"493c-n3Oy9D6jvzfMjpClqox+Zo7ERQQ\"",
		"mtime": "2026-09-25T09:22:52.062Z",
		"size": 18748,
		"path": "../public/assets/inter-cyrillic-wght-normal-DqGufNeO.woff2"
	},
	"/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2": {
		"type": "font/woff2",
		"etag": "\"2be0-BP5iTzJeB8nLqYAgKpWNi5o1Zm8\"",
		"mtime": "2026-09-25T09:22:52.063Z",
		"size": 11232,
		"path": "../public/assets/inter-greek-ext-wght-normal-DlzME5K_.woff2"
	},
	"/assets/inter-greek-wght-normal-CkhJZR-_.woff2": {
		"type": "font/woff2",
		"etag": "\"4a34-xor/hj4YNqI52zFecXnUbzQ4Xs4\"",
		"mtime": "2026-09-25T09:22:52.064Z",
		"size": 18996,
		"path": "../public/assets/inter-greek-wght-normal-CkhJZR-_.woff2"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-09-25T09:22:52.014Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/login-D_W_aF0n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b86-vM6d+bvTZAIMzPliQr1ZmTgNkyQ\"",
		"mtime": "2026-09-25T09:22:52.015Z",
		"size": 7046,
		"path": "../public/assets/login-D_W_aF0n.js"
	},
	"/assets/routes-RtFR9Waw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-u6pI5wtJWkWrfZAvG/IQbK8HC34\"",
		"mtime": "2026-09-25T09:22:52.015Z",
		"size": 225,
		"path": "../public/assets/routes-RtFR9Waw.js"
	},
	"/assets/settings-C60_2wnm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-FB7UDKg7ahdXh4UxRKPPdEzWQy8\"",
		"mtime": "2026-09-25T09:22:52.016Z",
		"size": 156,
		"path": "../public/assets/settings-C60_2wnm.js"
	},
	"/assets/updates-DpGb2Rhb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-I5JqSwQRNJaZ0nsAfwHQ3voKNCQ\"",
		"mtime": "2026-09-25T09:22:52.016Z",
		"size": 155,
		"path": "../public/assets/updates-DpGb2Rhb.js"
	},
	"/assets/inter-latin-wght-normal-Dx4kXJAl.woff2": {
		"type": "font/woff2",
		"etag": "\"bc80-8R1ym7Ck2DUNLqPQ/AYs9u8tUpg\"",
		"mtime": "2026-09-25T09:22:52.066Z",
		"size": 48256,
		"path": "../public/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
	},
	"/assets/_layout-BmBc7ibw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-8Kmsq6QLrsBk/rfaCEvtY6T51sw\"",
		"mtime": "2026-09-25T09:22:52.001Z",
		"size": 320,
		"path": "../public/assets/_layout-BmBc7ibw.js"
	},
	"/assets/useRouter-Buw3_9xO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dbf-WdY1P2rk2Ce5Sc+XWTDRTQ4zcvI\"",
		"mtime": "2026-09-25T09:22:52.018Z",
		"size": 7615,
		"path": "../public/assets/useRouter-Buw3_9xO.js"
	},
	"/assets/styles-Dtnq5rq6.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"c8ee-PckDjxLUshFnXnK4TbFg202+ntw\"",
		"mtime": "2026-09-25T09:22:52.067Z",
		"size": 51438,
		"path": "../public/assets/styles-Dtnq5rq6.css"
	},
	"/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2": {
		"type": "font/woff2",
		"etag": "\"280c-nBythjoDQ0+5wVAendJ6wU7Xz2M\"",
		"mtime": "2026-09-25T09:22:52.066Z",
		"size": 10252,
		"path": "../public/assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2"
	},
	"/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2": {
		"type": "font/woff2",
		"etag": "\"14c4c-zz61D7IQFMB9QxHvTAOk/Vh4ibQ\"",
		"mtime": "2026-09-25T09:22:52.065Z",
		"size": 85068,
		"path": "../public/assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2"
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
