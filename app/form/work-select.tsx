import { Dispatch, SetStateAction } from "react"
import { WORKS, DIFFS, WORKS_NB } from "@/app/api"

export enum Part {
  OCC,
  OCCP,
  NB,
}

type Props = {
  part: Part,
  level: number,
  target: [boolean, Dispatch<SetStateAction<boolean>>][][],
}

const SHOULD_SHOW_OCC: { [index: number]: number[] } = {
  0: [0, 1, 4, 5],
  1: [2, 3, 4, 5],
  2: [3],
}

const SHOULD_SHOW_OCCP: { [index: number]: number[] } = {
  0: [],
  1: [1, 2],
  2: [2, 3],
}

const SHOULD_SHOW_NB: { [index: number]: number[] } = {
  0: [],
  1: [1, 2, 3],
  2: [1, 2, 3],
}

function shouldShow(part: Part, level: number, diff: number, work: number): boolean {
  if (diff === 5 && work !== 1)
    return false
  switch (part) {
    case Part.OCC:
      return SHOULD_SHOW_OCC[level].includes(diff)
    case Part.OCCP:
      return SHOULD_SHOW_OCCP[level].includes(diff)
    case Part.NB:
      return SHOULD_SHOW_NB[level].includes(diff)
    default:
      return false
  }
}

export function WorkSelect(props: Props) {
  if (props.level === 0 && props.part !== Part.OCC) {
    return (
      <p className="ml-1rem">出場できません。</p>
    )
  }
  return (
    <table className="ml-1rem center">
      <thead>
        <tr>
          <th className="plr-0_5rem fw-normal"></th>
          {props.target[0].map((_, i) => (
            shouldShow(props.part, props.level, i, 1) &&
            <th key={i} className="plr-0_5rem fw-normal">{DIFFS[i]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.target.map((row, i) => (
          <tr key={i}>
            <td className="left">
              {props.part !== Part.NB && WORKS[i]}
              {props.part === Part.NB && WORKS_NB[i]}
            </td>
            {row.map((col, j) => (
              shouldShow(props.part, props.level, j, i) &&
              <td key={j}>
                <input
                  type="checkbox"
                  checked={col[0]}
                  onChange={(e) => col[1](e.target.checked)}
                ></input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
