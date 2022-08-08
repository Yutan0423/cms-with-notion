import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { CardProps } from '../../types/types';
import {
  getCover,
  getDate,
  getMultiselect,
  getText,
} from '../../utils/properties';

export const Card: FC<CardProps> = ({ page }) => {
  const path = getText(page.properties.slug.rich_text);
  return (
    <Link href={`/articles/${path}`}>
      <a className="flex justify-center ">
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-full my-4 md:my-0 content-between grid">
          {/* image */}
          <div>
            {' '}
            <Image
              className="static w-full h-auto"
              src={getCover(page.cover)}
              alt=""
              objectFit="cover"
              width={400}
              height={225}
              quality={30}
            />
          </div>

          {/* title & date*/}
          <div className="px-6 pt-4 ">
            <h2 className="text-base font-medium mb-3 ">
              {getText(page.properties.name.title)}
            </h2>
            <p className="text-gray-700 text-xs">
              {getDate(page.properties.published.date)}
            </p>
          </div>

          {/* tag */}
          <div className="px-6 pb-4 ">
            {getMultiselect(page.properties.tags.multi_select).map(
              (tag, key) => {
                const bgColor = tag.color
                  ? 'bg-' + tag.color + '-200'
                  : 'bg-200-gray';
                return (
                  <span
                    key={key}
                    className={`text-sm px-2 py-1 font-normal ${bgColor} rounded-lg break-words mr-2 mb-2`}
                  >
                    {`#${tag.name}`}
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
