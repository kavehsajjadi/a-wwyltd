import * as React from "react"
import { Command } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import {
  AddingArguments as AddingArgumentsState,
  ComponentState,
  Param,
  Params,
  SetState,
  STATE,
} from "lib/states"
import { useWithRef } from "lib/use_with_ref"
import { useFocused } from "lib/use_focused"
import { ArgumentInput } from "components/argument_input"
import { Button } from "components/button"
import { Input } from "components/input"

type AddingArgumentsProps = {
  state: AddingArgumentsState
  setState: SetState
}

export const AddingArguments = ({ state, setState }: AddingArgumentsProps) => {
  const inputRef = React.useRef<Input>()
  const buttonRef = React.useRef<Button>()
  const { type, command, params } = state
  const query = command[0]
  const items = useWithRef<string, ArgumentInput>(Object.keys(params), query)
  const [focused, setFocused] = useFocused([inputRef, ...items, buttonRef], 0)

  return (
    <>
      <div className="form-group">
        <Input
          value={command[0]}
          onChange={handleQueryChange(setState)}
          ref={inputRef}
        />
      </div>
      {items.map((item, index) => {
        const { value, ref } = item
        return (
          <ArgumentInput
            ref={ref}
            key={value}
            value={params[value]}
            label={value}
            onChange={handleArgUpdate(setState, value, command, params)}
            autoFocus={index === 0}
          />
        )
      })}
      <div className="form-group">
        <Button onClick={setExecuting(setState, command, params)} ref={buttonRef}>
          Evaluate
        </Button>
      </div>
    </>
  )
}

function handleArgUpdate(
  setState: SetState,
  key: string,
  command: Command,
  params: Params,
) {
  return e => {
    const p = { ...params, [key]: e.target.value }
    setState({ type: STATE.ADDING_ARGUMENTS, command, params: p })
  }
}

function handleQueryChange(setState: SetState) {
  return e => {
    setState({
      type: STATE.EDITING_QUERY,
      query: e.target.value,
      commands: limit(match(e.target.value), 4),
    })
  }
}

function setExecuting(setState: SetState, command: Command, params: Params) {
  return () => setState({ type: STATE.EXECUTING_COMMAND, command, params })
}
