function post(formData) {
  return fetch(
    "https://meiristg.genreihoutengu.workers.dev",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res.text())
}
