import { v as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { f as Outlet, g as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as AuthGuard } from "./_ssr/AuthGuard-CC0DF2AS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_layout-BW27Igzr.js
var import_jsx_runtime = require_jsx_runtime();
function Layout() {
	useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }) });
}
//#endregion
export { RouteComponent as component };
