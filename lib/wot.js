/*
Example graph representation
const edgeWeights = {
  A: { B: 0.1, C: 0.2 },
  B: { A: 0.3, C: 0.4, D: 0.5 },
  C: { A: 0.6, B: 0.7, D: 0.8 },
  D: { B: 0.9, C: 0.2 }
};
*/

export function normalizeEdgeWeights (edgeWeights) {
  const normalizedEdgeWeights = {}

  // Iterate through each vertex in the edgeWeights graph
  for (const sourceVertex in edgeWeights) {
    if (Object.hasOwnProperty.call(edgeWeights, sourceVertex)) {
      const outgoingEdges = edgeWeights[sourceVertex]
      const sumWeights = Object.values(outgoingEdges).reduce((acc, weight) => acc + weight, 0)

      // Normalize the edge weights for this vertex
      const normalizedEdges = {}
      for (const targetVertex in outgoingEdges) {
        if (Object.hasOwnProperty.call(outgoingEdges, targetVertex)) {
          normalizedEdges[targetVertex] = outgoingEdges[targetVertex] / sumWeights
        }
      }

      // Add the normalized edges to the new graph representation
      normalizedEdgeWeights[sourceVertex] = normalizedEdges
    }
  }

  return normalizedEdgeWeights
}

export function findNonCyclicPaths (edgeWeights, startVertex) {
  const visited = {}
  const paths = []
  const nonCyclicGraph = {} // Initialize the non-cyclic graph

  function dfs (currentVertex, path) {
    visited[currentVertex] = true
    path.push(currentVertex)

    for (const neighbor in edgeWeights[currentVertex]) {
      if (!visited[neighbor] && edgeWeights[currentVertex][neighbor] > 0) {
        // Add the edge to the non-cyclic graph
        if (!nonCyclicGraph[currentVertex]) {
          nonCyclicGraph[currentVertex] = {}
        }
        nonCyclicGraph[currentVertex][neighbor] = edgeWeights[currentVertex][neighbor]

        dfs(neighbor, path.slice())
      }
    }

    if (path.length > 1 && currentVertex !== startVertex) {
      paths.push(path.slice())
    }

    visited[currentVertex] = false
  }

  dfs(startVertex, [])

  // Add leaf nodes on the paths to the non-cyclic graph
  for (const path of paths) {
    const leafNode = path[path.length - 1]
    if (!nonCyclicGraph[leafNode]) {
      nonCyclicGraph[leafNode] = {}
    }
  }

  return { paths, nonCyclicGraph }
}

export function calculateProductOfWeights (paths, edgeWeights) {
  const productOfWeights = new Map()

  for (const path of paths) {
    const endVertex = path[path.length - 1]
    let weightProduct = 1.0

    for (let i = 0; i < path.length - 1; i++) {
      const currentVertex = path[i]
      const nextVertex = path[i + 1]
      const edgeWeight = edgeWeights[currentVertex][nextVertex]
      weightProduct *= edgeWeight
    }

    if (!productOfWeights.has(endVertex)) {
      productOfWeights.set(endVertex, [weightProduct])
    } else {
      productOfWeights.get(endVertex).push(weightProduct)
    }
  }

  return productOfWeights
}

export function calculateProbabilityOfAtLeastOneEvent (productOfWeights) {
  const probabilityOfAtLeastOneEvent = new Map()

  for (const [key, probabilities] of productOfWeights.entries()) {
    let probabilityNoneOccurs = 1.0

    for (const probability of probabilities) {
      probabilityNoneOccurs *= 1 - probability
    }

    const probabilityAtLeastOneOccurs = 1 - probabilityNoneOccurs
    probabilityOfAtLeastOneEvent.set(key, probabilityAtLeastOneOccurs)
  }

  return probabilityOfAtLeastOneEvent
}

export function normalizeProbabilities (probabilityMap) {
  const normalizedMap = new Map()

  // Calculate the sum of probabilities
  let sumOfProbabilities = 0
  for (const probability of probabilityMap.values()) {
    sumOfProbabilities += probability
  }

  // Normalize each probability by dividing by the sum
  for (const [key, probability] of probabilityMap.entries()) {
    const normalizedProbability = probability / sumOfProbabilities
    normalizedMap.set(key, normalizedProbability)
  }

  return normalizedMap
}
