import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderFunctionArgs) {
  const products = await context.service.product.getAll()
  return json(products)
}

function getProductLink(slug: string) {
  return '/products/' + slug
}

export default function Products() {
  const data = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Products</h1>
      <ul>
        {data.map((product) => (
          <li key={product.slug}>
            <a href={getProductLink(product.slug)}>
              {product.name}: ${product.price}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
