import { Dispatch, SetStateAction } from "react"
import { WORKS, DIFFS, WORKS_NB, Part, shouldShow, WORKS_OCCP } from "@/app/api"

type Props = {
  part: Part,
  level: number,
  target: [boolean, Dispatch<SetStateAction<boolean>>][][],
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
              {props.part === Part.OCC && WORKS[i]}
              {props.part === Part.OCCP && WORKS_OCCP[i]}
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
