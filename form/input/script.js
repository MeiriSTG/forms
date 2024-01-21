document.addEventListener("DOMContentLoaded", async () => {
  const url = new URL(window.location.href)
  const params = url.searchParams
  const type = params.get('type')
  const id = params.get('id')
  const pass = params.get('pass')
  if (!type || !id || !pass) {
    alert("不正なアクセスです。")
    return
  }

  let data = {}
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
  }
})