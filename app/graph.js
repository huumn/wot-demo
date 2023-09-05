'use client'

import React, { useEffect } from 'react'
import '@react-sigma/core/lib/react-sigma.min.css'
import { MultiDirectedGraph } from 'graphology'
import { SigmaContainer, useLoadGraph } from '@react-sigma/core'
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2'

export default function Graph ({ graph, labels }) {
  return (
    <SigmaContainer
      renderer='canvas'
      style={{ width: '100vw', height: '100%', borderTop: '1px solid grey' }} settings={{
        renderEdgeLabels: true,
        defaultEdgeType: 'arrow',
        edgeLabelSize: 15,
        labelSize: 20
      }}
    >
      <MyGraph graph={graph} labels={labels} />
      <FA2Layout graph={graph} labels={labels} />
    </SigmaContainer>
  )
}

function FA2Layout ({ graph, labels }) {
  const { start, stop, isRunning } = useWorkerLayoutForceAtlas2({ settings: { slowDown: 10 } })

  useEffect(() => {
    // start FA2
    !isRunning && start()
    setTimeout(stop, 500)
    return stop
  }, [start, stop, graph, labels])

  return null
}

function MyGraph ({ graph: myGraph, labels }) {
  const loadGraph = useLoadGraph()

  useEffect(() => {
    if (myGraph) {
      // Create the graph
      const graph = new MultiDirectedGraph()
      const addedVertices = {} // To track added vertices

      // Build the graph from the edgeWeights representation
      for (const sourceVertex in myGraph) {
        if (Object.hasOwnProperty.call(myGraph, sourceVertex)) {
          if (!addedVertices[sourceVertex]) {
            // Add source vertex if not added before
            graph.addNode(sourceVertex, { label: labels?.[sourceVertex] || sourceVertex, x: 0 + Object.keys(addedVertices).length, y: 0, size: 10 })
            addedVertices[sourceVertex] = true
          }

          for (const targetVertex in myGraph[sourceVertex]) {
            if (Object.hasOwnProperty.call(myGraph[sourceVertex], targetVertex)) {
              if (!addedVertices[targetVertex]) {
                // Add target vertex if not added before
                graph.addNode(targetVertex, { label: labels?.[targetVertex] || targetVertex, x: 1 + Object.keys(addedVertices).length, y: 1, size: 10 })
                addedVertices[targetVertex] = true
              }

              let weight = myGraph[sourceVertex][targetVertex]
              weight = Number.isInteger(weight) ? weight : Number.parseFloat(weight).toFixed(2)
              graph.addEdge(sourceVertex, targetVertex, { label: weight, size: 3 })
            }
          }
        }
      }

      // Load the graph into SigmaContainer
      loadGraph(graph)
    }
  }, [myGraph, labels, loadGraph])

  return null
}
