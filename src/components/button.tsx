import * as React from "react"

export class Button extends React.Component<{
  autoFocus?: boolean
  children: React.ReactNode
  onClick(e: React.MouseEvent<HTMLButtonElement>)
}> {
  buttonRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    if (this.props.autoFocus && this.buttonRef.current) {
      this.buttonRef.current.focus()
    }
  }

  focus() {
    if (this.buttonRef != null) {
      this.buttonRef.current.focus()
    }
  }

  render() {
    const { children, onClick } = this.props
    return (
      <button
        ref={this.buttonRef}
        className="btn btn-primary"
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}
