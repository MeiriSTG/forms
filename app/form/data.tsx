import { useState, Dispatch, SetStateAction } from 'react'
import { DATE_ROW, DIFFS, WORKS, WORKS_NB, WORKS_OCCP } from '../api'

type Bits = {
  integerValue: number
}[]

function getBits(arr: [boolean, Dispatch<SetStateAction<boolean>>][][]): Bits {
  const bits: Bits = []
  for (let i = 0; i < arr.length; ++i) {
    let bit = 0
    for (let j = 0; j < arr[i].length; ++j) {
      if (arr[i][j][0]) {
        bit |= 1 << j
      }
    }
    bits.push({ integerValue: bit })
  }
  return bits
}

function decodeBits(bits: Bits, target: [boolean, Dispatch<SetStateAction<boolean>>][][]): void {
  for (let i = 0; i < bits.length; ++i) {
    for (let j = 0; j < target[i].length; ++j) {
      target[i][j][1]((bits[i].integerValue & (1 << j)) !== 0)
    }
  }
}

export type Data = {
  is_edit: [boolean, Dispatch<SetStateAction<boolean>>],
  state: [number, Dispatch<SetStateAction<number>>],
  clearsheet: [File|null, Dispatch<SetStateAction<File|null>>],
  uid: [string, Dispatch<SetStateAction<string>>],
  password: [string, Dispatch<SetStateAction<string>>],
  accept: [boolean, Dispatch<SetStateAction<boolean>>],
  name: [string, Dispatch<SetStateAction<string>>],
  discord: [string, Dispatch<SetStateAction<string>>],
  date: [string, Dispatch<SetStateAction<string>>][],
  refree: [boolean, Dispatch<SetStateAction<boolean>>],
  commentator: [boolean, Dispatch<SetStateAction<boolean>>],
  comm_works: [boolean, Dispatch<SetStateAction<boolean>>][],
  runner: [boolean, Dispatch<SetStateAction<boolean>>],
  golive: [boolean, Dispatch<SetStateAction<boolean>>],
  level: [number, Dispatch<SetStateAction<number>>],
  occ: [boolean, Dispatch<SetStateAction<boolean>>][][],
  occp: [boolean, Dispatch<SetStateAction<boolean>>][][],
  nb: [boolean, Dispatch<SetStateAction<boolean>>][][],
}

/// A function to init a Data.
export function initData(): Data {
  return {
    is_edit: useState(false),
    state: useState(0),
    clearsheet: useState(null as File | null),
    uid: useState(''),
    password: useState(''),
    accept: useState(false),
    name: useState(''),
    discord: useState(''),
    date: new Array(DATE_ROW.length).fill(0).map(() => useState('')),
    refree: useState(false),
    commentator: useState(false),
    comm_works: new Array(WORKS.length).fill(0).map(() => useState(false)),
    runner: useState(false),
    golive: useState(false),
    level: useState(0),
    occ: new Array(WORKS.length).fill(0).map(() => new Array(DIFFS.length).fill(0).map(n => n = useState(false))),
    occp: new Array(WORKS_OCCP.length).fill(0).map(() => new Array(DIFFS.length).fill(0).map(n => n = useState(false))),
    nb: new Array(WORKS_NB.length).fill(0).map(() => new Array(DIFFS.length).fill(0).map(n => n = useState(false))),
  }
}

/// A function to copy Data from the json on the database.
export function copyData(data: Data, json: any, uid: string) {
  data.uid[1](uid)
  data.password[1](json.password.stringValue)
  data.accept[1](json.accept.booleanValue)
  data.name[1](json.name.stringValue)
  data.discord[1](json.discord.stringValue)
  json.date.arrayValue.values.forEach((n: any, i: number) => data.date[i][1](n.stringValue))
  data.refree[1](json.refree.booleanValue)
  data.commentator[1](json.commentator.booleanValue)
  json.comm_works.arrayValue.values.forEach((n: any, i: number) => data.comm_works[i][1](n.booleanValue))
  data.runner[1](json.runner.booleanValue)
  data.golive[1](json.golive.booleanValue)
  data.level[1](Number(json.level.integerValue))
  decodeBits(json.occ.arrayValue.values, data.occ)
  decodeBits(json.occp.arrayValue.values, data.occp)
  decodeBits(json.nb.arrayValue.values, data.nb)
}

/// A function to build Data to the json to send to the database.
export function buildData(data: Data): any {
  return {
    fields: {
      password: { stringValue: data.password[0].trim() },
      accept: { booleanValue: data.accept[0] },
      name: { stringValue: data.name[0].trim() },
      discord: { stringValue: data.discord[0].trim() },
      date: { arrayValue: { values: data.date.map((n) => { return { stringValue: n[0].trim() } }) } },
      refree: { booleanValue: data.refree[0] },
      commentator: { booleanValue: data.commentator[0] },
      comm_works: { arrayValue: { values: data.comm_works.map((n) => { return { booleanValue: n[0] } }) } },
      runner: { booleanValue: data.runner[0] },
      golive: { booleanValue: data.golive[0] },
      level: { integerValue: data.level[0] },
      occ: { arrayValue: { values: getBits(data.occ) } },
      occp: { arrayValue: { values: getBits(data.occp) } },
      nb: { arrayValue: { values: getBits(data.nb) } },
    }
  }
}
