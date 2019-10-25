import * as React from "react"
import { commands } from "lib/commands"
import { ComponentState, STATE } from "lib/states"
import { CommandInput } from "components/command_input"

export const Home = () => {
  return (
    <div>
      <div style={{ width: "350px" }}>
        <div className="card">
          <div className="card-body">
            <CommandInput />
          </div>
        </div>
      </div>
      {/*<>
        <Card>
          <Title>Editing</Title>
          <CommandInput initialState={states.editing} />
        </Card>
        <Card>
          <Title>Adding Arguments</Title>
          <CommandInput initialState={states.addingArguments} />
        </Card>
        <Card>
          <Title>Executing Command</Title>
          <CommandInput initialState={states.executingCommand} />
        </Card>
        <Card>
          <Title>Executed Command</Title>
          <CommandInput initialState={states.executedCommand} />
        </Card>
        <Card>
          <Title>Error Executing Command</Title>
          <CommandInput initialState={states.errorExecutingCommand} />
        </Card>
      </>
      )*/}
    </div>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">
    <div className="card-body">{children}</div>
  </div>
)

const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="card-title">{children}</div>
)

const states: { [key: string]: ComponentState } = {
  editing: {
    type: STATE.EDITING_QUERY,
    query: "",
    commands: [],
  },
  addingArguments: {
    type: STATE.ADDING_ARGUMENTS,
    command: commands[0],
    params: { password: "", user: "" },
  },
  executingCommand: {
    type: STATE.EXECUTING_COMMAND,
    command: commands[0],
    params: { password: "password", user: "user" },
  },
  executedCommand: {
    type: STATE.EXECUTED_COMMAND,
    message: "successful execution",
  },
  errorExecutingCommand: {
    type: STATE.ERROR_EXECUTING_COMMAND,
    message: "error executing",
  },
}
