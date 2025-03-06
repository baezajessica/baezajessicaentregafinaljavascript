document.addEventListener('DOMContentLoaded', function() {
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var resultadoDiv = document.getElementById('resultado');
    var historialDiv = document.getElementById('historial');
    var themeButton = document.getElementById('themeButton');
    var historial = JSON.parse(localStorage.getItem('historial')) || [];

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
    function agregarAlHistorial(operacion, resultado) {
        var operacionHistorial = {
            operacion: operacion,
            resultado: resultado !== null ? resultado : 'Error',
            fecha: new Date().toLocaleString()
        };
        historial.push(operacionHistorial);
        localStorage.setItem('historial', JSON.stringify(historial));
        var p = document.createElement('p');
        p.textContent = `${operacion}: ${resultado !== null ? resultado : 'Error'} (${operacionHistorial.fecha})`;
        historialDiv.appendChild(p);
    }

    function mostrarHistorial() {
        historialDiv.innerHTML = ''; 
        historial.forEach(item => {
            var p = document.createElement('p');
            p.textContent = `${item.operacion}: ${item.resultado} (${item.fecha})`;
            historialDiv.appendChild(p);
        });
    }
    mostrarHistorial();

    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    window.calcular = function(operacion) {
        var numero1 = parseFloat(num1.value);
        var numero2 = parseFloat(num2.value);

        if (!validarEntradas(numero1, numero2)) { return; }

        var resultado = null;
        if (operacion === 'sumar') {
            resultado = sumar(numero1, numero2);
        } else if (operacion === 'restar') {
            resultado = restar(numero1, numero2);
        } else if (operacion === 'multiplicar') {
            resultado = multiplicar(numero1, numero2);
        } else if (operacion === 'dividir') {
            resultado = dividir(numero1, numero2);
        }

        agregarAlHistorial(operacion.charAt(0).toUpperCase() + operacion.slice(1), resultado);
        resultadoDiv.innerHTML = `<p>${operacion.charAt(0).toUpperCase() + operacion.slice(1)}: ${resultado !== null ? resultado : 'Error'}</p>`;

        Swal.fire({
            title: 'Resultado',
            text: `${operacion.charAt(0).toUpperCase() + operacion.slice(1)}: ${resultado !== null ? resultado : 'Error'}`,
            icon: 'success'
        });   
        console.log("Resultado calculado: " + operacion + " = " + resultado);
    };
    fetch('https://api.aws.com/simple-calculator')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
});