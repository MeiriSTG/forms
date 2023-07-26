import { Data } from "../data"

type Props = {
  data: Data,
}

export function Refree({ data }: Props) {
  return (
    <div>
      <p>1. 審判員（副審）として参加しますか。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.refree[0]}
          onChange={(e) => data.refree[1](e.target.checked)}
        ></input>
        審判員（副審）として参加します。
      </p>
    </div>
  )
}
