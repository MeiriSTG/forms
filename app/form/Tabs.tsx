"use client";

import { useState } from 'react'
import { All } from './tab/all'
import { Refree } from './tab/refree'
import { Commentator } from './tab/commentator'
import { Runner } from './tab/runner'
import { Data } from './data'

type Props = {
  tabs: string[],
  data: Data,
}

function getClassName(cur: string, set: string): string {
  if (cur === set) {
    return "tab tab-selected";
  } else {
    return "tab";
  }
}

export function Tabs(props: Props) {
  const [activeTab, setActiveTab] = useState(props.tabs[0])
  return (
    <div>
      <div className='center-container'>
        {props.tabs.map((tab) => (
          <button className={getClassName(tab, activeTab)}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === '全体' && <All data={props.data} />}
      {activeTab === '審判員' && <Refree data={props.data} />}
      {activeTab === '実況者' && <Commentator data={props.data} />}
      {activeTab === '走者' && <Runner data={props.data} />}
    </div>
  )
}
