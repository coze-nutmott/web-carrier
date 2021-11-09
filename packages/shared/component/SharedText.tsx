import { ComponentType, createElement, HTMLProps, ReactNode } from 'react';
import styles from './SharedText.module.scss';

export interface IProps<T = string> extends Omit<HTMLProps<HTMLElement>, 'as'> {
  variant: T;
  children: ReactNode;
  as?: 'div' | 'span' | 'p' | 'label' | 'dt' | 'dd';
}

type CompType<T> = ComponentType<IProps<T>>;
export let SharedText: CompType<any>;
export function createText<T extends string>(colorMap: IColorMap): CompType<T> {
  SharedText = function Text({
    variant,
    className,
    children,
    as = 'p',
    ...rest
  }: IProps<T>) {
    const childrenEl =
      typeof children === 'string'
        ? _makeStyledText(children, colorMap)
        : children;

    return createElement(
      as,
      {
        className: cn(styles.text, variant, className),
        ...rest,
      },
      childrenEl,
    );
  };
  return SharedText;
}

// 현재 지원하는 태그: bold, 색상 태그(ex. <red>text</red>)
const REGEX = /<\s*([a-zA-Z\-_]+)\s*>(.*?)<\s*\/\s*([a-zA-Z\-_]+)\s*>/;
export function _makeStyledText(
  text: string,
  colorMap: IColorMap,
): string | ReactNode[] {
  const result = [];
  let remainText = text;
  while (true) {
    const matched = remainText.match(REGEX);
    if (!matched) {
      break;
    }
    const startIndex = matched.index || 0;
    const prevText = remainText.substr(0, startIndex);
    if (prevText) {
      result.push(prevText);
    }
    const fullText = matched[0];
    const tagMap = getTagMap(matched[1].split('-'));
    const content = matched[2];

    const color = getColor(tagMap, colorMap);
    const fontWeight = tagMap.bold ? 'bold' : undefined;
    result.push(
      <span
        key={result.length}
        style={{
          color,
          fontWeight,
        }}
      >
        {content}
      </span>,
    );
    remainText = remainText.substr(startIndex + fullText.length);
  }
  if (remainText) {
    if (result.length === 0) {
      return text;
    } else {
      result.push(remainText);
    }
  }
  return result;
}

function getTagMap(tags: string[]) {
  return tags.reduce<{ [key: string]: boolean }>(
    (acc, tag) => ((acc[tag] = true), acc),
    {},
  );
}

function getColor(tagMap: ReturnType<typeof getTagMap>, colorMap: IColorMap) {
  const keys = Object.keys(colorMap);
  for (const key of keys) {
    if (tagMap[key]) {
      return colorMap[key];
    }
  }
  return 'inherit';
}

type IColorMap = { [color: string]: string };
