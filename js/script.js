const resultado = document.getElementById('resultado');
const btns = document.querySelectorAll('.btn');

let primeiroNumero = null; 
let operador = null; 
let novaEntrada = false; 

/**
*  Função para realizar a soma e quando for dar o resultado;
*  Caso o número do resultado seja maior que 14 digitos irá transformar em hexadecimal
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

// Função para verificar se o comprimento do resultado é menor que 14
function limitar14Digits() {
    return resultado.textContent.length < 14; 
}

/**
 * Antes da execução de todos os outros códigos, ele irá executar o método de adicionar um evento ao clicar nos botões...
 * Logo após determinar que essa função será a primeira a ser executada, 
*/
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent; 
        const novoValor = resultado.textContent + (btnText === ',' ? ',' : btnText); 
        const segundoNumero = parseFloat(resultado.textContent.replace(',', '.')); 

        if (btnText === 'C') {
            resultado.textContent = '0'; 
            primeiroNumero = null; 
            operador = null; 
            novaEntrada = false; 
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
        else if (btnText === '=') {
            if (primeiroNumero !== null && operador === '+') {
                realizarSoma(segundoNumero); 
            }
        }
    });
});
