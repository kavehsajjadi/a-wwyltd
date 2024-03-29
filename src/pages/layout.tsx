import * as React from "react"

type LayoutProps = {
  children: React.ReactNode
}

class Layout extends React.Component<LayoutProps, any> {
  render() {
    const { children } = this.props

    return (
      <div className="main">
        <div className="container-fluid">{children}</div>
      </div>
    )
  }
}

export { Layout }
