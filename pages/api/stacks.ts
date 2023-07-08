import { Base } from 'deta'
import { NextApiRequest, NextApiResponse } from 'next'

export type IStacks = {
  title: string
  description: string
  key: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Connect to a Base for storing todo items.
  const base = Base('stacks')
  if (request.method === 'POST') {
    // Get the item from the request body.
    const item = await request.body
    // Put the item into the Base.
    const resp = await base.put(item)
    // Return the response as JSON.
    response.status(201).json(resp)
  } else if (request.method === 'DELETE') {
    // Get the key from the request body.
    const { key } = await request.body
    // Delete the item from the Base.
    const resp = await base.delete(key)
    // Return the response as JSON.
    response.status(200).json(resp)
  } else if (request.method === 'PATCH') {
    const { key, title, description } = await request.body

    if (title) {
      await base.update(
        {
          title,
        },
        key
      )
    }
    if (description) {
      await base.update(
        {
          description,
        },
        key
      )
    }
    // const resp = await base.update(key, item)
    // Return the response as JSON.
    response.status(200).json({ key })
  } else {
    response.status(405).end()
  }
}
