import { LEVELS, WORKS } from "../api"
import { DateTable } from "./date-table"
import { EntryTable } from "./entry-table"

type Props = {
  data: any,
}

function getCommWorks(values: any[]): string {
  let res = ''
  for (let i = 0; i < values.length; ++i) {
    if (values[i].booleanValue)
      res += WORKS[i] + ', '
  }
  return res.slice(0, -2)
}

export function Table({ data }: Props) {
  console.log(data);
  return (
    <table className="table">
      <thead></thead>
      <tbody>
        <tr><td>名前（フリガナ）</td><td>{data.name.stringValue}</td></tr>
        <tr><td>DiscordID</td><td>{data.discord.stringValue}</td></tr>
        <tr><td>クリアシート名</td><td>{data.csname.stringValue}</td></tr>
        <tr><td>参加可能な時間帯</td><td><DateTable data={data} /></td></tr>
        {data.refree.booleanValue && <tr><td>審判</td><td>Yes</td></tr>}
        {data.commentator.booleanValue && <tr><td>実況者</td><td>Yes</td></tr>}
        {data.commentator.booleanValue && <tr><td>実況希望作品</td><td>{getCommWorks(data.comm_works.arrayValue.values)}</td></tr>}
        {data.runner.booleanValue && <tr><td>走者</td><td>Yes</td></tr>}
        {data.runner.booleanValue && <tr><td>配信</td><td>{data.golive.booleanValue ? 'Yes' : 'No'}</td></tr>}
        {data.runner.booleanValue && <tr><td>レベル</td><td>{LEVELS[data.level.integerValue]}</td></tr>}
        {data.runner.booleanValue && <tr><td>1CC</td><td><EntryTable array={data.occ.arrayValue.values} /></td></tr>}
        {data.runner.booleanValue && data.level.integerValue != 0 && <tr><td>1CC+</td><td><EntryTable array={data.occp.arrayValue.values} /></td></tr>}
        {data.runner.booleanValue && data.level.integerValue != 0 && <tr><td>NB</td><td><EntryTable array={data.nb.arrayValue.values} /></td></tr>}
        {data.runner.booleanValue && data.level.integerValue != 0 && <tr><td>NB+</td><td><EntryTable array={data.nbp.arrayValue.values} /></td></tr>}
      </tbody>
    </table>
  )
}