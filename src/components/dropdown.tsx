import * as React from "react"
import { Command } from "lib/commands"

export const Dropdown = ({
  items,
  onClick,
}: {
  items: { value: Command; ref: React.RefObject<DropdownItem> }[]
  onClick(c: Command): void
}) => (
  <DropdownList>
    {items.map(({ value, ref }) => (
      <DropdownItem
        key={value[0]}
        onClick={() => onClick(value)}
        label={value[0]}
        ref={ref}
      />
    ))}
  </DropdownList>
)

const DropdownList = ({ children }) => (
  <div
    className="dropdown-menu"
    style={{ display: "block", position: "static" }}
  >
    {children}
  </div>
)

export class DropdownItem extends React.Component<{
  label: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void
}> {
  buttonRef = React.createRef<HTMLButtonElement>()

  focus() {
    if (this.buttonRef.current != null) {
      this.buttonRef.current.focus()
    }
  }

  render() {
    const { label, onClick } = this.props

    return (
      <div className="dropdown-item">
        <button
          ref={this.buttonRef}
          type="button"
          onClick={onClick}
          style={{ background: "none", border: "none" }}
        >
          {label}
        </button>
      </div>
    )
  }
}
