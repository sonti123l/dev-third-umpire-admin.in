import { v as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { _ as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/info-Cn5H3y1b.js
var import_jsx_runtime = require_jsx_runtime();
function DevicesPage() {
	const { id } = useParams({ strict: false });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevicesPage, {}) });
}
//#endregion
export { RouteComponent as component };
