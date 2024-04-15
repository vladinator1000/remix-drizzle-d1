import {
  Point,
  reduceDimensions,
  toGridIndexesNoGaps,
} from './reduceDimensions'
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
  let products = generateProducts(1000)

  let encodedFeatures = products.map(encodeProduct)
  let points = reduceDimensions(encodedFeatures, 'umap')

  let squareSideLength = Math.ceil(Math.sqrt(products.length))
  let gridSize = {
    width: squareSideLength,
    height: squareSideLength,
  }

  let indexes = toGridIndexesNoGaps(points, gridSize)

  console.log(products.length, indexes.length)

  return getCells(products, indexes)
}

function getCells(products: Product[], points: number[][]) {
  let cells: CellProps[] = []

  for (let i = 0; i < products.length; i++) {
    let product = products[i]
    let point = points[i]

    if (point) {
      cells.push({
        x: point[0],
        y: point[1],
        ...product,
      })
    }
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
