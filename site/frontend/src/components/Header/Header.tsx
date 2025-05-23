import { gsap } from "gsap";
import { createSignal, onMount } from "solid-js";

import { ease } from "../../accessibility/ease";

import Home from "./Home/Home";
import I18n from "./I18n";
import Options from "./Options/Options";
import Toggle from "./Toggle/Toggle";

export default () => {
	let backdrop!: HTMLDivElement;
	let home!: HTMLAnchorElement;
	let pad!: HTMLDivElement;
	let toggle!: HTMLButtonElement;
	let options!: HTMLDivElement;

	const [expanded, setExpand] = createSignal(false);

	onMount(() => {
		const scroll = gsap.timeline({
			scrollTrigger: {
				start: window.innerHeight * 0.05,
				onLeaveBack: () => scroll.reverse(),
			},
			defaults: ease({ duration: 0.6, ease: "power3.inOut" }),
		});

		scroll
			.fromTo(
				backdrop,
				{ opacity: 0, scaleX: 1.02, scaleY: 1.2 },
				{ opacity: 1, scaleX: 1, scaleY: 1 },
			)
			.fromTo(
				home,
				{ clipPath: "rect(0 100% 100% 0)", translateX: 0 },
				{ clipPath: "rect(0 21% 100% 0)", translateX: "42%" },
				"<",
			);
	});

	return (
		<I18n>
			<div
				ref={pad}
				class="mb-26 h-0 w-full"
			></div>
			<header class="fixed mt-2 flex h-16 w-[95%] items-center justify-center">
				<div
					ref={backdrop}
					class="bg-header/75 absolute top-0 box-content h-full w-full rounded-4xl backdrop-blur-lg"
				></div>
				<Home ref={home}></Home>
				<div class="absolute right-4 h-1/2">
					<Toggle
						ref={toggle}
						onclick={() => {
							toggle.disabled = true;
							setTimeout(() => (toggle.disabled = false), 600);

							const reveal = gsap.timeline({
								defaults: ease({ duration: 0.6, ease: "power3.inOut" }),
							});

							reveal
								.fromTo(pad, { height: 0 }, { height: "12rem" })
								.fromTo(
									backdrop,
									{ paddingBottom: 0 },
									{ paddingBottom: "12rem" },
									"<",
								)
								.fromTo(options, { opacity: 0 }, { opacity: 1 }, "<50%");

							if (expanded()) reveal.progress(1).reverse();

							setExpand((show) => !show);
						}}
						expanded={expanded()}
					></Toggle>
				</div>
				<Options
					ref={options}
					enable={expanded()}
					class="absolute top-19 w-11/12 opacity-0"
				></Options>
			</header>
		</I18n>
	);
};
