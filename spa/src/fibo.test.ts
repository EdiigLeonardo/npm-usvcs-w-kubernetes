import { fibo } from './fibo';

test('checks fibo 7', () => {
    expect(fibo(7)).toBe(13);
});

test('checks fibo 0', () => {
    expect(fibo(0)).toBe(0);
});

test('checks fibo 3', () => {
    expect(fibo(3)).toBe(2);
});