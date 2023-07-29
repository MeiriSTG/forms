export function post(formData: FormData): Promise<string> {
  return fetch(
    'https://meiristg.genreihoutengu.workers.dev',
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((res) => res.text())
}

export const DATE_ROW = [
  '8/14 (月)',
  '8/15 (火)',
  '8/16 (水)',
  '8/17 (木)',
  '8/18 (金)',
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

export const WORKS_OCCP = [
  '東方紅魔郷',
  '東方妖々夢',
  '東方永夜抄',
  '東方風神録',
  '東方地霊殿',
  '東方星蓮船',
  '東方神霊廟',
  '東方輝針城',
  '東方紺珠伝',
  '東方天空璋',
  '東方鬼形獣',
  '東方虹龍洞',
]

export const WORKS_NB = [
  '東方紅魔郷',
  '東方妖々夢',
  '東方妖々夢(救済あり)',
  '東方永夜抄',
  '東方風神録',
  '東方地霊殿',
  '東方星蓮船',
  '東方星蓮船(救済あり)',
  '妖精大戦争',
  '東方神霊廟',
  '東方神霊廟(救済あり)',
  '東方輝針城',
  '東方紺珠伝',
  '東方天空璋',
  '東方天空璋(救済あり)',
  '東方鬼形獣',
  '東方鬼形獣(救済あり)',
  '東方虹龍洞',
  '東方虹龍洞(救済あり)',
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

export enum Part {
  OCC,
  OCCP,
  NB,
}

const SHOULD_SHOW_OCC: { [index: number]: number[] } = {
  0: [0, 1, 4, 5],
  1: [2, 3, 4, 5],
  2: [3],
}
const SHOULD_SHOW_OCCP: { [index: number]: number[] } = {
  0: [],
  1: [1, 2],
  2: [2, 3],
}
const SHOULD_SHOW_NB: { [index: number]: number[] } = {
  0: [],
  1: [1, 2, 3],
  2: [1, 2, 3],
}

export function shouldShow(part: Part, level: number, diff: number, work: number): boolean {
  if (diff === 5 && work !== 1)
    return false
  switch (part) {
    case Part.OCC:
      return SHOULD_SHOW_OCC[level].includes(diff)
    case Part.OCCP:
      return SHOULD_SHOW_OCCP[level].includes(diff)
    case Part.NB:
      return SHOULD_SHOW_NB[level].includes(diff)
    default:
      return false
  }
}
