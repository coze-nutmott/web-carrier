export interface ITestCheckbox {
  label: string;
  isTrue: boolean;
}

export interface ITestSelect<T> {
  id: string | number;
  label?: string;
  options: Array<{
    key: T;
    text: string;
  }>;
  selectedKey: T;
}

export interface ITestInput<T> {
  type: 'text' | 'number';
  label: string;
  value: T;
  disabled?: boolean;
}

export interface ITestButton {
  text: string;
  onClick: () => void;
}
