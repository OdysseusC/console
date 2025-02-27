import { CSSProperties, FunctionComponent, MouseEventHandler } from 'react';

export interface FilledIconProps {
  mode?: 'dark' | 'light';
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export interface TwoToneIconProps extends FilledIconProps {
  twoToneColor?: string;
}

export interface FilledIconPropsWithSvgComponent extends FilledIconProps {
  svgComponent: FunctionComponent<any>;
}

export interface TwoToneIconPropsWithSvgComponent extends TwoToneIconProps {
  svgComponent: FunctionComponent<any>;
}
