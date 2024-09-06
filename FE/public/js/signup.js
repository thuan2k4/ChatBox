const maleCheckbox = document.getElementById('male')
const femaleCheckbox = document.getElementById('female')

maleCheckbox.addEventListener('change', () => {
    if (maleCheckbox.checked) {
        femaleCheckbox.checked = false
    }
})

femaleCheckbox.addEventListener('change', () => {
    if (femaleCheckbox.checked) {
        maleCheckbox.checked = false
    }
})