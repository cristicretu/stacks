import { useCallback, useEffect, useState } from 'react'

import { KeyedMutator } from 'swr/_internal'

import { IStacks } from 'pages/api/stacks'

function StackItem({
  id,
  title,
  children,
  mutate,
}: {
  id?: string
  title: string
  children?: React.ReactNode
  mutate?: KeyedMutator<IStacks[]>
}) {
  const [updatedTitle, setUpdatedTitle] = useState(title)
  const [updatedDescription, setUpdatedDescription] = useState(children)

  const updateStack = useCallback(
    async (title: string | undefined, description: string | undefined) => {
      await fetch(`/api/stacks/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: id,
          title: title ? updatedTitle : undefined,
          description: description ? updatedDescription : undefined,
        }),
      })
    },
    [id, updatedDescription, updatedTitle]
  )

  useEffect(() => {
    updateStack(updatedTitle, undefined)
  }, [updateStack, updatedTitle])

  useEffect(() => {
    updateStack(undefined, updatedDescription as string)
  }, [updateStack, updatedDescription])

  return (
    <span
      className='block items-center gap-4 group hover:bg-gray-500/10 rounded-sm px-1 transition-all duration-200'
      key={id}
    >
      <button
        className='absolute group-hover:visible invisible bg-gray-500/20 rounded-full px-1 text-xs -ml-2 -mt-2'
        onClick={async () => {
          await fetch(`/api/stacks/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: id,
            }),
          })
          if (mutate) {
            mutate()
          }
        }}
      >
        x
      </button>
      <input
        type='text'
        value={updatedTitle}
        onChange={e => {
          const newTitle = e.target.value
          setUpdatedTitle(newTitle)
        }}
        className='text-secondary bg-transparent border-none focus:border-transparen focus:ring-0 focus:outline-none'
      ></input>
      <input
        type='text'
        value={updatedDescription as string}
        onChange={e => {
          const newDescription = e.target.value
          setUpdatedDescription(newDescription)
        }}
        className='text-secondary hover:text-primary text-quaternary bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 w-full transition-all duration-200'
      ></input>
    </span>
  )
}

export default StackItem
