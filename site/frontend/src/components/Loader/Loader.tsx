import { gsap } from "gsap";
import { createSignal, onMount, Setter, Show } from "solid-js";

import Logo from "../Logo/Logo";

export default (props: { setIsRevealing: Setter<boolean> }) => {
	let screen!: HTMLDivElement;
	let mask!: HTMLDivElement;
	let logo!: Element;
	let attrib!: HTMLSpanElement;

	const [isLoaded, setIsLoaded] = createSignal(false);

	onMount(() => {
		const tl = gsap.timeline({
			onComplete: () => {
				setIsLoaded(true);
			},
		});

		tl.fromTo(
			[logo, attrib],
			{ opacity: 0, translateY: "100%", rotateX: "80deg" },
			{
				opacity: 1,
				translateY: 0,
				rotateX: 0,
				duration: 0.8,
				ease: "power2.out",
				stagger: 0.1,
			},
		);
		tl.fromTo(
			screen,
			{
				clipPath:
					"polygon(0% 0%, 0% 100%, 5% 50%, 15% 50%, 95% 50%, 85% 50%, 0% 50%, 0% 100%, 100% 100%, 100% 0%)",
			},
			{
				clipPath:
					"polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0 100%, 100% 100%, 100% 0%)",
				duration: 1.2,
				ease: "expo.inOut",
			},
			">",
		);
		tl.fromTo(
			mask,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 1.2,
				ease: "expo.inOut",
				onStart: () => {
					props.setIsRevealing(true);
				},
			},
			"<",
		);
	});

	return (
		<Show when={!isLoaded()}>
			<div class="fixed z-[1000] h-screen w-full">
				<div
					class="bg-primary-fg absolute -z-[1000] h-full w-full"
					ref={mask}
				></div>
				<div
					class="bg-primary-bg flex h-full w-full flex-col items-center justify-center"
					ref={screen}
				>
					<Logo
						class="text-primary-fg -mt-16 w-1/5 origin-[center_top] transform-3d"
						ref={logo}
					></Logo>
					<span
						class="text-primary-fg font-fira py-5 text-2xl font-medium"
						ref={attrib}
					>
						Presented by David W.
					</span>
				</div>
			</div>
		</Show>
	);
};
