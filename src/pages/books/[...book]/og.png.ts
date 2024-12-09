import type { Book } from "../../../types/books.types";
import { ImageResponse } from '@vercel/og';
import { getStaticPathsBook } from '../../../utils/book';
import type { InferGetStaticPropsType, GetStaticPaths } from 'astro';
 
interface Props {
  params: { book: string };
  props: { book: Book };
}
  
export const prerender = true;
 
export async function GET({ props }: Props) {
  const { book } = props;
 
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
            tw: 'pl-10 shrink flex',
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '48px',
                    fontFamily: 'DM Sans Bold',
                  },
                  children: book.title,
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
              {
                type: 'div',
                props: {
                  tw: 'text-blue-600 text-3xl',
                  style: {
                    fontFamily: 'DM Sans Bold',
                  },
                  children: 'Eric',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'px-2 text-3xl',
                  style: {
                    fontSize: '30px',
                  },
                  children: '|',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-3xl',
                  children: 'Book Review',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#f7f8e8',
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
    return await getStaticPathsBook();
}) satisfies GetStaticPaths;
