document.addEventListener('DOMContentLoaded', function() {
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var resultadoDiv = document.getElementById('resultado');

    num1.value = 0;
    num2.value = 0;

    function sumar(a, b) { return a + b; }
    function restar(a, b) { return a - b; }
    function multiplicar(a, b) { return a * b; }
    function dividir(a, b) {
        if (b === 0) {
            Swal.fire({ title: 'Error', text: 'No se puede dividir por cero', icon: 'error' });
            return null;
        }
        return a / b;
    }
    function validarEntradas(a, b) {
        if (isNaN(a) || isNaN(b)) {
            Swal.fire({ title: 'Error', text: 'Por favor, ingresa números válidos', icon: 'error' });
            return false;
        }
        return true;
    }

    window.calcular = function() {
        var numero1 = parseFloat(num1.value);
        var numero2 = parseFloat(num2.value);

        if (!validarEntradas(numero1, numero2)) { return; }

        var resultados = [];
        resultados.push({ operacion: 'Suma', resultado: sumar(numero1, numero2) });
        resultados.push({ operacion: 'Resta', resultado: restar(numero1, numero2) });
        resultados.push({ operacion: 'Multiplicación', resultado: multiplicar(numero1, numero2) });
        resultados.push({ operacion: 'División', resultado: dividir(numero1, numero2) });

        var resultadoHTML = resultados.map(function(res) {
            return `<p>${res.operacion}: ${res.resultado !== null ? res.resultado : 'Error'}</p>`;
        }).join('');

        resultadoDiv.innerHTML = resultadoHTML;

        Swal.fire({ title: 'Resultados', html: resultadoHTML, icon: 'success' });
        console.lg("Resultados calculados: " + JSON.stringify(resultados));
    };
});
