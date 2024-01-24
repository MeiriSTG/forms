function checkDate(values) {
  let flag = false
  for (const n of values) {
    const date = n.stringValue.trim()

    // skip empty date
    if (date.length === 0) {
      continue
    }
    else {
      flag = true
    }

    // check format
    if (date.length !== 0 && date.match(/^[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9](,[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9])*$/) === null) {
      alert('時刻は「,」区切りの「hh:mm-hh:mm」で入力してください。')
      return false
    }

    // check number
    const arr = date.split(',');
    for (const a of arr) {
      if (a.length === 0) {
        continue
      }
      const time = a.split(/-|:/);
      if (
        Number(time[0]) < 19
        || Number(time[2]) > 25
        || (Number(time[0]) === 19 && Number(time[1]) < 30)
        || (Number(time[2]) === 25 && Number(time[3]) > 0)
      ) {
        alert('時刻は19:30から25:00までです。')
        return false
      }
    }
  }
  if (!flag) {
    alert('少なくとも一日以上は参加可能であってください。')
    return false
  }
  return true
}

document.addEventListener("DOMContentLoaded", async () => {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const type = params.get('type')
  const id = params.get('id')
  const pass = params.get('pass')
  if (!(type === "register" || type === "login") || !id || !pass) {
    alert("不正なアクセスです。")
    return
  }

  let data = {
    password: { stringValue: pass },
    accept: { booleanValue: false },
    name: { stringValue: "" },
    discord: { stringValue: "" },
    date: { arrayValue: { values: [
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
      { stringValue: "" },
    ] } },
    refree: { booleanValue: false },
    commentator: { booleanValue: false },
    comm_works: { arrayValue: { values: [
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
      { booleanValue: false },
    ] } },
    runner: { booleanValue: false },
    golive: { booleanValue: false },
    level: { integerValue: 0 },
    occ: { arrayValue: { values: [
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
    ] } },
    occp: { arrayValue: { values: [
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
    ] } },
    nb: { arrayValue: { values: [
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
      { integerValue: 0 },
    ] } },
  }

  // occ
  const occ = []
  for (let i = 1; i <= 13; ++i) {
    const e = document.getElementById("occ-" + i)
    e.addEventListener("change", () => {
      let v = 0
      for (let j = 1; j < e.children.length; ++j) {
        if (e.children[j].firstChild.checked) {
          v = v | (1 << (j - 1))
        }
      }
      data.occ.arrayValue.values[i - 1].integerValue = v
    })
    occ.push(e)
  }
  // occp
  const occp = []
  for (let i = 1; i <= 13; ++i) {
    const e = document.getElementById("occp-" + i)
    e.addEventListener("change", () => {
      let v = 0
      for (let j = 1; j < e.children.length; ++j) {
        if (e.children[j].firstChild.checked) {
          v = v | (1 << (j - 1))
        }
      }
      data.occp.arrayValue.values[i - 1].integerValue = v
    })
    occp.push(e)
  }
  // occp
  const nb = []
  for (let i = 1; i <= 19; ++i) {
    const e = document.getElementById("nb-" + i)
    e.addEventListener("change", () => {
      let v = 0
      for (let j = 1; j < e.children.length; ++j) {
        if (e.children[j].firstChild.checked) {
          v = v | (1 << (j - 1))
        }
      }
      data.nb.arrayValue.values[i - 1].integerValue = v
    })
    nb.push(e)
  }

  const switchWorks = (level) => {
    const mask = (arr, mask) => {
      for (const tr of arr) {
        for (let j = 1; j < tr.children.length; ++j) {
          if (mask & (1 << (j - 1))) {
            tr.children[j].firstChild.disabled = false
          } else {
            tr.children[j].firstChild.disabled = true
          }
        }
      }
    }
    if (level == 0) {
      mask(occ, 51)
      mask(occp, 0)
      mask(nb, 0)
    }
    else if (level == 1) {
      mask(occ, 60)
      mask(occp, 54)
      mask(nb, 7)
    }
    else {
      mask(occ, 8)
      mask(occp, 60)
      mask(nb, 7)
    }
  }
  switchWorks(0)

  // accept
  const accept = document.getElementById("accept")
  accept.addEventListener("change", () => data.accept.booleanValue = accept.checked)
  // name
  const name = document.getElementById("name")
  name.addEventListener("change", () => data.name.stringValue = name.value)
  // discord
  const discord = document.getElementById("discord")
  discord.addEventListener("change", () => data.discord.stringValue = discord.value)
  // date
  const date = []
  for (let i = 1; i <= 23; ++i) {
    const e = document.getElementById("date-" + i)
    e.addEventListener("change", () => data.date.arrayValue.values[i - 1].stringValue = e.value)
    date.push(e)
  }
  // refree
  const refree = document.getElementById("refree")
  refree.addEventListener("change", () => data.refree.booleanValue = refree.checked)
  // commentator
  const commentator = document.getElementById("commentator")
  commentator.addEventListener("change", () => data.commentator.booleanValue = commentator.checked)
  // comm-work
  const comm_work = []
  for (let i = 1; i <= 13; ++i) {
    const e = document.getElementById("comm-work-" + i)
    e.addEventListener("change", () => data.comm_works.arrayValue.values[i - 1].booleanValue = e.checked)
    comm_work.push(e)
  }
  // runner
  const runner = document.getElementById("runner")
  runner.addEventListener("change", () => data.runner.booleanValue = runner.checked)
  // golive
  const golive = document.getElementById("golive")
  golive.addEventListener("change", () => data.golive.booleanValue = golive.checked)
  // level
  const level = document.getElementsByName("level")
  for (let i = 0; i < level.length; ++i) {
    level.item(i).addEventListener("change", () => {
      if (level.item(i).checked) {
        data.level.integerValue = i
        switchWorks(i)
      }
    })
  }
  const setLevel = (index) => {
    level.item(index).checked = true
    switchWorks(index)
  }
  setLevel(0)

  if (type === "login") {
    const formData = new FormData()
    formData.append("type", "get")
    formData.append("uid", id)
    formData.append("password", pass)
    await post(formData)
      .then((res) => {
        try {
          data = JSON.parse(res)
        } catch (e) {
          console.log(res)
          alert("データの取得に失敗しました。運営に連絡していただけると助かります。")
          return
        }
      })
    accept.checked = data.accept.booleanValue
    name.value = data.name.stringValue
    discord.value = data.discord.stringValue
    for (let i = 0; i < date.length; ++i) {
      date[i].value = data.date.arrayValue.values[i].stringValue
    }
    refree.checked = data.refree.booleanValue
    commentator.checked = data.commentator.booleanValue
    for (let i = 0; i < comm_work.length; ++i) {
      comm_work[i].checked = data.comm_works.arrayValue.values[i].booleanValue
    }
    runner.checked = data.runner.booleanValue
    golive.checked = data.golive.booleanValue
    setLevel(data.level.integerValue)
    for (let i = 0; i < occ.length; ++i) {
      for (let j = 1; j < occ[i].children.length; ++j) {
        if (data.occ.arrayValue.values[i].integerValue & (1 << (j - 1))) {
          occ[i].children[j].firstChild.checked = true
        }
      }
    }
    for (let i = 0; i < occp.length; ++i) {
      for (let j = 1; j < occp[i].children.length; ++j) {
        if (data.occp.arrayValue.values[i].integerValue & (1 << (j - 1))) {
          occp[i].children[j].firstChild.checked = true
        }
      }
    }
    for (let i = 0; i < nb.length; ++i) {
      for (let j = 1; j < nb[i].children.length; ++j) {
        if (data.nb.arrayValue.values[i].integerValue & (1 << (j - 1))) {
          nb[i].children[j].firstChild.checked = true
        }
      }
    }
  }


  const entry1 = document.getElementById("entry1")
  const entry2 = document.getElementById("entry2")
  const entry3 = document.getElementById("entry3")
  const submit = document.getElementById("submit")
  submit.addEventListener("click", () => {
    if (!entry1.checked || !entry2.checked || !entry3.checked) {
      alert("上の三つの確認をすべて了承してください。お願いします。")
      return
    }
    if (!data.refree.booleanValue && !data.commentator.booleanValue && !data.runner.booleanValue) {
      alert("走者、実況者、審判員のいずれか一つは参加してください。")
      return
    }
    if (!data.accept.booleanValue) {
      alert("規約に同意してください。お願いします。")
      return
    }
    if (!data.name.stringValue.trim().length === 0) {
      alert(data.name.stringValue + "は不正な名前です。空白でない一文字以上の文字列にしてください。")
      return
    }
    if (data.name.stringValue.trim().match(/^.+（.+）$/) === null && data.name.stringValue.trim().match(/^.+\(.+\)$/) === null) {
      alert("名前は「名前（フリガナ）」の形式で入力してください。")
      return
    }
    if (data.discord.stringValue.trim().length === 0) {
      alert(data.discord.stringValue + "は不正なDiscord IDです。空白でない一文字以上の文字列にしてください。")
      return
    }
    if (!checkDate(data.date.arrayValue.values)) {
      return
    }
    const formData = new FormData();
    formData.append('type', type === "login" ? 'edit' : 'add')
    formData.append('uid', id)
    formData.append('body', JSON.stringify({ fields: data }))
    post(formData)
      .then((res) => {
        if (res === 'ok') window.location.href = "./end?url=https://discord.gg/tEXXCQMCh5"
        else alert('送信に失敗しました。' + res);
      })
  })
})