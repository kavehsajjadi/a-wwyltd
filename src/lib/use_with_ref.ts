import * as React from "react"

export type ValueWithRef<T, U> = {
  value: T
  ref: React.RefObject<U>
}
export function useWithRef<T, U>(
  arr: T[],
  uniqueValue: any,
): ValueWithRef<T, U>[] {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    setItems(
      arr.map(value => ({
        value,
        ref: React.createRef<U>(),
      })),
    )

    return () => {
      setItems([])
    }
  }, [uniqueValue])

  return items
}
