import { DIFFS, Part, WORKS, WORKS_NB, WORKS_OCCP, shouldShow } from "@/app/api"

type Props = {
  array: any[],
  part: Part,
  level: number,
}

type PropsTr = {
  n: number,
  part: Part,
  level: number,
  work: number,
}

function getDiffs(n: number, part: Part, level: number, work: number): string {
  let res = ''
  for (let i = 0; i < DIFFS.length; ++i) {
    if (n & (1 << i) && shouldShow(part, level, i, work))
      res += DIFFS[i] + ', '
  }
  return res.slice(0, -2)
}

function Tr(props: PropsTr) {
  const str = getDiffs(props.n, props.part, props.level, props.work);
  if (str == '') {
    return (<></>)
  }
  return (
    <tr>
      <td>
        {props.part === Part.OCC && WORKS[props.work]}
        {props.part === Part.OCCP && WORKS_OCCP[props.work]}
        {props.part === Part.NB && WORKS_NB[props.work]}
      </td>
      <td>{getDiffs(props.n, props.part, props.level, props.work)}</td>
    </tr>
  )
}

export function EntryTable(props: Props) {
  return (
    <table className="rtable">
      <thead></thead>
      <tbody>
        {props.array.map((n: any, i: number) => (
          <div key={i}><Tr n={n.integerValue} part={props.part} level={props.level} work={i} /></div>
        ))}
      </tbody>
    </table>
  )
}
