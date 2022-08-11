import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BreadCrumb = () => {
  const router = useRouter();
  let joinedPath = '';
  return (
    <>
      {router.asPath.split('/').map((path, key) => {
        if (path) {
          joinedPath += path + '/';
          return (
            <Link key={key} href={`/${joinedPath}`}>
              <a className="text-gray-500 hover:text-gray-600">
                <span className="text-gray-500 mx-2">/</span>
                {path}
              </a>
            </Link>
          );
        }
      })}
    </>
  );
};

export default BreadCrumb;
