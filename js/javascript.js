document.addEventListener('DOMContentLoaded', function() {
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var resultadoDiv = document.getElementById('resultado');

    // Precargar datos en los campos
    num1.value = 0;
    num2.value = 0;

    // Declarar una función para calcular la suma
    function sumar(a, b) {
        return a + b;
    }

    // Función para manejar el evento de cálculo
    window.calcular = function() {
        var numero1 = parseFloat(num1.value);
        var numero2 = parseFloat(num2.value);

        // Usar la función sumar
        var resultado = sumar(numero1, numero2);

        // Mostrar resultado en el HTML y con SweetAlert2
        resultadoDiv.innerText = "Resultado: " + resultado;
        Swal.fire({
            title: 'Resultado',
            text: 'El resultado de la suma es: ' + resultado,
            icon: 'success'
        });

        // Pequeño error para el nivel principiante
        console.lg("El resultado es " + resultado);
    };
});
