/**
 * util func for performance measuring needs
 * @param {*} fn
 * @returns
 */
export function stopwatch(fn) {
  return async (...args) => {
    const before = performance.now();
    const result = await fn.apply(this, args);
    const after = performance.now();
    console.log(`finished: ${after - before}`);
    return result;
  };
}
