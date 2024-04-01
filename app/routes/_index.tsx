import { type MetaFunction } from '@remix-run/cloudflare'

export const meta: MetaFunction = () => {
  return [
    { title: "Vlady's shop" },
    {
      name: 'The finest foods in the land',
    },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Vlady's shop</h1>
      <a href="/products">See products</a>
    </div>
  )
}
