// sum.test.js
import { describe, expect, test } from 'vitest'
import { generateGrid } from './reduceDimensions'

describe('generateGridPoints', () => {
  test('with side 2', () => {
    let res = generateGrid({ width: 2, height: 2 })

    expect(res).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ])
  })

  // test multiple sides
  test('with side 3', () => {
    let res = generateGrid({ width: 3, height: 3 })

    expect(res).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ])
  })
  test('with side 4', () => {
    let res = generateGrid({ width: 4, height: 4 })

    expect(res).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ])
  })
})
