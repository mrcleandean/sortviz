import { AlgorithmKeyType } from '../types';

const isAlgorithmKey = (key: string): key is AlgorithmKeyType => {
    return ['bubble', 'insertion', 'selection'].includes(key);
}

export default isAlgorithmKey;