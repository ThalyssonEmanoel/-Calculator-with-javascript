const resultado = document.getElementById('resultado');
const btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent;
        if (btnText === 'C') {
            resultado.textContent = '0';
        } else if (!isNaN(btnText) || btnText === ',') {
            if (resultado.textContent === '0') {
                resultado.textContent = btnText === ',' ? '0,' : btnText;
            } else {
            const novoValor = resultado.textContent + (btnText === ',' ? ',' : btnText);
            resultado.textContent = novoValor;
            }
        }
    });
});
