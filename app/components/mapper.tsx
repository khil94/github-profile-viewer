import { ReactNode } from "react";

interface props<T> {
  targetList: T[] | undefined | null;
  fallback: ReactNode;
  mapFunc: (itme: T, index: number) => ReactNode;
  wrapper?: (children: ReactNode) => ReactNode;
}

export default function Mapper<T>({
  targetList,
  fallback,
  mapFunc,
  wrapper,
}: props<T>) {
  if (!targetList || targetList.length === 0) {
    return <>{fallback}</>;
  }

  const items = targetList.map(mapFunc);
  if (wrapper) {
    return wrapper(items);
  }

  return <>{items}</>;
}
