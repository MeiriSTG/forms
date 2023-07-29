"use client";

import { Dispatch, useState } from "react"
import { post } from "@/app/api";
import { Table } from "./table";

function login(setData: Dispatch<any>, id: string, pw: string) {
  const formData = new FormData();
  formData.append('type', 'get');
  formData.append('uid', id);
  formData.append('password', pw);
  post(formData)
    .then((res) => {
      let json = {};
      try {
        json = JSON.parse(res);
      } catch (_) {
        console.log(res);
        alert('IDかPasswordが間違っています')
        return
      }
      setData(json)
    })
}

export default function Browse() {
  const [id, setId] = useState("")
  const [pw, setPassword] = useState("")
  const [data, setData] = useState(null as any)
  return (
    <main>
      <div>
        <table className="w-100">
          <thead></thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>
                <input
                  type="text"
                  className="w-100"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="text"
                  className="w-100"
                  value={pw}
                  onChange={(e) => setPassword(e.target.value)}
                /></td>
            </tr>
          </tbody>
        </table>
        <p className="right-container">
          <button className="submit" onClick={() => login(setData, id, pw)}>ログイン</button>
        </p>
        {data !== null && <Table data={data} />}
      </div>
    </main>
  )
}
