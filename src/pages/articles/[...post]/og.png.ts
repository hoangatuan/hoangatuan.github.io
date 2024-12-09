import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'fs';
import path from 'path';
import type { Post } from "../../../types/post.types";
import { ImageResponse } from '@vercel/og';
import { getStaticPathsBlogPost } from '../../../utils/blog';
import type { InferGetStaticPropsType, GetStaticPaths } from 'astro';

export const prerender = true;
 
interface Props {
  params: { post: string };
  props: { post: Post };
}
 
export async function GET({ props }: Props) {
  const { post } = props;
 
  // using custom font files
//   const DmSansBold = fs.readFileSync(path.resolve('./fonts/DMSans-Bold.ttf'));
//   const DmSansReqular = fs.readFileSync(
//     path.resolve('./fonts/DMSans-Regular.ttf'),
//   );
 
//   // post cover with Image is pretty tricky for dev and build phase
//   const postCover = fs.readFileSync(
//     process.env.NODE_ENV === 'development'
//       ? path.resolve(
//           post.data.cover.src.replace(/\?.*/, '').replace('/@fs', ''),
//         )
//       : path.resolve(post.data.cover.src.replace('/', 'dist/')),
//   );
 
  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      children: [
        // {
        //   type: 'div',
        //   props: {
        //     // using tailwind
        //     tw: 'w-[200px] h-[200px] flex rounded-3xl overflow-hidden',
        //     children: [
        //       {
        //         type: 'img',
        //         props: {
        //           src: postCover.buffer,
        //         },
        //       },
        //     ],
        //   },
        // },
        {
          type: 'div',
          props: {
            tw: 'absolute left-[40px] top-[40px] flex',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-gray-200 text-sm',
                  style: {
                    fontSize: '24px',
                    fontFamily: 'DM Sans Bold',
                  },
                  children: "ericsspace.com",
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-white text-3xl text-center',
                  style: {
                    fontSize: '48px',
                    fontFamily: 'DM Sans Bold',
                  },
                  children: post.title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute right-[40px] bottom-[40px] flex items-center',
            children: [
              // {
              //   type: 'div',
              //   props: {
              //     tw: 'text-blue-600 text-3xl',
              //     style: {
              //       fontFamily: 'DM Sans Bold',
              //     },
              //     children: post.author,
              //   },
              // },
              // {
              //   type: 'div',
              //   props: {
              //     tw: 'px-2 text-3xl',
              //     style: {
              //       fontSize: '30px',
              //     },
              //     children: '|',
              //   },
              // },
              {
                type: 'div',
                props: {
                  tw: 'text-gray-200 text-sm',
                  style: {
                    fontSize: '24px',
                    fontFamily: 'DM Sans Bold',
                  },
                  children: 'Blog',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#EA4D21',
        fontFamily: 'DM Sans Regular',
      },
    },
  };
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
    // fonts: [
    //   {
    //     name: 'DM Sans Bold',
    //     data: DmSansBold.buffer,
    //     style: 'normal',
    //   },
    //   {
    //     name: 'DM Sans Regular',
    //     data: DmSansReqular.buffer,
    //     style: 'normal',
    //   },
    // ],
  });
}
 
export const getStaticPaths = (async () => {
    return await getStaticPathsBlogPost();
}) satisfies GetStaticPaths;
