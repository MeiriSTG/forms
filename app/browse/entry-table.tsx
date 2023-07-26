import { DIFFS, WORKS } from "@/app/api"

type Props = {
  array: any[],
}

function getDiffs(n: number): string {
  let res = ''
  for (let i = 0; i < DIFFS.length; ++i) {
    if (n & (1 << i))
      res += DIFFS[i] + ', '
  }
  return res.slice(0, -2)
}

export function EntryTable({ array }: Props) {
  return (
    <table className="rtable">
      <thead></thead>
      <tbody>
        {array.map((n: any, i: number) => (
          n.integerValue != 0 &&
          <tr key={i}>
            <td>{WORKS[i]}</td>
            <td>{getDiffs(n.integerValue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
