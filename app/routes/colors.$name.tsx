import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { sql } from 'drizzle-orm'

export async function loader({ context, params }: LoaderFunctionArgs) {
  if (!params.name) {
    return
  }

  const query = sql`SELECT * FROM colors WHERE name = ${params.name}`

  const color = await context.db.run(query)

  return json(color.results)
}

export default function Manufacturers() {
  const result = useLoaderData<typeof loader>()

  return <h1>Colors {JSON.stringify(result)}</h1>
}
