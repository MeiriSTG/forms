import { DATE_ROW } from "@/app/api"
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

      <p>2. 本大会で使用する名前（フリガナ）を教えてください。</p>
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
      <blockquote>
        画面配信用とマイク用とを分けたいなどの理由から複数アカウントが必要な場合は、サーバ加入後、運営に連絡してください。
      </blockquote>
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

      <p>4. クリア実績シートを提出してください。</p>

      <p className="ml-1rem">
        <label className="file">
          <input type="file" onChange={e => data.clearsheet[1](e.target.files?.item(0) ?? null)} />
          ファイルを選択
        </label>
        {data.clearsheet[0]?.name ?? 'ファイル未選択'}
        {data.is_edit[0] ? '(アップロード済み)' : ''}
      </p>

      <hr className="spacer"></hr>

      <p>5. 参加可能な時間帯をすべて教えてください。</p>
      <blockquote>
        19時30分から25時まで。hh:mm-hh:mmで入力。複数区間がある場合は「,」で区切る。参加不可能な日は空欄。
        <br />
        例：19:30-22:00,23:00-25:00
      </blockquote>
      <table className="ml-1rem w-100 fs-0_8rem center">
        <thead></thead>
        <tbody>
          {data.date.map((n, i) => (
            <tr key={i}>
              <td className="plr-0_5rem min">{DATE_ROW[i]}</td>
              <td className="plr-0_5rem">
                <input
                  className="w-100 box"
                  type="text"
                  value={n[0]}
                  onChange={(e) => n[1](e.target.value)}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
