import { BarChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

export const menus: MenuProps['items'] = [
  {
    label: 'แดชบอร์ด',
    key: '/dashboard',
    icon: <BarChartOutlined />,
  },
  {
    label: 'บันทึกการใช้งานอุปกรณ์',
    key: '/device',
    icon: <DesktopOutlined />,
  },
];
