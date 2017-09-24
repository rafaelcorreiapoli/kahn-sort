### Kahn Sort
Kahn algorithm implemented in functional programming style.
Its purpose is to generate a topological sort of a directed graph

The graph **must** be represented as a map, where the keys are the nodes and the value is an array of outgoing edges

```js
const graph = {
  7: ['11', '8'],
  5: ['11'],
  3: ['8', '10'],
  11: ['2', '9'],
  8: ['9'],
}
```
If this was a graph of software dependencies, it would mean that `7` is a dependency for `11` and `8`


To use Kahn' algorithm on this graph, just call:
```js
import kahnSort from 'kahn-sort'
const topologicalSortedNodes = kahnSort(graph)
```
and it should give you this array:

```js
['3', '5', '7', '10', '8', '11', '2', '9']
```

So, back in our example of software dependency, we would have to install our libs in this order so all the dependencies would be resolved correctly
Note that 3 (5 and 7 too) has no incoming edges, so it has no dependencies... and that is why it appears first on the array
