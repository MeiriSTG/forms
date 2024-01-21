document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button-next").addEventListener("click", () => {
    const id = document.getElementById("input-id").value.trim()
    const pass = document.getElementById("input-pass").value
    if (id.length === 0) {
      alert("'" + id + "'は不正なIDです。空白以外の文字を1文字以上含めてください。")
      return
    }
    if (pass.length === 0) {
      alert("'" + pass + "'は不正なパスワードです。何かしらの文字を1文字以上含めてください。")
      return
    }
    const formData = new FormData()
    formData.append("type", "check")
    formData.append("uid", id)
    formData.append("password", pass)
    post(formData)
      .then((res) => {
        if (res === 'register') {
          window.location.href = "./input?type=register&id=" + id + "&pass=" + pass
        } else if (res === 'login') {
          window.location.href = "./input?type=login&id=" + id + "&pass=" + pass
        } else {
          alert("'" + id + "'は既に使用されているIDですが、パスワードが違います。")
        }
      })
  })
})
