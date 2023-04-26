//load news
const cargarNoticia = () => {
    console.log('this gets in')
    $.ajax({
        url: "store/news.json",
        type: "GET",
        success(data) {
            let res = ""

            //We get a random piece of news every time
            const len = Object.keys(data).length
            const randomNum = Math.floor(Math.random()*len)
            const randomNews = data[Object.keys(data)[randomNum]]

            res += `<h1>Tech news</h1><br>`
            res += `<h2 id="news-title">${randomNews.title}</h2><br>`
            res += `<h4 id="news-subtitle">${randomNews.subtitle}<br></h4>`
            res += `<p>${randomNews.body}</p>`
            res += `<a target="blank_" href="${randomNews.url}"> <div class="cta-btn" style="color:#000">Leer más</div> </a>`

            console.log(res)

            $('#news').html(res)

        },
        error(xhr, status) {
            console.log(xhr, status)
            alert('Problema')
        }
    })
}

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

//this accetps/unaccepts the privacy policy
$('#t-and-c').click(() => {inputs.tAndC = !inputs.tAndC})

//trying special effect for pictures in index
$(`.carousel-link:hover`).css('filter','none')


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



//VALIDATION

//We're going to validate each field according to the constraints.
//If there is something wrong, we'll continue the function but let the user know
//If everything is correct, we will send the information somewhere

const validateForm = () => {

    //let's check first for empty fields. The fields that should be filled are:
    // name, surname, phone, email, product, and time.
    if (inputs.name.length == 0
        || inputs.surname.length == 0
        || inputs.phone.length == 0
        || inputs.email.length == 0
        || inputs.product.length == 0
        || inputs.time.length == 0
        ) 
        return alert('There\'s something missing!')

    //if all the fields are filled, we validate each of them.

    //VALIDATING NAME: CHARACTERS AND SPACES, UP TO 15 CHARS
    const nameRegex = /^([a-zA-Z áéíóú]){1,15}$/

    if (!nameRegex.test(inputs.name.trim())) return alert('Name is wrong!')

    //VALIDATING SURNAME: CHARACTERS, SPACES AND DASHES, UP TO 40 CHARS
    const surnameRegex = /^([a-zA-Z \-áéíóú]){1,40}$/

    if (!surnameRegex.test(inputs.surname.trim())) return alert('Surname is wrong!')

    //VALIDATING PHONE NUMBER: UP TO 9 DIGITS
    const phoneRegex = /^\d{1,9}$/

    if (!phoneRegex.test(inputs.phone.trim())) return alert('Phone number is wrong!')

    //VALIDATING EMAIL: CORRECT FORMAT
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if(!emailRegex.test(inputs.email.trim())) return alert('Email is wrong!')

    //VALIDATING TERMS AND CONDITIONS
    if (!inputs.tAndC) return alert('Please read and accept our Terms and Conditions')

    //IF ALL VALIDATIONS PASS, SEND THE INFO TO A JSON
    //.SERIALIZE?
    $.ajax({
        url : '../store/pedidos.json', // la URL para la petición
        data : `accion=guardar
        &nombre=${inputs.name}
        &apellido=${inputs.surname}
        &telefono=${inputs.phone}
        &correo=${inputs.email}
        &producto=${inputs.product}
        &tiempo=${time} ${inputs.period}
        `, // la información a enviar (extras cómo?)
        type : 'POST', // especifica si será una petición POST o GET
        // código a ejecutar si la petición es satisfactoria;
        success : function(data) {
            console.log(data)
            if(data=='OK'){
                alert('Guardado OK'); //se ha guardado el dato
            } else{
                alert('Error: '+data);//no se ha guardado el dato
            }
        },
        // código a ejecutar si la petición falla;
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}