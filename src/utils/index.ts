// 节流
export function throttle(fn: Function, rateTime: number) {
    let timer: any = null;
    return function <T>(this: T, ...args: T[]) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, rateTime);
        }
    };
}
