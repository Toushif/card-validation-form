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
    console.log("Form Submitted");
    return false;
}

formCardValidation.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formCardValidation);
    const obj = Object.fromEntries(formData.entries());
    console.log("form", formCardValidation, formData, obj);
    // let response = await fetch("/article/formdata/post/user-avatar", {
    //     method: "POST",
    //     body: new FormData(formCardValidation),
    // });

    // let result = await response.json();

    // alert(result.message);
};

function handleValidation(e) {
    const name = e.target.name;
    const value = e.target.value;
    if((name === "validThru" || name === "cardNumber") && ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8)) {
        e.preventDefault()
        return;
    }
    name === "cardNumber" ? (isCardNumber = value.length === 16) : "";
    name === "cardName" ? (isCardName = value.length >= 8) : "";
    name === "validThru" ? (isValidThru = value.length === 4) : "";
    name === "cardCvv" ? (isCardCvv = value.length === 3) : "";

    if (isCardNumber && isCardName && isValidThru && isCardCvv) {
        submitBtn.removeAttribute("disabled");
    } else {
        if (!submitBtn.getAttribute("disabled"))
            submitBtn.setAttribute("disabled", true);
    }
    // console.log(
    //     e,
    //     e.target.name,
    //     isCardNumber,
    //     isCardName,
    //     isValidThru,
    //     isCardCvv
    // );
}

function handleCardNumberInput(e) {
    const value = e.target.value;
    if(((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8) || (tempValidThru.join('').length === 16 && e.keyCode !== 8)) {
        return;
    }
    // if (value.length && value.length > 4) {
    //     tempValidThru = [];
    //     for (let i = 0; i < value.length; i += 4) {
    //         tempValidThru.push(value.substr(i, 4));
    //     }
    // }
    if(e.keyCode === 8 && tempValidThru.length) {
        let text = tempValidThru[tempValidThru.length - 1];
        tempValidThru[tempValidThru.length - 1] = text.substr(0, text.length-1)
        if(!text) tempValidThru.pop()
    } else {
        if(tempValidThru.length) {
            if(tempValidThru[tempValidThru.length - 1].length < 4) {
                tempValidThru[tempValidThru.length - 1] += value[value.length - 1]
            } else {
                tempValidThru[tempValidThru.length] = value[value.length - 1]
            }
        } else {
            tempValidThru[0] = value;
        }
    }
    const store = tempValidThru.join("-");
    cardNum.setAttribute("defaultValue", store); //formatting not working
    console.log("temp", tempValidThru, store, cardNum.value);
}

function init() {
    submitBtn.setAttribute("disabled", true);
    cardNum.addEventListener("keydown", handleValidation, false);
    cardNum.addEventListener("keyup", handleCardNumberInput, false);
    cardName.addEventListener("keydown", handleValidation, false);
    validThru.addEventListener("keydown", handleValidation, false);
    cardCvv.addEventListener("keydown", handleValidation, false);
}

init();
