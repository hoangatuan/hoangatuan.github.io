import { ImageResponse } from '@vercel/og';
 
export async function GET() {
 
  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      children: [
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex items-center justify-center',
            style: {
              flexGrow: 1, // Make this div grow to push the next one to the bottom
            },
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-white text-3xl text-center',
                  style: {
                    fontSize: '72px',
                    fontFamily: 'Artist Font', // Change to your artist font
                  },
                  children: "Eric's Space",
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'pl-10 shrink flex',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-gray-200 text-3xl text-center',
                  style: {
                    fontSize: '24px',
                    fontFamily: 'DM Sans Bold',
                  },
                  children: "A weekly newsletter, book review, and blog about Swift, iOS & Software Development",
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
        flexDirection: 'column', // Ensure flex items are arranged in a column
        padding: '40px', // Add padding to the container
      },
    },
  };
  
  
  
 
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
  });
}