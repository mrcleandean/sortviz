export type RandomArrayFnType = (amount: number) => number[];

const randomArray: RandomArrayFnType = (amount) => {
    let arr = [];
    for (let i = 1; i <= amount; i++) {
        arr.push(i)
    }
    let currentIndex = arr.length, randomIndex = 0
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--
        const temp: number = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}

export default randomArray