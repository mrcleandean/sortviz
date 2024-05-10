import Header from './components/Header';
import { type ChangeEvent, useState } from 'react';
import { bubbleSort, insertionSort, isAlgorithmKey, randomArray, selectionSort } from './util'
import type { AlgorithmKeyType, BasicFnType, ChangeSelectFnType, AlgorithmFnType, AlgorithmHashType } from './types';

export type ChangeInputFnType = (e: ChangeEvent<HTMLInputElement>) => void;
export type AlgorithmsMapType = {
  [key in AlgorithmKeyType]: AlgorithmFnType
}
export type StateType = {
  arraySteps: number[][],
  colorKey: AlgorithmHashType[],
  algorithm: AlgorithmKeyType,
  amount: number,
  delay: number,
  play: boolean,
  currentStep: number,
  interval: null | number
}
const algorithms: AlgorithmsMapType = {
  bubble: bubbleSort,
  insertion: insertionSort,
  selection: selectionSort
}

const SortViz = () => {
  const [state, setState] = useState<StateType>(() => {
    const arr = randomArray(30);
    const { steps, key } = algorithms['selection'](arr)
    return {
      arraySteps: steps,
      colorKey: key,
      algorithm: 'selection',
      amount: 30,
      delay: 40,
      play: false,
      currentStep: 0,
      interval: null
    }
  })

  const reset: BasicFnType = () => {
    const arr = randomArray(state.amount)
    const { steps, key } = algorithms[state.algorithm](arr)
    if (state.interval !== null) clearInterval(state.interval)
    setState({
      ...state,
      arraySteps: steps,
      colorKey: key,
      play: false,
      currentStep: 0,
      interval: null
    })
  }

  const changeAlgorithm: ChangeSelectFnType = (e) => {
    const arr = randomArray(state.amount)
    if (!isAlgorithmKey(e.target.value)) return;
    const { steps, key } = algorithms[e.target.value](arr)
    if (state.interval !== null) clearInterval(state.interval)
    setState({
      ...state,
      arraySteps: steps,
      colorKey: key,
      algorithm: e.target.value,
      play: false,
      currentStep: 0,
      interval: null
    })
  }

  const togglePlay: BasicFnType = () => {
    if (state.play) {
      if (state.interval !== null) clearInterval(state.interval)
      setState({
        ...state,
        play: false,
        interval: null
      })
      return
    }
    if (state.currentStep === state.arraySteps.length - 1) {
      reset()
      return
    }
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.currentStep === prev.arraySteps.length - 1) {
          if (prev.interval !== null) clearInterval(prev.interval)
          return {
            ...prev,
            play: false,
            interval: null
          }
        }
        return {
          ...prev,
          currentStep: prev.currentStep + 1
        }
      })
    }, state.delay)
    setState({
      ...state,
      play: true,
      interval
    })
  }

  const changeAmount: ChangeInputFnType = (e: ChangeEvent<HTMLInputElement>) => {
    const arr = randomArray(Number(e.target.value))
    const { steps, key } = algorithms[state.algorithm](arr)
    if (state.interval !== null) clearInterval(state.interval)
    setState({
      ...state,
      arraySteps: steps,
      colorKey: key,
      amount: Number(e.target.value),
      play: false,
      currentStep: 0,
      interval: null
    })
  }

  const changeDelay: ChangeInputFnType = (e: ChangeEvent<HTMLInputElement>) => {
    const arr = randomArray(state.amount)
    const { steps, key } = algorithms[state.algorithm](arr)
    if (state.interval !== null) clearInterval(state.interval)
    setState({
      ...state,
      arraySteps: steps,
      colorKey: key,
      delay: Number(e.target.value),
      play: false,
      currentStep: 0,
      interval: null
    })
  }

  return (
    <div>
      <Header
        reset={reset}

        changeAlgorithm={changeAlgorithm}
        changeAmount={changeAmount}
        changeDelay={changeDelay}
        togglePlay={togglePlay}

        algorithm={state.algorithm}
        amount={state.amount}
        delay={state.delay}
        play={state.play}
      />
      <div className='w-[100vw] flex justify-center'>
        <div className='max-w-5xl flex justify-center pb-[30px]'>
          {state.arraySteps[state.currentStep].map((height, i) => {
            const heightFactor = (350 * height / state.amount).toFixed(3)
            const widthFactor = (70 / state.amount).toFixed(3)
            const color = state.colorKey[state.currentStep][i]
            return (
              <div
                key={i}
                className='border-[1px] border-black flex justify-center items-end'
                style={{
                  height: `${heightFactor}px`,
                  width: `${widthFactor}vw`,
                  backgroundColor: color ? color : 'white'
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SortViz