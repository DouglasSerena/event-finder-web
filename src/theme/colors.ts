import { ITheme } from '@douglas-serena/utils';

export const colors: ITheme = {
  global: {
    primary: {
      default: '2, 136, 209',
      light: '94, 184, 255',
      dark: '0, 91, 159',
    },
    danger: '244, 67, 54',
    success: '76, 175, 80',
    warning: '255, 152, 0',
    icon: '255, 255, 255',
  },
  dark: {
    background: {
      default: '24, 24, 24',
      light: '66, 66, 66',
      dark: '32, 32, 32',
    },
    text: {
      default: '255, 255, 255',
      light: '221, 221, 221',
      button: '255, 255, 255',
    },
  },
  light: {
    background: {
      default: '255, 255, 255',
      light: '255, 255, 255',
      dark: '238, 238, 238',
    },
    text: {
      default: '51, 51, 51',
      light: '255, 255, 255',
      button: '255, 255, 255',
    },
  },
};
