import { Point, reduceDimensions, toGridIndices } from './reduceDimensions'
import {
  Product,
  encodeProduct,
  deserializeChromaColor,
  generateProducts,
} from './randomProducts'
import { formatCurrency } from './formatCurrency'
import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export function loader({ context }: LoaderFunctionArgs) {
  let products = generateProducts()
  let points = reduceDimensions(products.map(encodeProduct), 'umap')

  // Quantize floating point coordinates to integers (put them on a grid)
  let indices = toGridIndices(points)

  // Merge the products and indices
  let cells: CellProps[] = []

  for (let i = 0; i < products.length; i++) {
    let product = products[i]
    let index = indices[i]

    cells.push({
      x: index[0],
      y: index[1],
      ...product,
    })
  }

  return cells
}

type CellProps = Product & Point

function Cell({
  x,
  y,
  color,
  price,
  numFibers,
  metersPer100gPer1Fiber,
  name,
}: CellProps) {
  return (
    <div
      style={{
        gridRow: x,
        gridColumn: y,
        backgroundColor: color.css(),
        padding: 12,
        fontFamily: 'sans-serif',
      }}
      key={`cell-${x}-${y}`}
    >
      <h1 style={{ marginTop: 0 }}>{name}</h1>
      <p>{formatCurrency(price)}</p>
      <p>
        {numFibers} / {metersPer100gPer1Fiber}
      </p>
    </div>
  )
}

export default function AtlasPage() {
  let cells = useLoaderData<typeof loader>()
  return (
    <div style={{ display: 'grid', gap: '5px' }}>
      {cells.map((cell) => {
        let { x, y } = cell
        let color = deserializeChromaColor(cell.color)

        return <Cell key={`cell-${x}-${y}`} {...cell} color={color} />
      })}
    </div>
  )
}
