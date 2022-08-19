import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../site.config';
import BreadCrumb from './BreadCrumb';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light relative flex w-screen flex-wrap items-center justify-between bg-gray-900 py-3 text-white hover:text-gray-200">
      <div className="container-fluid flex w-full flex-wrap items-center justify-between px-6">
        <div
          className="bg-grey-light flex w-full rounded-md"
          aria-label="breadcrumb"
        >
          <Link href="/">
            <a className="text-white hover:text-gray-200">{siteConfig.title}</a>
          </Link>
          {/* Breadcrumb */}
          <BreadCrumb />
          <div className="ml-auto flex">
            <Link href="/admin">
              <a className="text-white hover:text-gray-200">管理ツール</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
