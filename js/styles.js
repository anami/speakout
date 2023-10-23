import { css } from './base.js';

export const BaseStyle = css`
  :root {
    --main-color: #d600ff;
  }
`;

export const BaseButton = css`
  button {
    background-color: #d600ff;
    color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    color: #fff;
    text-transform: uppercase;
    padding: 0.25rem 5rem;
    font-weight: normal;
    margin: 0.5rem;
    letter-spacing: 1px;
  }
`;

export const RoundButton = css`
  button {
    width: 3rem;
    height: 3rem;
    border: 0;
    padding: 0;
    margin: 0;
    border-radius: 50%;
  }
`;
