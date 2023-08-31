import styled, {css} from 'styled-components';

export const screen: any = {
  xs: 321,
  sm: 767,
  md: 991,
  lg: 1199,
};

export const media = Object.keys(screen).reduce((m: any, size) => {
  m[size] = (...args: any) => css`
    @media (max-width: ${screen[size]}px) {
      ${(css as any)(...args)};
    }
  `;

  return m;
}, {});

export const ShowDesktopOnly = styled.div`
  ${media.md`
      display: none;
    `}
`;

export const ShowMobileOnly = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;

export const mediaWeb = `(min-width: ${screen.md}px)`;
