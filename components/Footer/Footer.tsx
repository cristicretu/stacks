import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

export default function Footer() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='flex flex-row gap-4 items-center mx-auto text-center justify-center my-16'>
      <button
        aria-label='Toggle Dark Mode'
        type='button'
        className='flex items-center justify-center transition-all bg-gray-200 h-fit rounded-lg px-2 py-0.5 dark:bg-gray-600 hover:ring-2 ring-gray-300'
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (
          <>
            {resolvedTheme === 'dark' ? <span>light</span> : <span>dark</span>}
          </>
        )}
      </button>
      <p className='text-center text-quaternary'>
        made with{' '}
        <a
          href='https://deta.space/discovery/@cristicretu/stacks'
          className='ml-1 text-secondary hover:text-primary group'
          target='_blank'
          rel='noreferrer'
        >
          stacks
          <span className='ml-1 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100'>
            ↗
          </span>
        </a>
      </p>
    </div>
  )
}
