export function DeepClone<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T;
}
