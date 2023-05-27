export function fibo(index: number): number {
    if (index == 0) return 0;
    if (index == 1) return 1;
    return fibo(index - 1) + fibo(index - 2);
}