import { Base } from 'deta'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Connect to a Base for storing todo items.
  const base = Base('name')
  if (request.method === 'GET') {
    const stacks = await base.fetch()
    response.status(200).json(stacks.items)
  } else {
    response.status(405).end()
  }
}
