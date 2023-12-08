/**
 *  Ant Design - Theme
 */

import { ThemeConfig } from 'antd/es/config-provider/context';

export const theme: ThemeConfig = {
  hashed: true,
  token: {
    fontFamily: 'var(--font-inter)',
    colorBgBase: '#FFFFFF',
    // colorBgContainer: '#FFFFFF',
    // colorBgLayout: '#FFFFFF',
    // borderRadius: 5,
    colorPrimary: '#6f2f83',
  },
  components: {
    Layout: {
      // colorBgHeader: '#FFFFFF',
    },
    Typography: {
      // colorText: '#727272',
    },
    Menu: {},
    Carousel: {},
    Button: {
      controlHeight: 40,
    },
    Select: {
      // colorBgBase: '#F4F4F4',
      // colorBgContainer: '#F4F4F4',
      // controlHeight: 40,
    },
    Input: {
      controlHeight: 40,
    },
    DatePicker: {
      controlHeight: 40,
    },
  },
};
