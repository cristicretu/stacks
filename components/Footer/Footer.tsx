export default function Footer() {
  return (
    <p className='mx-auto my-16 text-center text-quaternary'>
      Hosted on{' '}
      <a
        className='ml-1 text-secondary hover:text-primary group'
        href='https://deta.space/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Deta Space
        <span className='ml-1 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100'>
          ↗
        </span>
      </a>
    </p>
  )
}
