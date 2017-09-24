import { normalize, kahnSort, getNodesWithNoIncoming } from './'

const graph = {
  7: ['11', '8'],
  5: ['11'],
  3: ['8', '10'],
  11: ['2', '9'],
  8: ['9'],
}
//  2 3 5 7 8 9 10 11
//  2       8 9 10 11       <-- have incoming
//    3 5 7                 <-- no incoming
const normalizedGraph = {
  2: [],
  3: ['8', '10'],
  5: ['11'],
  7: ['11', '8'],
  8: ['9'],
  9: [],
  10: [],
  11: ['2', '9'],
}

describe('getNodesWithNoIncoming', () => {
  it('works', () => {
    expect(getNodesWithNoIncoming(normalizedGraph)).toEqual(['3', '5', '7'])
  })
})

describe('kahnSort', () => {
  it('works', () => {
    expect(kahnSort(graph)).toEqual(['3', '5', '7', '10', '8', '11', '2', '9'])
  })
})

describe('normalize', () => {
  it('works', () => {
    expect(normalize(graph)).toEqual(normalizedGraph)
  })
})
