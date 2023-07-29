import { DATE_ROW } from "../api"

type Props = {
  data: any,
}

export function DateTable({ data }: Props) {
  return (
    <table className="rtable">
      <thead></thead>
      <tbody>
        {data.date.arrayValue.values.map((n: any, i: number) => (
          n.stringValue != '' &&
            <tr key={i}>
              <td>{DATE_ROW[i]}</td>
              <td>{n.stringValue}</td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}
