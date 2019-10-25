import * as React from "react"
import { Command, commands } from "lib/commands"
import { limit } from "lib/limit"
import { match } from "lib/match"
import { extractParams } from "lib/extract_params"
import { useFocused } from "lib/use_focused"
import { useWithRef } from "lib/use_with_ref"
import { EditingQuery, SetState, STATE } from "lib/states"
import { Dropdown, DropdownItem } from "components/dropdown"
import { Input } from "components/input"

export const Editing = ({
  state,
  setState,
}: {
  state: EditingQuery
  setState: SetState
}) => {
  const inputRef = React.useRef<Input>()
  const { commands, query } = state
  const items = useWithRef<Command, DropdownItem>(commands, query)
  const [focused, setFocused] = useFocused([inputRef, ...items], 0)

  return (
    <>
      <Input
        ref={inputRef}
        autoFocus={true}
        value={query}
        placeholder="What would you like to do?"
        onChange={handleQueryUpdate(setState)}
      />
      {commands.length > 0 && (
        <Dropdown items={items} onClick={handleCommandClick(setState)} />
      )}
    </>
  )
}

function handleQueryUpdate(
  setState: SetState,
): (e: React.ChangeEvent<HTMLInputElement>) => void {
  return e => {
    setState({
      type: STATE.EDITING_QUERY,
      query: e.target.value,
      commands: limit(match(e.target.value), 4),
    })
  }
}

function handleCommandClick(setState: SetState): (command: Command) => void {
  return command => {
    setState({
      type: STATE.ADDING_ARGUMENTS,
      command,
      params: extractParams(command[0]),
    })
  }
}
