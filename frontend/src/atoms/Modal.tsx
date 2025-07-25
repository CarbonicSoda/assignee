import { gsap } from "gsap";
import { createEffect, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";
import { ease } from "../configs/media";
import { Props } from "../types/props";

export default (props: Props<"div"> & { toggle: HTMLButtonElement }) => {
	let modal!: HTMLDivElement;

	const [open, toggle] = createSignal(false);
	props.toggle.addEventListener("click", () => toggle(!open()));

	const onclick = (ev: MouseEvent) => {
		const node = ev.target as Node | null;
		toggle(props.toggle.contains(node) || modal.contains(node));
	};
	const onpress = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			toggle(false);
		}
	};

	createEffect(() => {
		if (open()) {
			document.addEventListener("click", onclick);
			document.addEventListener("keydown", onpress);
		} else {
			document.removeEventListener("click", onclick);
			document.removeEventListener("keydown", onpress);
		}

		gsap.timeline({ defaults: ease({ duration: 0.3, ease: "power2.out" }) }).to(
			modal,
			open()
				? { opacity: 1, scaleX: 1, scaleY: 1 }
				: { opacity: 0, scaleX: 1.02, scaleY: 1.02 },
		);
	});

	return (
		<div
			ref={modal}
			role="dialog"
			title={props.toggle.title}
			class={twMerge(
				!open() && "pointer-events-none",
				"bg-overlay/75 shadow-shadow fixed inset-1/2 size-max -translate-1/2 rounded-2xl p-6 opacity-0 shadow-2xl/30 backdrop-blur-lg",
			)}
		>
			<div {...props}></div>
		</div>
	);
};
