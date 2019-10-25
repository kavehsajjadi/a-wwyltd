import * as React from "react"
import { Input } from "components/input"

type ArgumentInputProps = {
  autoFocus?: boolean
  label: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  value: string
}

export class ArgumentInput extends React.Component<ArgumentInputProps> {
  inputRef = React.createRef<Input>()

  focus() {
    if (this.inputRef.current != null && this.inputRef.current.focus != null) {
      this.inputRef.current.focus()
    }
  }

  render() {
    {
      const { autoFocus, label, onChange, value } = this.props
      return (
        <div key={label}>
          <Input
            ref={this.inputRef}
            autoFocus={autoFocus}
            onChange={onChange}
            placeholder={`Enter a value for ${label}`}
            value={value}
          />
        </div>
      )
    }
  }
}
