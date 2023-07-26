import { WORKS } from "@/app/api"
import { Data } from "../data"

type Props = {
  data: Data,
}

export function Commentator({ data }: Props) {
  return (
    <div>
      <p>1. 実況者として参加しますか。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.commentator[0]}
          onChange={(e) => data.commentator[1](e.target.checked)}
        ></input>
        実況者として参加します。
      </p>

      <hr className="spacer"></hr>

      <p>2. 実況を希望する作品を教えてください。</p>
      {data.comm_works.map((work, i) => (
        <div key={i} className="ml-1rem">
          <input
            type="checkbox"
            checked={work[0]}
            onChange={(e) => work[1](e.target.checked)}
          ></input>
          {WORKS[i]}
        </div>
      ))}
    </div>
  )
}
