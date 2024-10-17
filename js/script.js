const resultado = document.getElementById('resultado');
const btns = document.querySelectorAll('.btn');

let primeiroNumero = null; 
let operador = null; 
let novaEntrada = false; 

/**
 * Função para limpar a calculadora.
 */
function limparCalculadora() {
    resultado.textContent = '0'; 
    primeiroNumero = null; 
    operador = null; 
    novaEntrada = false; 
}

/**
*  @realizarSoma Função para realizar a soma;
*  @if Caso o número do resultado seja maior que 14 digitos irá transformar em hexadecimal
*/
function realizarSoma(segundoNumero) {
    const resultadoFinal = primeiroNumero + segundoNumero; 
    if (resultadoFinal.toString().length > 14) {
        resultado.textContent = resultadoFinal.toString(16).toUpperCase(); 
    } else {
        resultado.textContent = resultadoFinal.toString().replace('.', ','); 
    }
    primeiroNumero = null; 
    operador = null; 
}

/**
*@realizarSubtracao Função para realizar a subtração;
*OBS: O resultado da subtração sempre está sendo em float, ou seja, caso seja colocado 8,2 - 4,2 o resultado
*será 3.999999999999 haverá um limite de 14 carácteres. 
*/
function realizarSubtracao(segundoNumero) {
    const resultadoFinal = primeiroNumero - segundoNumero; 
    const resultadoStr = resultadoFinal.toString();

    if (resultadoStr.length > 14) {
        resultado.textContent = resultadoStr.substring(0, 14); 
    } else {
        resultado.textContent = resultadoStr.replace('.', ','); 
    }
    primeiroNumero = null; 
    operador = null; 
}


/**
* @limitar14Digits Função para verificar se o comprimento do resultado é menor que 14 
*/ 
function limitar14Digits() {
    return resultado.textContent.length < 14; 
}

/**
 * @param forEach um bloco de comandas antes de todos os outros.
 * @param addEventListener Adiciona um evento ao clicar nos botões...
 */
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent; 
        const novoValor = resultado.textContent + (btnText === ',' ? ',' : btnText); 
        const segundoNumero = parseFloat(resultado.textContent.replace(',', '.')); 

        if (btnText === 'C') {
            limparCalculadora(); 
        } 

        else if (!isNaN(btnText) || btnText === ',') {
            if (resultado.textContent === '0' || novaEntrada) {
                if (limitar14Digits()) {
                    resultado.textContent = btnText === ',' ? '0,' : btnText; 
                    novaEntrada = false; 
                }
            } else {
                if (limitar14Digits()) {
                    resultado.textContent = novoValor; 
                }
            }
        } 
        else if (btnText === '+') {
            if (primeiroNumero === null) {
                primeiroNumero = parseFloat(resultado.textContent.replace(',', '.'));
            } else {
                primeiroNumero += segundoNumero;
            }
            operador = btnText; 
            resultado.textContent = '+'; 
            novaEntrada = true; 
        } 

        else if (btnText === '-') {
            if (primeiroNumero === null) {
                primeiroNumero = parseFloat(resultado.textContent.replace(',', '.'));
            } else {
                primeiroNumero -= segundoNumero;
            }
            operador = btnText; 
            resultado.textContent = '-'; 
            novaEntrada = true; 
        } 

        else if (btnText === '=') {
            if (primeiroNumero !== null && operador === '+') {
                realizarSoma(segundoNumero); 
            } else if (primeiroNumero !== null && operador === '-') {
                realizarSubtracao(segundoNumero); 
            }
        }
    });
});
