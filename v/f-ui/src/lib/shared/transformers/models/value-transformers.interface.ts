export type ValueTransformer<T, R> = (value: T) => R;

export type ValueTransformerSignal<T, R> = ValueTransformer<T, R> | undefined;
