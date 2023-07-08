import { Base } from 'deta'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const base = Base('stacks')
  if (request.method === 'GET') {
    const stacks = await base.fetch()
    response.status(200).json(stacks.items)
  } else {
    response.status(405).end()
  }
}
