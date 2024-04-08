import { TSNE } from '@keckelt/tsne'
import { UMAP } from 'umap-js'

export type Point = {
  x: number
  y: number
}

export function reduceDimensions(data: number[][], alg: 'tsne' | 'umap') {
  // https://youtu.be/NEaUSP4YerM
  if (alg === 'tsne') {
    let tsne = new TSNE({
      epsilon: 10, // learning rate (10 = default)
      perplexity: 30, // how many neighbors does each point influence  (30 = default)
      dim: 2, // dimensionality of the embedding (2 = default)
    })
    tsne.initDataRaw(data)
    let iterations = 100

    for (let i = 0; i < iterations; i++) {
      tsne.step()
    }

    return tsne.getSolution()
  }

  // https://youtu.be/eN0wFzBA4Sc
  if (alg === 'umap') {
    let umap = new UMAP()
    return umap.fit(data)
  }

  return []
}

type GridSize = { width: number; height: number }

let defaultGridSize = { width: 10, height: 10 }

export function toGridIndices(
  points: number[][],
  gridSize: GridSize = defaultGridSize,
) {
  // Find the min and max for normalization
  const minX = Math.min(...points.map((point) => point[0]))
  const maxX = Math.max(...points.map((point) => point[0]))
  const minY = Math.min(...points.map((point) => point[1]))
  const maxY = Math.max(...points.map((point) => point[1]))

  // Convert points to grid indices
  return points.map((point) => {
    const normalizedX = (point[0] - minX) / (maxX - minX)
    const normalizedY = (point[1] - minY) / (maxY - minY)
    const gridX = Math.floor(normalizedX * (gridSize.width - 1))
    const gridY = Math.floor(normalizedY * (gridSize.height - 1))

    return [gridX, gridY]
  })
}
