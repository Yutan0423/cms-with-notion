import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../../site.config';
import BreadCrumb from './BreadCrumb';

export const Navbar = () => {
  return (
    <nav className="relative w-screen flex flex-wrap items-center justify-between py-3 bg-gray-900 text-white hover:text-gray-200 navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div
          className="bg-grey-light rounded-md w-full"
          aria-label="breadcrumb"
        >
          <Link href="/">
            <a className="text-white hover:text-gray-200">{siteConfig.title}</a>
          </Link>
          {/* Breadcrumb */}
          <BreadCrumb />
        </div>
      </div>
    </nav>
  );
};
