export function post(body: any): Promise<string> {
  return fetch(
    'https://meiristg.genreihoutengu.workers.dev',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )
    .then((res) => res.text())
}

export const DATE_ROW = [
  '8/19 (土)',
  '8/20 (日)',
  '8/21 (月)',
  '8/22 (火)',
  '8/23 (水)',
  '8/24 (木)',
  '8/25 (金)',
  '8/26 (土)',
  '8/27 (日)',
  '8/28 (月)',
  '8/29 (火)',
  '8/30 (水)',
  '8/31 (木)',
  '9/1 (金)',
  '9/2 (土)',
  '9/3 (日)',
]

export const DATE_COL = [
  'すべて可',
  '19:30-21:30',
  '20:00-22:00',
  '20:30-22:30',
  '21:00-23:00',
  '21:30-23:30',
  '22:00-24:00',
  'すべて不可',
]

export const WORKS = [
  '東方紅魔郷',
  '東方妖々夢',
  '東方永夜抄',
  '東方風神録',
  '東方地霊殿',
  '東方星蓮船',
  '妖精大戦争',
  '東方神霊廟',
  '東方輝針城',
  '東方紺珠伝',
  '東方天空璋',
  '東方鬼形獣',
  '東方虹龍洞',
]

export const LEVELS = [
  '初級',
  '中級',
  '上級',
]

export const DIFFS = [
  'Easy',
  'Normal',
  'Hard',
  'Lunatic',
  'Extra',
  'Phantasm',
]
