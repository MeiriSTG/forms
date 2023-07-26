"use client";

import { post } from '@/app/api';
import { Tabs } from './Tabs'
import { NewComer } from './modal/new';
import { Data, initData, buildData } from './data';

function send(data: Data) {
  if (data.uid[0].trim().length === 0) {
    alert('Unexpected Error: UserIDを入力してください')
    return
  }
  if (data.password[0].trim().length === 0) {
    alert('Unexpected Error: パスワードを入力してください')
    return
  }
  if (data.name[0].trim().length === 0) {
    alert('名前を入力してください')
    return
  }
  if (data.discord[0].trim().length === 0) {
    alert('Discord IDを入力してください')
    return
  }
  if (!data.accept[0]) {
    alert('規約に同意してください')
    return
  }
  if (!data.clearsheet[0]) {
    alert('クリアシートを提出してください')
    return
  }
  if (data.name[0].match(/^.+（.+）$/) === null && data.name[0].match(/^.+\(.+\)$/) === null) {
    alert('名前は「名前（フリガナ）」の形式で入力してください')
    return
  }
  if (data.is_edit[0]) {
    post({ type: 'edit', uid: data.uid[0], body: buildData(data)})
      .then((res) => {
        if (res === 'ok') document.location.assign('../exit');
        else alert('送信に失敗しました。' + res);
      })
  } else {
    post({ type: 'add', uid: data.uid[0], body: buildData(data)})
      .then((res) => {
        if (res === 'ok') document.location.assign('../exit');
        else alert('送信に失敗しました。' + res);
      })
  }
}

export default function Form() {
  const tabs = ['全体', '審判員', '実況者', '走者']
  const data = initData();
  return (
    <main>
      <div>
        <div className='right-container'>
          <button className='submit' onClick={() => send(data)}>送信</button>
        </div>
        <Tabs tabs={tabs} data={data} />
        <NewComer data={data} />
      </div>
    </main>
  )
}
