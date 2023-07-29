"use client";

import { Tabs } from './Tabs'
import { NewComer } from './modal/new';
import { Data, initData } from './data';
import { Confirm } from './modal/confirm';

function checkDate(data: Data): boolean {
  let flag = false
  for (const [n, _] of data.date) {
    // skip empty date
    if (n.trim().length === 0)
      continue
    else
      flag = true
    // check format
    if (n.trim().length !== 0 && n.match(/^[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9](,[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9])*$/) === null) {
      alert('時刻は「,」区切りの「hh:mm-hh:mm」で入力してください')
      return false
    }
    // check number
    const arr = n.trim().split(',');
    for (const a of arr) {
      if (a.length === 0)
        continue
      const time = a.split(/-|:/);
      if (
        Number(time[0]) < 19
        || Number(time[2]) > 25
        || (Number(time[0]) === 19 && Number(time[1]) < 30)
        || (Number(time[2]) === 25 && Number(time[3]) > 0)
      ) {
        alert('時刻は19:30から25:00までです')
        return false
      }
    }
  }
  if (!flag) {
    alert('少なくとも一日以上は参加可能であってください')
    return false
  }
  return true
}

function check(data: Data) {
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
  if (!data.refree[0] && !data.commentator[0] && !data.runner[0]) {
    alert('審判員、実況者、選手のいずれか一つ以上は選んでください')
    return
  }
  if (data.name[0].match(/^.+（.+）$/) === null && data.name[0].match(/^.+\(.+\)$/) === null) {
    alert('名前は「名前（フリガナ）」の形式で入力してください')
    return
  }
  if (!checkDate(data))
    return
  data.state[1](2);
}

export default function Form() {
  const tabs = ['全体', '審判員', '実況者', '選手']
  const data = initData();
  return (
    <main>
      <div>
        <div className='right-container'>
          <button className='submit' onClick={() => check(data)}>送信</button>
        </div>
        <Tabs tabs={tabs} data={data} />
        <NewComer data={data} />
        <Confirm data={data} />
      </div>
    </main>
  )
}
