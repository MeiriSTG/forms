import { DATE_COL, DATE_ROW } from "../api"

type Props = {
  data: any,
}

function getCol(n: number): string {
  let res = ''
  for (let i = 0; i < DATE_COL.length; ++i) {
    if (n & (1 << i))
      res += DATE_COL[i] + ', '
  }
  return res.slice(0, -2)
}

export function DateTable({ data }: Props) {
  return (
    <table className="rtable">
      <thead></thead>
      <tbody>
        {data.date.arrayValue.values.map((n: any, i: number) => (
          n.integerValue != 0 &&
            <tr key={i}>
              <td>{DATE_ROW[i]}</td>
              <td>{getCol(n.integerValue)}</td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}
