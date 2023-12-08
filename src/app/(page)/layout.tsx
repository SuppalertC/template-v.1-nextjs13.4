'use client';
import { BarsOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { CSSProperties, ReactElement, useState } from 'react';
import { menus } from 'src/utils/constants/menu';

export interface LayoutProps {
  children: ReactElement;
}
const headerStyle: CSSProperties = {
  height: 68,
  backgroundColor: '#ffffff',
  paddingInline: '20px',
  borderBottom: '0.5px solid #d5d5d5',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const siderStyle: CSSProperties = {
  textAlign: 'start',
  background: '#ffffff',
  overflow: 'auto',
  height: '50vh',
  position: 'sticky',
  top: 0,
  left: 0,
  borderInlineEnd: 0,
  borderRight: '0.5px solid #d5d5d5',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

export default function RootLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [current, setCurrent] = useState<string>('/dashboard');

  const onClick: MenuProps['onClick'] = (e: any) => {
    const menuPath = e.key as any;
    setCurrent(e.key);
    router.replace(menuPath);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={headerStyle}>
        <div className="flex flex-row w-full justify-between  items-center">
          <div className="flex flex-row justify-center items-center space-x-2">
            <Button className="flex justify-center items-center w-[32px] h-[32px]" icon={<BarsOutlined rev="setting" />}></Button>
            <ul className="w-[400px] h-[64px] flex flex-col justify-center leading-[11px]">
              <li>
                <Avatar size={48} icon={<span className="text-[16px]">logo</span>} />
              </li>
              <li>
                <span className="md:text-[12px] max-sm:hidden text-font-color-third font-thin ">Thammasat University Hospital</span>
              </li>
            </ul>
            <ul className="h-[64px] flex flex-col justify-center leading-[12px] space-y-1">
              <li>
                <span className="xl:text-[24px] md:text-[16px] max-sm:text-[12px]  max-sm:w-[fit-content] text-center text-orange-400 font-semibold">
                  text
                </span>
              </li>
              <li>
                <span className=" md:text-[12px] max-sm:hidden  text-center text-font-color-third font-normal ">text</span>
              </li>
            </ul>
          </div>
          <div>
            <Avatar size={28} style={{ color: '#6f2f83', backgroundColor: '#eaeaea' }} icon={<UserOutlined />} />
          </div>
        </div>
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider style={siderStyle} width={256} breakpoint="xs">
          <div className="flex flex-col h-[100%] justify-between">
            <div>
              <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={menus} />
            </div>
            <div className="text-center mb-1">
              <span className="text-[10px] text-font-color-third">Copyright © 2023-2024 All rights reserved.</span>
            </div>
          </div>
        </Layout.Sider>
        <Layout.Content style={contentStyle}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
