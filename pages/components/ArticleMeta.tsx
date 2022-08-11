import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { ArticleMetaProps } from '../../types/types';
import {
  getCover,
  getDate,
  getMultiSelect,
  getText,
} from '../../utils/properties';

const ArticleMeta: FC<ArticleMetaProps> = ({ page }) => {
  return (
    <div>
      {/* page cover */}
      <Image
        className="w-full max-w-screen-lg rounded-lg aspect-video my-4"
        src={getCover(page.cover)}
        alt={getText(page.properties.name.title)}
        objectFit="cover"
        width={640}
        height={360}
        quality={50}
      />

      {/* page name */}
      <h1 className="my-8">{getText(page.properties.name.title)}</h1>
      <div className="bg-gray-100 px-6 py-4 rounded text-sm text-gray-500">
        <div className="grid grid-cols-3 gap-4">
          {/* published */}
          <div className="col-span-1">Published</div>
          <div className="col-span-2">
            {getDate(page.properties.published.date)}
          </div>

          {/* author */}
          <div className="col-span-1">Author</div>
          <div className="col-span-2">
            {getText(page.properties.author.rich_text)}
          </div>

          {/* tags */}
          <div className="col-span-1">Tags</div>
          <div className="col-span-2">
            {getMultiSelect(page.properties.tags.multi_select).map(
              (tag, key) => (
                <Link key={key} href={`/tags/${tag}`}>
                  <span
                    className="cursor-pointer text-sm px-2 py-1 font-normal bg-purple-200 rounded-lg break-words mr-2 mb-2"
                    key={key}
                  >{`#${tag}`}</span>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMeta;
