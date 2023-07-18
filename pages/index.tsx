import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Comp } from 'components/Comp'
import Container from 'components/Container'
import Stack from 'components/Stacks/Stack'
import { isLink, shortenLink } from 'lib/link'

import { IStack } from './api/stack'

export default function Home() {
  return (
    <Container>
      <div className='flex flex-col gap-16 font-mono'>
        <Header />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Stack editable={false} />
        </div>
      </div>
    </Container>
  )
}

function Header() {
  const { data, error } = useSWR<IStack[]>('/api/stack_public', key =>
    fetch(key).then(res => res.json())
  )
  const router = useRouter()
  // const [ran, setRan] = useState(false)

  // async function createStack(
  //   name = 'john doe',
  //   description = 'enthusiast coder'
  // ) {
  //   if (ran) return
  //   setRan(true)
  //   await fetch('/api/stack', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name,
  //       description,
  //     }),
  //   })
  //   mutate()
  // }

  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  if (data[0] === undefined) {
    // createStack()
    // switch to url /edit
    router.push('/edit')

    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-row items-center gap-4'>
      {/* <div className='relative h-12 w-12'>
        <Image
          alt='Logo'
          className='rounded-full'
          layout='fill'
          objectFit='contain'
          src='/static/images/logo.png'
        />
        <div className='absolute -bottom-2 -right-2 rounded-full bg-white px-1 py-0.5 text-sm dark:bg-gray-900'>
          ✨
        </div>
      </div> */}
      <div className='flex flex-col'>
        <HeaderItem title={data[0].name} id={data[0].key}>
          {data[0].description}
        </HeaderItem>
      </div>
    </div>
  )
}

function HeaderItem({
  title,
  children,
}: {
  id?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <span className='flex flex-col'>
      <input
        type='text'
        value={title}
        disabled
        className='text-secondary bg-transparent border-none focus:border-transparen focus:ring-0 focus:outline-none'
      ></input>
      <Comp
        as={isLink(children as string) ? 'a' : 'p'}
        value={children as string}
        placeholder='description'
        href={
          // if it starts with http:// or https://
          /^(http|https):\/\/[^ "]+$/.test(children as string)
            ? (children as string)
            : `https://${children as string}`
        }
        className={`text-secondary ${
          isLink(children as string) ? 'cursor-pointer' : 'cursor-auto'
        } hover:text-primary text-quaternary bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 w-full transition-all duration-200`}
        rel='noreferrer noopener'
        target='_blank'
      >
        <span>{shortenLink(children as string)}</span>
      </Comp>
    </span>
  )
}
