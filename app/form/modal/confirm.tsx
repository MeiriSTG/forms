import { post } from "@/app/api";
import { Dispatch, SetStateAction, useState } from "react";
import { Data, buildData } from "../data";

type Props = {
  data: Data,
}

function send(data: Data, cbs: [boolean, Dispatch<SetStateAction<boolean>>][]) {
  for (const [n, _] of cbs) {
    if (!n) {
      alert('全ての項目にチェックを入れてください')
      return
    }
  }
  post({ type: data.is_edit[0] ? 'edit' : 'add', uid: data.uid[0], body: buildData(data) })
    .then((res) => {
      if (res === 'ok') document.location.assign('/forms/exit?url=https://discord.gg/tEXXCQMCh5')
      else alert('送信に失敗しました。' + res);
    })
}

export function Confirm({ data }: Props) {
  const cbs = new Array(4).fill(0).map(() => useState(false))
  return (
    <>
      {data.state[0] === 2 &&
        <div className="modal-bg">
          <div className="modal">
            <p>【最終確認】</p>
            <p><input type="checkbox" checked={cbs[0][0]} onChange={e => cbs[0][1](e.target.checked)}></input>エントリー完了後のエントリー取消しは受け付けません。</p>
            <p><input type="checkbox" checked={cbs[1][0]} onChange={e => cbs[1][1](e.target.checked)}></input>エントリー完了後でも参加可能日時の変更は受け付けます。ご自身の都合で参加可能日時が変わった場合は、速やかに主催者へ連絡してください。</p>
            <p><input type="checkbox" checked={cbs[2][0]} onChange={e => cbs[2][1](e.target.checked)}></input>エントリー内容によっては希望に添えない場合があります。予めご了承ください。</p>
            <p><input type="checkbox" checked={cbs[3][0]} onChange={e => cbs[3][1](e.target.checked)}></input>送信完了後、運営サーバーへの招待リンクが表示されますので参加してください（<b>外部に公開しないこと</b>）。</p>
            <p className="right-container">
              <button className="submit" onClick={() => data.state[1](1)}>修正</button>
              <button className="submit" onClick={() => send(data, cbs)}>送信</button>
            </p>
          </div>
        </div>}
    </>
  )
}