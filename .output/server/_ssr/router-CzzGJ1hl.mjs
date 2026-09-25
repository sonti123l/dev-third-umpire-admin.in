import { v as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { n as AuthProvider } from "./AuthContext-tqDdUJGP.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRoute, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CzzGJ1hl.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CaziHlbO.css";
var client = new QueryClient();
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootDocument, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {})
	] })] });
}
var $$splitComponentImporter$7 = () => import("./login-DQu5B7-r.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("../_layout-DU7ZR4NO.mjs");
var Route$6 = createFileRoute("/_layout")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./routes-CbARF568.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./updates-gA4-A33Y.mjs");
var Route$4 = createFileRoute("/_layout/updates/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./settings-BBKU9IfK.mjs");
var Route$3 = createFileRoute("/_layout/settings/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard-CmpHMwr1.mjs");
var Route$2 = createFileRoute("/_layout/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./fota-information-rP55ZAda.mjs");
var Route$1 = createFileRoute("/$deviceId/fota-information/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./info-Cn5H3y1b.mjs");
var Route = createFileRoute("/devices/$id/info/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$8
});
var LayoutRoute = Route$6.update({
	id: "/_layout",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var LayoutUpdatesIndexRoute = Route$4.update({
	id: "/updates/",
	path: "/updates/",
	getParentRoute: () => LayoutRoute
});
var LayoutSettingsIndexRoute = Route$3.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => LayoutRoute
});
var LayoutDashboardIndexRoute = Route$2.update({
	id: "/dashboard/",
	path: "/dashboard/",
	getParentRoute: () => LayoutRoute
});
var DeviceIdFotaInformationIndexRoute = Route$1.update({
	id: "/$deviceId/fota-information/",
	path: "/$deviceId/fota-information/",
	getParentRoute: () => Route$8
});
var DevicesIdInfoIndexRoute = Route.update({
	id: "/devices/$id/info/",
	path: "/devices/$id/info/",
	getParentRoute: () => Route$8
});
var LayoutRouteChildren = {
	LayoutDashboardIndexRoute,
	LayoutSettingsIndexRoute,
	LayoutUpdatesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	LayoutRoute: LayoutRoute._addFileChildren(LayoutRouteChildren),
	LoginRoute,
	DeviceIdFotaInformationIndexRoute,
	DevicesIdInfoIndexRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
