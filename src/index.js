import difference from 'lodash/difference'
import uniq from 'lodash/uniq'
import union from 'lodash/union'
import intersection from 'lodash/intersection'

/**
 * Remove all array items for that node
 */
export const removeOutgoingFromNode = (graph, node) => ({
  ...graph,
  [node]: [],
})

/**
 * Nodes that are on the right side, without repetition
 */
export const getNodesWithIncoming = graph => uniq(Object.keys(graph).reduce((set, node) => {
  const edges = graph[node]
  return [...set, ...edges]
}, []))

/**
 * Get nodes that are not present on the right side
 */
export const getNodesWithNoIncoming = (graph) => {
  const nodes = Object.keys(graph)
  const haveIncoming = getNodesWithIncoming(graph)
  return difference(nodes, haveIncoming)
}
/**
 * Fill the graph with nodes that were not present on the left side (had no outgoing edges)
 * but we know that exist beucase we saw them on the right side (because they had incoming edges)
 */
export const normalize = (graph) => {
  const haveIncoming = getNodesWithIncoming(graph)
  const noOutgoing = difference(haveIncoming, Object.keys(graph))
  const noIncomingGraph = noOutgoing.reduce((g, node) => ({
    ...g,
    [node]: [],
  }), {})
  return {
    ...noIncomingGraph,
    ...graph,
  }
}
/**
 * Actual Algorithm
 */
const _kahnSort = (graph, result, next) => {
  if (next.length === 0) {
    if (Object.keys(graph).every(key => graph[key].length === 0)) {
      return result
    }
    // cyclic
    return null
  }

  const node = next[0]
  const newGraph = removeOutgoingFromNode(graph, node)
  const oldEdges = graph[node]
  const newNext = union(next.slice(1), intersection(getNodesWithNoIncoming(newGraph), oldEdges))
  const newResult = [...result, node]

  return _kahnSort(newGraph, newResult, newNext)
}
/**
 * Public API
 */
export const kahnSort = graph => _kahnSort(normalize(graph), [], getNodesWithNoIncoming(graph))
