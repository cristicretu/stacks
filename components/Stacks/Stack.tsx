import { useCallback, useEffect, useState } from 'react'

import useSWR from 'swr'

import { IStacks } from 'pages/api/stacks'

import StackItem from './StackItem'

export default function Stack() {
  const { data, error, mutate } = useSWR<IStacks[]>('/api/stacks', key =>
    fetch(key).then(res => res.json())
  )

  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [titleFocused, setTitleFocused] = useState(false)
  const [descriptionFocused, setDescriptionFocused] = useState(false)

  const createStack = useCallback(
    async (title = 'title', description = 'description') => {
      await fetch('/api/stacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
      mutate()
      setNewDescription('')
      setNewTitle('')
      // if (titleRef.current) {
      //   titleRef.current.blur()
      // }
      // if (descriptionRef.current) {
      //   descriptionRef.current.blur()
      // }
    },
    [mutate, setNewDescription, setNewTitle]
  )

  useEffect(() => {
    if (
      newTitle &&
      newDescription &&
      titleFocused === false &&
      descriptionFocused === false
    ) {
      createStack(newTitle, newDescription)
    }
  }, [newTitle, newDescription, createStack, titleFocused, descriptionFocused])

  if (error) {
    return <div>Failed to load stacks</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      {data.map(stack => (
        <StackItem
          title={stack.title}
          id={stack.key}
          key={stack.key}
          mutate={mutate}
        >
          {stack.description}
        </StackItem>
      ))}
      <span className='block items-center gap-4' key='hello-world'>
        <input
          type='text'
          value={newTitle}
          placeholder='title'
          onChange={e => {
            const newTitle = e.target.value
            setNewTitle(newTitle)
          }}
          className='text-secondary bg-transparent border-none focus:border-transparen focus:ring-0 focus:outline-none'
          onFocus={() => {
            setTitleFocused(true)
          }}
          onBlur={() => {
            setTitleFocused(false)
          }}
        ></input>
        <input
          type='text'
          value={newDescription}
          placeholder='description'
          onChange={e => {
            const newDescription = e.target.value
            setNewDescription(newDescription)
          }}
          className='text-secondary hover:text-primary text-quaternary bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 w-full transition-all duration-200'
          onFocus={() => {
            setDescriptionFocused(true)
          }}
          onBlur={() => {
            setDescriptionFocused(false)
          }}
        ></input>
      </span>
    </>
  )
}
