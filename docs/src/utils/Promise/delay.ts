const delay = <T>(res: T, timeout: number): Promise<T> => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(res);
  }, timeout)
});

export default delay;