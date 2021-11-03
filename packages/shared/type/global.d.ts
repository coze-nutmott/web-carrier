type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
type RequiredKeys<T> = NonNullable<KeysOfType<T, NonNullable<T[keyof T]>>>;
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
type PartialRequired<T, Keys extends keyof T> = Omit<T, Keys> &
  Required<Pick<T, Keys>>;

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

type EventObject = React.SyntheticEvent<HTMLElement>;
type KeyboardEventObject = React.KeyboardEvent<Element> | KeyboardEvent;
type EventFunc = React.ReactEventHandler<any>;
