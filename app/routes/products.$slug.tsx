import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context, params }: LoaderFunctionArgs) {
  if (!params.slug) {
    return
  }

  const product = await context.service.product.getBySlug(params.slug)
  return json(product)
}

export default function Products() {
  const data = useLoaderData<typeof loader>()

  if (!data) {
    return <h1>Not found</h1>
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>{data.name}</h1>
      <p>${data.price}</p>
    </div>
  )
}
