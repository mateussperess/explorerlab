import "./css/index.css"

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
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0]) // acessa a propiedade do objeto colors através de uma variável js
  ccBgColor02.setAttribute("fill", colors[type][1])

  ccLogo.setAttribute("src", `cc-${type}.svg`) //o "type" referencia o nome do svg, que possue os mesmos nomes dos arrays de cores ali em cima
}

// setCardType("visa")
// setCardType("mastercard")
setCardType("default")
// console.log(setCardType)

globalThis.setCardType = setCardType // transforma a função global, permitindo a execução pelo console (se necessário)
