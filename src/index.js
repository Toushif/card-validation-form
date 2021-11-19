const form = document.cardValdation;
const submitBtn = form.submitBtn;
const cardNum = form.cardNumber;
const cardName = form.cardName;
const validThru = form.validThru;
const cardCvv = form.cardCvv;

let isCardNumber;
let isCardName;
let isValidThru;
let isCardCvv;
let tempValidThru = [];

function submitForm(e) {
    e.preventDefault();
    console.log('Form Submitted')
    return false;
}

function handleValidation(e) {
    const name = e.target.name;
    const value = e.target.value;
    name === 'cardNumber' ? isCardNumber = name === 'cardNumber' && value.length === 16 : '';
    name === 'cardName' ? isCardName = name === 'cardName' && value.length >= 8 : '';
    name === 'validThru' ? isValidThru = name === 'validThru' && value.length === 4 : '';
    name === 'cardCvv' ? isCardCvv = name === 'cardCvv' && value.length === 3 : '';

    if(isCardNumber && isCardName && isValidThru && isCardCvv) {
        submitBtn.removeAttribute('disabled')
    } else {
        if(!submitBtn.getAttribute('disabled')) submitBtn.setAttribute('disabled', true)
    }
    console.log(e.target.name, isCardNumber,isCardName, isValidThru, isCardCvv)
}

function handleCardNumberInput(e) {
    const value = e.target.value;
    if(value.length && value.length > 4) {
        tempValidThru = []
        for(let i = 0; i < value.length; i+=4) {
            tempValidThru.push(value.substr(i, 4))
        }
    }
    const store = tempValidThru.join('-')
    // setTimeout(_=> cardNum.setAttribute('value', store), 0)
    cardNum.setAttribute('defaultValue', store); //formatting not working
    console.log('temp', e, tempValidThru, store, cardNum.value)
}

function init() {
    submitBtn.setAttribute('disabled', true)
    cardNum.addEventListener('change', handleValidation, false)
    // var event = new Event('keyup');
    cardNum.addEventListener('keyup', handleCardNumberInput, false)
    // cardNum.dispatchEvent(event);
    cardName.addEventListener('change', handleValidation, false)
    validThru.addEventListener('change', handleValidation, false)
    cardCvv.addEventListener('change', handleValidation, false)
}

init()

