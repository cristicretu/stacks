import React, { useEffect, useState } from 'react'

// import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useTheme } from 'next-themes'
// import useSWR from 'swr'

import Footer from 'components/Footer/Footer'
import cn from 'lib/classNames'
// import { IStack } from 'pages/api/stack'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const [mounted, setMounted] = useState<boolean>(false)
  const { resolvedTheme, setTheme } = useTheme()
  // const { data } = useSWR<IStack[]>('/api/stack_public', key =>
  //   fetch(key).then(res => res.json())
  // )

  const { children, ...customMeta } = props
  // const router = useRouter()

  const meta = {
    title: 'space user',
    description: 'join deta space',
    type: 'website',
    ...customMeta,
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // if (data && data[0] === undefined) {
  //   // createStack()
  //   // switch to url /edit
  //   router.push('/edit')

  //   return <div>Loading...</div>
  // }

  return (
    <>
      <div
        className={cn(
          'text-primary',
          'relative h-full min-h-screen w-full',
          'flex flex-col',
          'motion-reduce:transition-none motion-reduce:transform-none'
        )}
      >
        <Head>
          <meta name='robots' content='follow, index' />
          <meta property='og:type' content={meta.type} />
          <meta property='og:site_name' content={meta.name} />
          <meta property='og:description' content={meta.description} />
          <meta property='og:title' content={meta.title} />
          <meta property='og:image' content={meta.image} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content={meta.title} />
          <meta name='twitter:description' content={meta.description} />
          <meta name='twitter:image' content={meta.image} />
          {meta.date && (
            <meta property='article:published_time' content={meta.date} />
          )}
        </Head>

        <main
          className={cn(
            'px-4 mt-12',
            'max-w-xl w-full',
            'mx-auto my-auto',
            'flex flex-col justify-center gap-12',
            'rounded-lg'
          )}
        >
          <div className='flex flex-row items-center gap-4'>
            <a
              href='https://deta.space/discovery/@cristicretu/stacks'
              className='transition-all cursor-pointer hover:text-primary'
              target='_blank'
              rel='noreferrer'
            >
              stacks
            </a>

            <button
              aria-label='Toggle Dark Mode'
              type='button'
              className='flex items-center justify-center transition-all bg-gray-200 rounded-lg px-2 py-0.5 dark:bg-gray-600 hover:ring-2 ring-gray-300'
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
            >
              {mounted && (
                <>
                  {resolvedTheme === 'dark' ? (
                    <span>light</span>
                  ) : (
                    <span>dark</span>
                  )}
                </>
              )}
            </button>
          </div>
          <div>{children}</div>
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    </>
  )
}
