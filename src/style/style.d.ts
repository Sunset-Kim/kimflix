import "styled-components";
import { CSSProp } from "styled-components";

interface Sizes {
  mobile: number;
  tablet: number;
  desktop: number;
}

type BackQuoteArgs = [TemplateStringsArray];

// 반응형 css Props을 만들어주는 object를 선언함
interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

interface Color {
  default: string;
  dark?: string;
  light?: string;
}

interface Button {
  style: {
    primary?: CSSProp;
    secondary?: CSSProp;
    outlined?: CSSProp;
    ghost?: CSSProp;
  };
  size: {
    padding?: CSSProp;
    sm?: CSSProp;
    md?: CSSProp;
    lg?: CSSProp;
  };
}

interface Colors {
  [key: string]: Color;
}

declare module "styled-components" {
  export interface DefaultTheme {
    sizes: Sizes;
    media: Media;
    color: Colors;
    button?: Button;
  }
}
