//the list of inputs filled. There should be 7 plus extras
const inputs = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    product: '',
    time: '',
    period: '',
    revisions: false,
    meetings: false,
    documentation: false,
    tAndC: false
}

const products = ['bug-fix', 'small-project', 'medium-project', 'big-project']
const extras = ['revisions', 'meetings', 'documentation']

//When you select any input field, add its value to const inputs.
//If it changes the budget (product, time,extras) show it under "PRESUPUESTO FINAL"


//show current values for form
const showValues = () => {
    Object.keys(inputs).forEach(e => console.log(inputs[e]))
    return false
}

//this adds the input value to the corresponding object key
Object.keys(inputs).forEach(e => {
    $(`#${e}`).change(() => {inputs[e] = $(`#${e}`).val(); showValues()})
})

//this checks whether you accepted the privacy policy
$('#t-and-c').click(() => {inputs.tAndC = !inputs.tAndC; showValues()})

//BUDGET LOGIC

//add things to budget. They should show as you add or remove them
//we just care about product, time and extras for budget

//product
$('#product').change(() => {

    //the option value
    let value = $('#product').val() 
    //the option text
    let label = $(`option[value=${$('#product').val()}]`)[0].innerText


    //delete any previous products from budget
    products.forEach(prod => {
        $(`.${prod}`).remove()
    })

    //add the product we need
    $('#budget-final').append(`<p class="${value}">${label}</p>`)
})

//extras
extras.forEach(elem => {
    $(`#${elem}`).click(() => {

        //true or false depending on checkbox
        inputs[elem] = $(`#${elem}`)[0].checked

        //add line if true, remove if false
        if (inputs[elem]) {
            $('#budget-final').append(`<p class="${elem}">Extra: ${$(`label[for=${elem}]`)[0].innerText}</p>`)
        }
        else {
            $(`.${elem}`).remove()
        }
        }
    )
})

//deadline


//add price to budget like this:
//
//const dateTable = {
//  days: 1,
//  weeks: 7,
//  months: 30
//}
//
//let datePrice = number * parseInt(inputs.time) / dateTable[inputs.period]
//number being the price that I charge for a day's work. Need a constant to make the slope less sharp
