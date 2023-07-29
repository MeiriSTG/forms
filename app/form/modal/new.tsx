import { useState } from "react";
import { post } from "@/app/api";
import { Data, copyData } from "../data";

type Props = {
  data: Data,
}

function register(data: Data, id: string, pw: string) {
  if (id.trim().length === 0 || pw.trim().length === 0) {
    alert('IDとPasswordを入力してください')
    return
  }
  const formData = new FormData();
  formData.append('type', 'check');
  formData.append('uid', id);
  post(formData)
    .then((res) => {
      if (res === 'no') {
        data.state[1](1);
        data.uid[1](id);
        data.password[1](pw);
      } else {
        alert('IDが既に使用されています')
      }
    })
}

function login(data: Data, id: string, pw: string) {
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
      data.state[1](1);
      data.is_edit[1](true);
      copyData(data, json, id);
    })
}

export function NewComer({ data }: Props) {
  const [id, setId] = useState('')
  const [pw, setPassword] = useState('')
  return (
    <>
      {data.state[0] === 0 &&
        <div className="modal-bg">
          <div className="modal">
            <p>【IDとPasswordを入力】</p>
            <p>
              新規登録時は好きに入力して「新規登録」
              <br />
              修正時は新規登録時に入力したIDとPasswordを入力して「ログイン」
            </p>
            <p>
              運営者に見えるので普段利用しているものは使わない方が良いです。
            </p>
            <table className="w-100">
              <thead></thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>
                    <input
                      className="w-100"
                      type="text"
                      placeholder="id"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    ></input></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <input
                      className="w-100"
                      type="text"
                      placeholder="password"
                      value={pw}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input></td>
                </tr>
              </tbody>
            </table>
            <p className="right-container">
              <button className="submit" onClick={() => register(data, id, pw)}>新規登録</button>
              <button className="submit" onClick={() => login(data, id, pw)}>ログイン</button>
            </p>
          </div>
        </div>
      }
    </>
  )
}
