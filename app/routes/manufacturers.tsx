import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderFunctionArgs) {
  const manufacturers = await context.db.query.manufacturers.findMany()
  return json({
    manufacturers,
  })
}

export default function Manufacturers() {
  const result = useLoaderData<typeof loader>()

  return <h1>Manufacturers {JSON.stringify(result.manufacturers)}</h1>
}
