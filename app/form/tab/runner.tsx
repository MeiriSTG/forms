import { Data } from "../data"
import { Part, WorkSelect } from "../work-select"

type Props = {
  data: Data,
}

export function Runner({ data }: Props) {
  return (
    <div>
      <p>1. 走者として参加しますか。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.runner[0]}
          onChange={(e) => data.runner[1](e.target.checked)}
        ></input>
        走者として参加します。
      </p>

      <hr className="spacer"></hr>

      <p>2. DiscordのGo Live機能を用いてゲームを配信できますか。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.golive[0]}
          onChange={(e) => data.golive[1](e.target.checked)}
        ></input>
        配信できます。
      </p>

      <hr className="spacer"></hr>

      <p>3. 希望する参加レベルを教えてください。</p>
      <div className="ml-1rem">
        <input
          type="radio"
          name="level"
          checked={data.level[0] === 0}
          onChange={() => data.level[1](0)}
        ></input>
        初級
      </div>
      <div className="ml-1rem">
        <input
          type="radio"
          name="level"
          checked={data.level[0] === 1}
          onChange={() => data.level[1](1)}
        ></input>
        中級
      </div>
      <div className="ml-1rem">
        <input
          type="radio"
          name="level"
          checked={data.level[0] === 2}
          onChange={() => data.level[1](2)}
        ></input>
        上級
      </div>

      <hr className="spacer"></hr>

      <p>4.【1CC】出場希望の種目を教えてください。</p>
      <WorkSelect part={Part.OCC} level={data.level[0]} target={data.occ}></WorkSelect>

      <hr className="spacer"></hr>

      <p>5.【1CC+】出場希望の種目を教えてください。</p>
      <WorkSelect part={Part.OCCP} level={data.level[0]} target={data.occp}></WorkSelect>

      <hr className="spacer"></hr>

      <p>6.【NB】出場希望の種目を教えてください。</p>
      <WorkSelect part={Part.NB} level={data.level[0]} target={data.nb}></WorkSelect>

      <hr className="spacer"></hr>

      <p>7.【NB+】出場希望の種目を教えてください。</p>
      <WorkSelect part={Part.NBP} level={data.level[0]} target={data.nbp}></WorkSelect>
    </div>
  )
}
