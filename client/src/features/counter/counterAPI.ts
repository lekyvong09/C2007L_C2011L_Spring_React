
export function fetchCount(amount = 1) {
    return new Promise<{data: number}>((resolve: any) => {
        /// return data after delay 1 second
        setTimeout(() => resolve({data: amount}), 1000);
    });
}