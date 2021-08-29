import { ITheme } from '@douglas-serena/utils';

export const colors: ITheme = {
  global: {
    primary: {
      default: '#0288d1',
      light: '#5eb8ff',
      dark: '#005b9f',
    },
    danger: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    icon: '#fff',
  },
  dark: {
    background: {
      default: '#181818',
      light: '#424242',
      dark: '#202020',
    },
    text: {
      default: '#fff',
      light: '#ddd',
      button: '#fff',
    },
  },
  light: {
    background: {
      default: '#fff',
      light: '#fff',
      dark: '#eee',
    },
    text: {
      default: '#333',
      light: '#fff',
      button: '#fff',
    },
  },
};
