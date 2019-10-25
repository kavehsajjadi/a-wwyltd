import { Command } from "lib/commands"

export const enum STATE {
  EDITING_QUERY = 1,
  ADDING_ARGUMENTS = 2,
  EXECUTING_COMMAND = 3,
  EXECUTED_COMMAND = 4,
  ERROR_EXECUTING_COMMAND = 5,
}

export type Param = string
export type Params = { [key: string]: Param }

export type EditingQuery = {
  type: STATE.EDITING_QUERY
  query: string
  commands: Command[]
}

export type AddingArguments = {
  type: STATE.ADDING_ARGUMENTS
  command: Command
  params: Params
}

export type ExecutingCommand = {
  type: STATE.EXECUTING_COMMAND
  command: Command
  params: Params
}

export type ExecutedCommand = {
  type: STATE.EXECUTED_COMMAND
  message?: string
}

export type ErrorExecutingCommand = {
  type: STATE.ERROR_EXECUTING_COMMAND
  message?: string
}

export type ComponentState =
  | EditingQuery
  | AddingArguments
  | ExecutingCommand
  | ExecutedCommand
  | ErrorExecutingCommand

export type SetState = (state: ComponentState) => void
