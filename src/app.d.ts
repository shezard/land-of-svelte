declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:clickoutside'?: CompositionEventHandler<T>;
	}
}
