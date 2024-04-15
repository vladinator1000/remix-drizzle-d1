export function getSquaredEuclideanDistance(
  point1: number[],
  point2: number[],
): number {
  const [x1, y1] = point1
  const [x2, y2] = point2
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
}

export function getManhattanDistance(
  point1: number[],
  point2: number[],
): number {
  const [x1, y1] = point1
  const [x2, y2] = point2
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}
