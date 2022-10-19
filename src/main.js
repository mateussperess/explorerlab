import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

console.log(ccBgColor01)
console.log(ccBgColor02)

// ccBgColor01.setAttribute("fill", "green")
// ccBgColor02.setAttribute("fill", "yellow")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    oton_bank: ["#1a678b", "#144683"],
    bb: ["#ffef38", "#003da4"],
    elo: ["#ffcb05", "#ef4123"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0]) // acessa a propiedade do objeto colors através de uma variável js
  ccBgColor02.setAttribute("fill", colors[type][1])

  ccLogo.setAttribute("src", `cc-${type}.svg`) //o "type" referencia o nome do svg, que possue os mesmos nomes dos arrays de cores ali em cima
}

// setCardType("visa")
// setCardType("mastercard")
// setCardType("default")
// console.log(setCardType)

globalThis.setCardType = setCardType // transforma a função global, permitindo a execução pelo console (se necessário)

// ----------------------------------------------------------------------------------------------------------------------

// AULA 2

// security-code
document.getElementById("security-code")
// ou
const securityCode = document.querySelector("#security-code") // variável "const" significa que a variável é constante, ou seja, não muda
const securityCodePattern = {
  mask: "0000",
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// expiration date
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",

  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // função getFullYear coleta ano atual -> slice armazena os dois últimos valores da string
      to: String(new Date().getFullYear() + 10).slice(2), // +10 pois o intervalo de ano de expiração é de 10 anos, ou seja, ano atual +10
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },

    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },

    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },

    {
      mask: "0000 0000 0000 0000",
      cardtype: "elo",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    // if (dynamicMasked.value == 5) {
    //   console.log("mastercard aqui")
    //   setCardType("mastercard")
    // } else {
    //   if (dynamicMasked.value == 4) {
    //     console.log("visa aqui")
    //     setCardType("visa")
    //   }
    // }

    // console.log(foundMask)
    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  console.log("The button has been clicked")
})

document.querySelector("form").addEventListener("submit", (element) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}
