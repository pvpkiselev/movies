function debounce<T extends (...args: any[]) => Promise<void>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function debouncedFunction(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
      await func.apply(this, args);
    }, wait);
  };
}

export { debounce };
