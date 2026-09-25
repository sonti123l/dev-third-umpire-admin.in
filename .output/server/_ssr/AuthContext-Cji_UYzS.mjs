import { r as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { t as api } from "../_libs/js-cookie.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-Cji_UYzS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var arrayToUrlString = (key, value) => {
	return value.map((item) => {
		return `${key}=${item}`;
	}).join("&");
};
var prepareURLEncodedParams = (url, params) => {
	const paramsURLs = Object.keys(params).map((key) => {
		const value = params[key];
		if (value && value.length) {
			if (Array.isArray(value)) return arrayToUrlString(key, value);
			return `${key}=${params[key]}`;
		} else if (value) return `${key}=${params[key]}`;
		else return "";
	}).filter((e) => e.length).filter((e) => e).join("&");
	if (paramsURLs) return url + "?" + paramsURLs;
	return url;
};
var FetchService = class {
	authStatusCodes = [
		401,
		403,
		404
	];
	authErrorURLs = [
		"/auth/login",
		"/auth/signup",
		"/auth/refresh-token",
		"/refresh-token"
	];
	activeRequests = /* @__PURE__ */ new Map();
	_fetchType;
	requestCounter = 0;
	constructor(fetchTypeValue = "json") {
		this._fetchType = fetchTypeValue;
	}
	/**
	* Returns the FOTA server base URL based on the selected server.
	*
	* fota_server_id:
	* 1 -> Production
	* 2 -> Test
	* 3 -> Local (fallback to VITE_PUBLIC_API_URL)
	*/
	getBaseUrl() {
		const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
		const defaultServerId = isLocalhost ? "3" : "1";
		const serverId = typeof window !== "undefined" ? localStorage.getItem("fota_server_id") || defaultServerId : defaultServerId;
		if (serverId === "3") return "http://localhost:8787";
		if (serverId === "2") return "https://fotatest.thirdumpire.ai";
		if (serverId === "1") {
			if (isLocalhost && !localStorage.getItem("fota_server_id")) return "http://localhost:8787";
			return "https://fota.thirdumpire.ai";
		}
		return "http://localhost:8787";
	}
	configureAuthorization(config) {
		const accessToken = api.get("token") || "";
		config.headers["Authorization"] = "Bearer " + accessToken;
	}
	setHeader(config) {
		config.headers = {};
	}
	setDefaultHeaders(config) {
		config.headers = config.headers || {};
		if (!config.headers["Content-Type"] && !(config.body instanceof FormData)) config.headers["Content-Type"] = "application/json";
	}
	checkToLogOutOrNot(path) {
		return this.authErrorURLs.some((arrayUrl) => path.includes(arrayUrl));
	}
	isAuthRequest(path) {
		return this.authErrorURLs.some((arrayUrl) => path.includes(arrayUrl));
	}
	getRequestKey(path, method = "GET", allowConcurrent = false) {
		if (allowConcurrent) return `${method}-${path}-${++this.requestCounter}`;
		return `${method}-${path}`;
	}
	async refreshAccessToken() {
		const refreshToken = api.get("refresh_token");
		if (!refreshToken) {
			api.remove("token");
			return null;
		}
		try {
			const response = await fetch(this.getBaseUrl() + "/refresh-token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken })
			});
			if (!response.ok) {
				api.remove("token");
				api.remove("refresh_token");
				return null;
			}
			const data = await response.json();
			if (data?.access_token) {
				api.set("token", data.access_token);
				return data.access_token;
			}
			return null;
		} catch {
			api.remove("token");
			api.remove("refresh_token");
			return null;
		}
	}
	async hit(path, config = {}) {
		const method = config.method || "GET";
		const allowConcurrent = config.allowConcurrent ?? (method === "POST" || method === "PUT" || method === "PATCH");
		const requestKey = this.getRequestKey(path, method, allowConcurrent);
		/**
		* Cancel previous request with the same method/path
		* when concurrent requests are not allowed.
		*/
		if (!allowConcurrent) {
			const existingController = this.activeRequests.get(requestKey);
			if (existingController) existingController.abort();
		}
		const abortController = new AbortController();
		config.signal = abortController.signal;
		this.activeRequests.set(requestKey, abortController);
		/**
		* Set default headers.
		*/
		const headers = config.headers || {};
		config.headers = headers;
		if (!headers["Content-Type"] && !(config.body instanceof FormData)) headers["Content-Type"] = "application/json";
		/**
		* Add Authorization header for non-auth requests.
		*/
		if (!this.isAuthRequest(path)) this.configureAuthorization({ headers });
		/**
		* Use the selected FOTA server.
		*
		* Production:
		* https://fota.thirdumpire.ai
		*
		* Test:
		* https://fotatest.thirdumpire.ai
		*/
		const url = this.getBaseUrl() + path;
		let response;
		try {
			response = await fetch(url, config);
			/**
			* If access token expired, refresh it and retry once.
			*/
			if (!response.ok && response.status === 401 && !this.checkToLogOutOrNot(path)) {
				const newToken = await this.refreshAccessToken();
				if (newToken) {
					config.headers["Authorization"] = "Bearer " + newToken;
					response = await fetch(url, config);
				}
			}
			this.activeRequests.delete(requestKey);
		} catch (error) {
			this.activeRequests.delete(requestKey);
			/**
			* Request was cancelled.
			*/
			if (error instanceof Error && error.name === "AbortError") return {
				success: false,
				status: 0,
				data: null,
				message: "Request cancelled"
			};
			throw {
				success: false,
				status: 0,
				data: null,
				message: error instanceof Error ? error.message : "Network error"
			};
		}
		/**
		* Handle unsuccessful HTTP responses.
		*/
		if (!response.ok) {
			if (this.authStatusCodes.includes(response.status) && !this.checkToLogOutOrNot(path)) {
				const contentType = response.headers.get("Content-Type") || "";
				let errorData;
				try {
					errorData = contentType.includes("text/html") ? await response.text() : await response.json();
				} catch {
					errorData = { message: response.statusText };
				}
				throw {
					success: false,
					status: response.status,
					data: errorData,
					message: response.statusText
				};
			}
			const contentType = response.headers.get("Content-Type") || "";
			let errorData;
			try {
				errorData = contentType.includes("text/html") ? await response.text() : await response.json();
			} catch {
				errorData = { message: response.statusText };
			}
			const err = new Error(errorData.message || response.statusText);
			err.data = errorData;
			err.status = response.status;
			throw err;
		}
		/**
		* Return raw Response when fetchType is "response".
		*/
		if (this._fetchType === "response") return response;
		if ((response.headers.get("Content-Type") || "").includes("text/html")) return {
			success: true,
			status: response.status,
			data: await response.text()
		};
		return {
			success: true,
			status: response.status,
			data: await response.json()
		};
	}
	async post(url, payload) {
		return await this.hit(url, {
			method: "POST",
			body: payload ? JSON.stringify(payload) : void 0
		});
	}
	async postFormData(url, file) {
		return await this.hit(url, {
			method: "POST",
			body: file
		});
	}
	async get(url, queryParams = {}, contentType) {
		if (Object.keys(queryParams).length) url = prepareURLEncodedParams(url, queryParams);
		const headers = {};
		if (contentType) {
			headers["Content-Type"] = contentType;
			headers["Accept"] = contentType;
		}
		const config = {
			method: "GET",
			headers
		};
		return this.hit(url, config);
	}
	async delete(url, payload = {}) {
		return this.hit(url, {
			method: "DELETE",
			body: JSON.stringify(payload)
		});
	}
	async deleteWithOutPayload(url) {
		return this.hit(url, { method: "DELETE" });
	}
	async put(url, payload = {}) {
		return this.hit(url, {
			method: "PUT",
			body: JSON.stringify(payload)
		});
	}
	async patch(url, payload = {}) {
		return this.hit(url, {
			method: "PATCH",
			body: JSON.stringify(payload)
		});
	}
	cancelAll() {
		this.activeRequests.forEach((controller) => {
			controller.abort();
		});
		this.activeRequests.clear();
	}
};
var $fetch = new FetchService();
var loginManager = async (payload) => {
	return (await $fetch.post("/auth/login", payload)).data;
};
var signupManager = async (payload) => {
	return (await $fetch.post("/auth/signup", payload)).data;
};
var getCurrentManager = async () => {
	return (await $fetch.get("/auth/me")).data;
};
var logoutManager = async () => {
	return (await $fetch.post("/auth/logout")).data;
};
var AuthContext = (0, import_react.createContext)(void 0);
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const checkAuth = (0, import_react.useCallback)(async () => {
		setIsLoading(true);
		const token = api.get("token");
		const refreshToken = api.get("refresh_token");
		if (!token && !refreshToken) {
			setUser(null);
			setIsAuthenticated(false);
			setIsLoading(false);
			return;
		}
		try {
			if (token) try {
				const profile = await getCurrentManager();
				if (profile?.user) {
					setUser(profile.user);
					setIsAuthenticated(true);
					setIsLoading(false);
					return;
				}
			} catch (err) {}
			if (refreshToken) {
				if (await $fetch.refreshAccessToken()) {
					const profile = await getCurrentManager();
					if (profile?.user) {
						setUser(profile.user);
						setIsAuthenticated(true);
						setIsLoading(false);
						return;
					}
				}
			}
			api.remove("token");
			api.remove("refresh_token");
			setUser(null);
			setIsAuthenticated(false);
		} catch {
			api.remove("token");
			api.remove("refresh_token");
			setUser(null);
			setIsAuthenticated(false);
		} finally {
			setIsLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		checkAuth();
	}, [checkAuth]);
	const login = async (payload) => {
		const res = await loginManager(payload);
		api.set("token", res.access_token, { expires: 7 });
		api.set("refresh_token", res.refresh_token, { expires: 30 });
		setUser(res.user);
		setIsAuthenticated(true);
	};
	const signup = async (payload) => {
		const res = await signupManager(payload);
		api.set("token", res.access_token, { expires: 7 });
		api.set("refresh_token", res.refresh_token, { expires: 30 });
		setUser(res.user);
		setIsAuthenticated(true);
	};
	const logout = async () => {
		try {
			await logoutManager();
		} catch {} finally {
			api.remove("token");
			api.remove("refresh_token");
			setUser(null);
			setIsAuthenticated(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			isAuthenticated,
			isLoading,
			login,
			signup,
			logout,
			checkAuth
		},
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
//#endregion
export { AuthProvider as n, useAuth as r, $fetch as t };
