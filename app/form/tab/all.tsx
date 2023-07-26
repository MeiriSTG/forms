import { DATE_COL, DATE_ROW } from "@/app/api"
import { Data } from "../data"

type Props = {
  data: Data,
}

export function All({ data }: Props) {
  return (
    <div>
      <p>1. <a href="https://docs.google.com/document/d/1P4EFx_TZG2nu0eXmlYo4DrR4amvR160WOV2oEf753Mo/edit?usp=sharing">本大会のルール</a>を確認してください。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.accept[0]}
          onChange={(e) => data.accept[1](e.target.checked)}
        ></input>
        確認しました。本大会のルールを遵守します。
      </p>

      <hr className="spacer"></hr>

      <p>2. 名前（フリガナ）を教えてください。</p>
      <p className="ml-1rem">
        <input
          className="w-100"
          type="text"
          placeholder="例：明理（メイリ）"
          value={data.name[0]}
          onChange={(e) => data.name[1](e.target.value)}
        ></input>
      </p>

      <hr className="spacer"></hr>

      <p>3. 連絡用のDiscordアカウントのIDを教えてください。</p>
      <p className="ml-1rem">
        <input
          className="w-100"
          type="text"
          placeholder="例：meiri or めいり#0000"
          value={data.discord[0]}
          onChange={(e) => data.discord[1](e.target.value)}
        ></input>
      </p>

      <hr className="spacer"></hr>

      <p>4. クリア実績シートの作成はお済みですか。</p>
      <p className="ml-1rem">
        <input
          type="checkbox"
          checked={data.clearsheet[0]}
          onChange={(e) => data.clearsheet[1](e.target.checked)}
        ></input>
        クリア実績シートを作成し、ランキングシート登録申請フォームに回答済みです。
      </p>

      <hr className="spacer"></hr>

      <p>5. クリアシート上の名前を教えてください。</p>
      <p className="ml-1rem">
        <input
          className="w-100"
          type="text"
          value={data.csname[0]}
          onChange={(e) => data.csname[1](e.target.value)}
        ></input>
      </p>

      <hr className="spacer"></hr>

      <p>6. 参加可能な時間帯をすべて教えてください。</p>
      <table className="ml-1rem fs-0_8rem center">
        <thead>
          <tr>
            <th className="plr-0_5rem fw-normal"></th>
            {DATE_COL.map((n, i) => (
              <th key={i} className="plr-0_5rem fw-normal">{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.date.map((row, i) => (
            <tr key={i}>
              <td>{DATE_ROW[i]}</td>
              {row.map((col, j) => (
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
    </div>
  )
}
