import { r as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { r as useAuth } from "./AuthContext-Ce3Plbr8.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CrFHzRrF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login, signup, isAuthenticated, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [serverId, setServerId] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return 1;
		const stored = localStorage.getItem("fota_server_id");
		return stored && stored !== "3" ? Number(stored) : 1;
	});
	const handleServerChange = (id) => {
		setServerId(id);
		if (typeof window !== "undefined") localStorage.setItem("fota_server_id", String(id));
	};
	(0, import_react.useEffect)(() => {
		if (isAuthenticated && !authLoading) navigate({ to: "/" });
	}, [
		isAuthenticated,
		authLoading,
		navigate
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please fill in all required fields");
			return;
		}
		if (mode === "signup") {
			if (password.length < 6) {
				toast.error("Password must be at least 6 characters long");
				return;
			}
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}
		}
		setSubmitting(true);
		try {
			if (mode === "login") {
				await login({
					email,
					password
				});
				toast.success("Welcome back! Logged in successfully");
			} else {
				await signup({
					name,
					email,
					password
				});
				toast.success("Account created successfully as FOTA Manager");
			}
			navigate({ to: "/" });
		} catch (err) {
			const errMsg = err?.data?.error || err?.message || (mode === "login" ? "Invalid email or password" : "Registration failed");
			toast.error(errMsg);
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:mx-auto sm:w-full sm:max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center shadow-lg shadow-indigo-200 mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-6 h-6 text-white",
						fill: "none",
						stroke: "currentColor",
						viewBox: "0 0 24 24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							strokeWidth: 1.8,
							d: "M13 10V3L4 14h7v7l9-11h-7z"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight text-slate-900",
					children: "Third Umpire FOTA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-slate-500",
					children: "Firmware Over-The-Air Manager Portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 inline-flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleServerChange(1),
						className: `px-3 py-1 text-xs font-semibold rounded-lg transition-all ${serverId === 1 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
						children: "Production"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleServerChange(2),
						className: `px-3 py-1 text-xs font-semibold rounded-lg transition-all ${serverId === 2 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
						children: "Test"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("login"),
							className: `py-2 text-xs font-bold rounded-lg transition-all ${mode === "login" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `py-2 text-xs font-bold rounded-lg transition-all ${mode === "signup" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`,
							children: "Register Manager"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: handleSubmit,
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "e.g. John Doe",
								className: "w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "manager@thirdumpire.ai",
								className: "w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••",
									className: "w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
								}),
								mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-slate-400",
									children: "Must be at least 6 characters long"
								})
							] }),
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Confirm Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: confirmPassword,
								onChange: (e) => setConfirmPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: submitting,
									className: "w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
									children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "w-4 h-4 animate-spin",
										fill: "none",
										viewBox: "0 0 24 24",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											className: "opacity-25",
											cx: "12",
											cy: "12",
											r: "10",
											stroke: "currentColor",
											strokeWidth: "4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											className: "opacity-75",
											fill: "currentColor",
											d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Processing..." })] }) : mode === "login" ? "Sign In" : "Register as FOTA Manager"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center text-xs text-slate-500",
						children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("signup"),
								className: "font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-2",
								children: "Create one now"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("login"),
								className: "font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-2",
								children: "Sign in"
							})
						] })
					})
				]
			})
		})]
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, {});
}
//#endregion
export { RouteComponent as component };
