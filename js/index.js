//the list of inputs filled. There should be 7 plus extras
const inputs = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    product: '',
    time: '',
    period: ''
}

const extras = []

//When you select any input field, add its value to const inputs.
//If it changes the budget (product, time,extras) show it under "PRESUPUESTO FINAL"

const showValues = () => {
    Object.keys(inputs).forEach(e => console.log(inputs[e]))
    return false
}

Object.keys(inputs).forEach(e => {
    $(`#${e}`).change(() => {inputs[e] = $(`#${e}`).val(); showValues()})
})
