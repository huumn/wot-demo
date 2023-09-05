'use client'

import { useEffect, useState } from 'react'
import Graph from './graph'
import { calculateProbabilityOfAtLeastOneEvent, calculateProductOfWeights, findNonCyclicPaths, normalizeEdgeWeights, normalizeProbabilities } from '@/lib/wot'
import { orderPrizesByWeightedVotes } from '@/lib/rank'
import deepEqual from '../lib/deep-equal'

export default function Algo ({ graph, prizes, startPolling, stopPolling, human }) {
  const [step, setStep] = useState(0)
  const [gstep, setGStep] = useState({ graph })

  useEffect(() => {
    if (!gstep.graph || deepEqual(graph, gstep.graph)) return
    setGStep({ graph })
  }, [graph])

  useEffect(() => {
    switch (step) {
      case 0:
        startPolling()
        setGStep({ graph })
        break
      case 1:
        // normalize edge weights
        stopPolling()
        setGStep({ graph: normalizeEdgeWeights(gstep.graph) })
        break
      case 2: {
        // find non-cyclic paths from start vertex
        const { paths, nonCyclicGraph: graph } = findNonCyclicPaths(gstep.graph, human)
        setGStep({ paths, graph })
      }
        break
      case 3: {
        // calculate product of weights for each path
        const productOfWeights = calculateProductOfWeights(gstep.paths, gstep.graph)
        const labels = {}
        for (const [key, probabilities] of productOfWeights.entries()) {
          const probs = probabilities.map(p => p.toFixed(2)).sort().reverse()
          if (probs.length > 2) {
            labels[key] = key + ':' + probs.slice(0, 2).join(',') + '...'
          } else {
            labels[key] = key + ':' + probs.join(',')
          }
        }
        setGStep({ productOfWeights, graph: gstep.graph, labels })
      }
        break
      case 4: {
        // normalize product of weights
        const probOfPaths = calculateProbabilityOfAtLeastOneEvent(gstep.productOfWeights)
        const labels = {}
        for (const [key, trust] of probOfPaths.entries()) {
          labels[key] = key + '=' + trust.toFixed(2)
        }
        setGStep({ probOfPaths, graph: gstep.graph, labels })
      }
        break
      case 5: {
        // calculate trust for each vertex
        const humanWeights = normalizeProbabilities(gstep.probOfPaths)
        const labels = {}
        for (const [key, trust] of humanWeights.entries()) {
          labels[key] = key + '=' + trust.toFixed(2)
        }
        setGStep({ humanWeights, graph: gstep.graph, labels })
      }
        break
      case 6: {
        const orderedPrizes = orderPrizesByWeightedVotes(gstep.humanWeights, prizes)
        setGStep({ orderedPrizes, graph: gstep.graph })
      }
        break
      default:
        break
    }
  }, [step])

  return (
    <div>
      {gstep.orderedPrizes
        ? <PrizeList prizes={gstep.orderedPrizes} />
        : <Graph graph={gstep.graph} labels={gstep.labels} />}
      <AlgoBtn step={step} incStep={() => setStep(step + 1)} resetStep={() => setStep(0)} />
    </div>
  )
}

function PrizeList ({ prizes }) {
  return (
    <>
      <h2 className='text-xl text-center text-slate-500 place-self-center p-2'>
        you won: <span className='text-green-500'>{prizes[0]}</span>!!!!
      </h2>
      <ol className='list-decimal'>
        {prizes.map(prize => (
          <li key={prize}>{prize}</li>
        ))}
      </ol>
    </>
  )
}

function AlgoBtn ({ step, incStep, resetStep }) {
  let text = 'Next Step'
  switch (step) {
    case 0:
      text = 'Normalize Edge Weights'
      break
    case 1:
      text = 'Find Non-Cyclic Paths'
      break
    case 2:
      text = 'Calc Product of Weights for Each Path'
      break
    case 3:
      text = 'Compress Product of Weights'
      break
    case 4:
      text = 'Normalize Product = Trust'
      break
    case 5:
      text = 'Tell the Pretty Girl What She\'s Won'
      break
    case 6:
      text = 'Reset'
      break
    default:
      break
  }

  return (
    <button
      className='absolute bottom-5 right-5 bg-green-500 text-white px-2 py-1'
      onClick={step >= 6 ? resetStep : incStep}
    >{text}
    </button>
  )
}
