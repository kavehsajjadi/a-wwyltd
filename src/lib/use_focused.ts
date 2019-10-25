import * as React from "react"

export function useFocused(items, initialValue: number) {
  const [focused, setFocused] = React.useState(initialValue)

  const updateCurrent = (index: number) => {
    setFocused(index)
    focusItem(items, index)
  }

  const keydownHandler = onKeydown({
    handleArrowDown: () => onArrowDown(items, focused, updateCurrent),
    handleArrowUp: () => onArrowUp(items, focused, updateCurrent),
  })

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler)
    return () => {
      document.removeEventListener("keydown", keydownHandler)
    }
  })

  return [focused, updateCurrent]
}

function focusItem(items, currentIndex) {
  const node = items[currentIndex]
  const current = node.ref != null ? node.ref.current : node.current
  current.focus()
}

function onKeydown({ handleArrowDown, handleArrowUp }) {
  return e => {
    switch (e.key) {
      case "ArrowUp":
        handleArrowUp()
        break
      case "ArrowDown":
        handleArrowDown()
        break
      default:
        break
    }
  }
}

function onArrowDown(items, currentIndex, updateCurrent) {
  const min = 0
  const max = items.length - 1
  const shouldUpdate = items.length > min && currentIndex < max
  if (shouldUpdate) {
    updateCurrent(currentIndex + 1)
  }
}

function onArrowUp(items, currentIndex, updateCurrent) {
  const min = 0
  const shouldUpdate = currentIndex > min
  if (shouldUpdate) {
    updateCurrent(currentIndex - 1)
  }
}
