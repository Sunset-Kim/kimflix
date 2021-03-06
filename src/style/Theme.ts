import { DefaultTheme, css } from "styled-components";
import { BackQuoteArgs, Color, Media, Sizes } from "./style";

const color: { [key: string]: Color } = {
  primary: {
    default: "#0154FA",
    dark: "#162AC0",
    light: "#13BFF4",
  },
  secondary: {
    default: "#31313",
  },
  background: {
    dark: "#0D0D0D",
    light: "#1c1c1c",
    default: "#131218",
  },
};

const sizes: Sizes = {
  mobile: 320,
  tablet: 786,
  desktop: 1024,
};

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
};

/*
 *sizes key을 받아서 [moblie, tablet, desktop]
 * reduce로 합쳐서 함수를 만들어주는 방법으로 재정의
 * media 오브젝트를 초기값으로 주고
 * label에 따라 min-width 를 바꾸고
 * 입력받은 배열을 {안으로 넣음!}
 */
Object.keys(sizes).reduce((acc, label) => {
  switch (label) {
    case "mobile":
      acc.mobile = (...args) => css`
        @media screen and (min-width: ${sizes.mobile}px) {
          ${args}
        }
      `;
      break;
    case "tablet":
      acc.tablet = (...args) => css`
        @media screen and (min-width: ${sizes.tablet}px) {
          ${args}
        }
      `;
      break;
    case "desktop":
      acc.desktop = (...args) => css`
        @media screen and (min-width: ${sizes.desktop}px) {
          ${args}
        }
      `;
      break;
  }
  return acc;
}, media);

const baseButton = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  border: 0;
  outline: 0;
  cursor: pointer;
  background-color: transparent;
`;

export const Theme: DefaultTheme = {
  sizes,
  media,
  color,
  button: {
    size: {
      padding: css`
        ${baseButton}
        padding: 8px 16px;
        border-radius: 16px;
      `,
      sm: css`
        ${baseButton}
        width: 35px;
        height: 35px;
        border-radius: 50%;
      `,
    },
    style: {
      primary: css`
        background-color: ${color.primary.default};
        transition: background-color 0.3s ease-in-out;
        &:hover {
          background-color: ${color.primary.dark};
        }
      `,
    },
  },
};
