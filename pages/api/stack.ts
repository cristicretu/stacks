import { Base } from 'deta'
import { NextApiRequest, NextApiResponse } from 'next'

export type IStack = {
  name: string
  description: string
  key: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Connect to a Base for storing todo items.
  const base = Base('name')
  if (request.method == 'POST') {
    const { name, description } = await request.body
    const existing = await base.fetch({ name })
    if (existing.items.length > 0) {
      response.status(409).json({ message: 'Stack already exists' })
      return
    }
    const resp = await base.put({ name, description })
    response.status(201).json(resp)
  } else if (request.method === 'PATCH') {
    const { key, name, description } = await request.body

    if (name) {
      await base.update(
        {
          name,
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
