import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CardProps } from '../types/types';
import {
  getCover,
  getDate,
  getMultiSelect,
  getText,
} from '../utils/properties';

export const Card: FC<CardProps> = ({ page }) => {
  const path = getText(page.properties.slug.rich_text);
  return (
    <Link href={`/articles/${path}`}>
      <a className="flex justify-center ">
        <div className="my-4 grid w-full max-w-sm content-between overflow-hidden rounded shadow-lg md:my-0">
          {/* image */}
          <div>
            {' '}
            <Image
              className="static h-auto w-full"
              src={getCover(page.cover)}
              alt=""
              objectFit="cover"
              width={400}
              height={225}
              quality={30}
            />
          </div>

          {/* title & date*/}
          <div className="px-6 pt-4">
            <h2 className="mb-3 text-base font-medium">
              {getText(page.properties.name.title)}
            </h2>
            <p className="text-xs text-gray-700">
              {getDate(page.properties.published.date)}
            </p>
          </div>

          {/* tag */}
          <div className="px-6 pb-4">
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag, key) => {
                return (
                  <span
                    key={key}
                    className={`mr-2 mb-2 break-words rounded-lg bg-purple-400 px-2 py-1 text-sm font-normal text-white`}
                  >
                    {`#${tag}`}
                  </span>
                );
              },
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
