//the list of inputs filled. There should be 7 plus extras
const inputs = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    product: '',
    time: '',
    period: 'days',
    revisions: false,
    meetings: false,
    documentation: false,
    tAndC: false
}

const products = ['bug-fix', 'small-project', 'medium-project', 'big-project']
const extras = ['revisions', 'meetings', 'documentation']

const dateTable = {
    days: 7,
    weeks: 50,
    months: 100
   }

const productTable = {
    'bug-fix': 50,
    'small-project': 100,
    'medium-project': 300,
    'big-project': 1200
}

//show current values for form
const showValues = () => {
    Object.keys(inputs).forEach(e => console.log(inputs[e]))
    return false
}

//this adds the input value to the corresponding object key
Object.keys(inputs).forEach(e => {
    $(`#${e}`).change(() => {inputs[e] = $(`#${e}`).val()})
})

//this checks whether you accepted the privacy policy
$('#t-and-c').click(() => {inputs.tAndC = !inputs.tAndC})

//BUDGET LOGIC

//add things to budget. They should show as you add or remove them
//we just care about product, time and extras for budget

//calculate total price
const updatePrice = () => {

    //group all prices here to sum later. Also resets list every time
    const priceList = []

    //select all prices. They go in "xxx€" format, so we have to split them before pushing them to the array
    let prices = $('#pricing p')

    for(let i=0; i<prices.length; i++){
        let untrimmedPrice = prices[i].innerText
        priceList.push(parseInt(untrimmedPrice.slice(0,-1)))
    }

    //finalPrice is the sum of all prices present
    let finalPrice = priceList.reduce((a,b) => a + b, 0)

    //we delete potential prior prices, then we add the newly calculated one
    $('.fp').remove()
    $('#total-price').append(`
    <h3 class="fp" style="margin-top: 0; margin-right: 20px">
    TOTAL:
    </h3>
    <span class="fp" style="padding-top:3px">
     ${finalPrice} €
     </span>`)
    
}



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
    $('#concepts').append(`<p class="${value}">${label}</p>`)
    $('#pricing').append(`<p class="${value}">${productTable[value]}€</p>`)

    updatePrice()
})

//extras
extras.forEach(elem => {
    $(`#${elem}`).click(() => {

        //true or false depending on checkbox
        inputs[elem] = $(`#${elem}`)[0].checked

        //add line if true, remove if false
        if (inputs[elem]) {
            $('#concepts').append(`<p class="${elem}">Extra: ${$(`label[for=${elem}]`)[0].innerText}</p>`)
            $('#pricing').append(`<p class="${elem}">25€</p>`)
            updatePrice()
        }
        else {
            $(`.${elem}`).remove()
            updatePrice()
        }
        }
    )

    
})

//deadline
$('#time, #period').change(() => {
  
    //delete any previous deadlines from budget
    $('.deadline').remove()
    
    let timeNumber = parseInt(inputs.time)
    let timePeriod = parseInt(dateTable[inputs.period])
    let price = 200 - (timePeriod*timeNumber) + 100

    price < 100 ? price = 100 : price

    //add the product we need
    $('#concepts').append(`<p class="deadline">${inputs.time} ${inputs.period}</p>`)
    $('#pricing').append(`<p class="deadline">${price}€</p>`)

    updatePrice()
})

