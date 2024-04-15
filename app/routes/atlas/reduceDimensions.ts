import { TSNE } from '@keckelt/tsne'
import { UMAP } from 'umap-js'
import { lapJv } from './lap'
import { getSquaredEuclideanDistance } from './distance'

export type Point = {
  x: number
  y: number
}

export function reduceDimensions(
  data: number[][],
  alg: 'tsne' | 'umap',
): number[][] {
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

export function toGridIndexesWithGaps(points: number[][], gridSize: GridSize) {
  let normalizedPoints = normalizeCoordinates(points)

  return normalizedPoints.map((point) => {
    const gridX = Math.floor(point[0] * (gridSize.width - 1))
    const gridY = Math.floor(point[1] * (gridSize.height - 1))

    return [gridX, gridY]
  })
}

export function toGridIndexesNoGaps(points: number[][], gridSize: GridSize) {
  let normalizedData = normalizeCoordinates(points)
  let grid = generateGrid(gridSize)

  let costMatrix = getCostMatrix(
    grid,
    normalizedData,
    getSquaredEuclideanDistance,
  )

  let solution = lapJv(normalizedData.length, costMatrix)

  let gridJv: number[][] = []

  for (let i = 0; i < solution.col.length; i++) {
    gridJv[i] = grid[solution.col[i] + 1]
  }

  return gridJv
}

function normalizeCoordinates(points: number[][]) {
  let minX = points[0][0]
  let maxX = points[0][0]
  let minY = points[0][1]
  let maxY = points[0][1]

  let normalized: number[][] = []

  for (const [x, y] of points) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)

    // Handle division by 0 and normalize
    let normalizedX = maxX === minX ? 0 : (x - minX) / (maxX - minX)
    let normalizedY = maxY === minY ? 0 : (y - minY) / (maxY - minY)

    normalized.push([normalizedX, normalizedY])
  }

  return normalized
}

function getCostMatrix(
  inputPoints: number[][],
  targetPoints: number[][],
  costFunction: (point1: number[], point2: number[]) => number,
): number[][] {
  const costMatrix: number[][] = []

  for (let i = 0; i < inputPoints.length; i++) {
    costMatrix[i] = []
    for (let j = 0; j < targetPoints.length; j++) {
      const cost = costFunction(inputPoints[i], targetPoints[j])
      costMatrix[i][j] = cost
    }
  }

  getArrayDimensions(inputPoints, 'input')
  getArrayDimensions(targetPoints, 'target')
  getArrayDimensions(costMatrix, 'cost')

  return costMatrix
}

export function generateGrid(size: GridSize): number[][] {
  const grid: number[][] = []

  for (let x = 0; x < size.width; x++) {
    for (let y = 0; y < size.height; y++) {
      grid.push([x, y])
    }
  }

  return grid
}

function getArrayDimensions<T>(array: T[], name: string): number[] {
  const dimensions: number[] = []
  let arr: any = array

  while (Array.isArray(arr)) {
    dimensions.push(arr.length)
    arr = arr[0]
  }

  console.log(`${name} dimensions: ${dimensions.join(' x ')}`)

  return dimensions
}
