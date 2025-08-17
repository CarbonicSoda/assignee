export default (props: { children: string }) => (
	<a
		title={props.children}
		href={"mailto:" + props.children}
		class="h-6"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="stroke-text-minor h-full fill-none stroke-[1.5]"
		>
			<path d="m3 8 5.4 3.6c1.3.9 2 1.3 2.7 1.5a4 4 0 0 0 1.8 0 9 9 0 0 0 2.7-1.5L21 8M6.2 19h11.6c1.1 0 1.7 0 2.1-.2.4-.2.7-.5.9-.9.2-.4.2-1 .2-2.1V8.2c0-1.1 0-1.7-.2-2.1a2 2 0 0 0-.9-.9c-.4-.2-1-.2-2.1-.2H6.2c-1.1 0-1.7 0-2.1.2a2 2 0 0 0-.9.9C3 6.5 3 7 3 8.2v7.6c0 1.1 0 1.7.2 2.1.2.4.5.7.9.9.4.2 1 .2 2.1.2Z" />
		</svg>
	</a>
);
