import { CmsSetting } from '@prisma/client';
import axios from 'axios';
import Head from 'next/head';
import React, { FC } from 'react';
import { LayoutProps } from '../types/types';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout: FC<LayoutProps> = ({
  children,
  title = 'Notion Blog',
  userInfo,
}) => {
  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        <Navbar />
        <main className="w-full px-4 pb-12">{children}</main>
        <Footer userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Layout;
