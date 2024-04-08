import chroma, { Color } from 'chroma-js'

export function randomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export type Product = ReturnType<typeof generateProducts>[0]

export function generateProducts(amount = 100) {
  let products = []

  for (let i = 0; i < amount; i++) {
    let item = {
      name: getLetter(i),
      color: chroma.random().set('hsl.l', 0.7).set('hsl.s', 0.6), // Constant lightness and saturation to make text legible
      price: Math.random() * 10,
      numFibers: randomInt(2) + 1,
      metersPer100gPer1Fiber: randomInt(40) + 1,
    }

    products.push(item)
  }

  return products
}

export function deserializeChromaColor(color: any): Color {
  let [r, g, b] = color._rgb

  return chroma(r, g, b)
}

export function encodeProduct(product: Product): number[] {
  return [
    ...product.color._rgb._unclipped,
    product.price,
    product.numFibers,
    product.metersPer100gPer1Fiber,
  ]
}

function getLetter(i: number) {
  return String.fromCharCode(97 + (i % 26))
}
