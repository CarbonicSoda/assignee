import "./styles/index.css";

import { Router } from "@solidjs/router";
import { Natlog } from "natural-log";
import { render } from "solid-js/web";

import { routes } from "./pages/routes";

import "./styles/effects";

import Loader from "./components/Loader/Loader";

new Natlog();

const loadPromise = new Promise<void>((res) => {
	window.onload = () => res();
});

render(
	() => (
		<>
			<Loader loadPromise={loadPromise}></Loader>
			<Router>{routes}</Router>
		</>
	),
	document.getElementById("root")!,
);
