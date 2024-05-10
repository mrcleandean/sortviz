import type { ChangeEvent } from "react";
export type AlgorithmHashType = {
    [key: number]: 'red' | 'gray' | 'green' | 'lightgreen'
}
export type AlgorithmFnType = (arr: number[]) => ({
    steps: number[][],
    key: AlgorithmHashType[]
})
export type AlgorithmKeyType = 'bubble' | 'insertion' | 'selection'; // | 'merge' | 'quick' |
export type ChangeSelectFnType = (e: ChangeEvent<HTMLSelectElement>) => void;
export type BasicFnType = () => void;