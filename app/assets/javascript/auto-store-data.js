// On form submit, add hidden inputs for checkboxes so the server knows if
// they've been unchecked. This means we can automatically store and update
// all form data on the server, including checkboxes that are checked, then
// later unchecked
const forms = document.querySelectorAll('form')

for (let form of forms) {
  form.addEventListener('submit', () => {
    const checkboxes = form.querySelectorAll("input[type='checkbox']")
    const names = {}

    checkboxes.forEach((checkbox) => {
      if (!names[checkbox.name]) {
        names[checkbox.name] = true

        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', checkbox.name)
        input.setAttribute('value', '_unchecked')
        form.appendChild(input)
      }
    })
  })
}
