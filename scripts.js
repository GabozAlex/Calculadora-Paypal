const COMISION_PORCENTAJE = 0.054; // 5.4%
const COMISION_FIJA = 0.30; // $0.30 USD

/**
 * Calcula la cantidad que se debe enviar para que el receptor obtenga un monto específico,
 * considerando la comisión de PayPal. Se llama instantáneamente al escribir en el input.
 */
function calcularRecibir() {
    const cantidadInput = document.getElementById('recibir-cantidad');
    const cantidadRecibir = parseFloat(cantidadInput.value);
    
    // Limpia los campos si el input está vacío o no es un número válido
    if (isNaN(cantidadRecibir) || cantidadRecibir <= 0) {
        document.getElementById('recibir-comision').value = '';
        document.getElementById('recibir-enviar').value = '';
        return;
    }

    /* Fórmula Inversa: Enviado = (Recibido + Fija) / (1 - Tasa) */
    const cantidadEnviar = (cantidadRecibir + COMISION_FIJA) / (1 - COMISION_PORCENTAJE);
    
    // La comisión es la diferencia entre lo enviado y lo que se desea recibir
    const comisionCalculada = cantidadEnviar - cantidadRecibir;

    document.getElementById('recibir-comision').value = comisionCalculada.toFixed(2);
    document.getElementById('recibir-enviar').value = cantidadEnviar.toFixed(2);
}


/**
 * Calcula la cantidad que el receptor obtendrá si se envía un monto específico,
 * considerando la comisión de PayPal. Se llama instantáneamente al escribir en el input.
 */
function calcularEnviar() {
    const cantidadInput = document.getElementById('enviar-cantidad');
    const cantidadEnviar = parseFloat(cantidadInput.value);

    // Limpia los campos si el input está vacío o no es un número válido
    if (isNaN(cantidadEnviar) || cantidadEnviar <= 0) {
        document.getElementById('enviar-comision').value = '';
        document.getElementById('enviar-reciben').value = '';
        return;
    }

    // Fórmula de Comisión de PayPal: (Monto * 5.4%) + $0.30
    const comisionCalculada = (cantidadEnviar * COMISION_PORCENTAJE) + COMISION_FIJA;
    const cantidadRecibir = cantidadEnviar - comisionCalculada;

    // Asegura que no se muestren valores negativos si el monto es menor a la comisión fija
    if (cantidadRecibir < 0) {
        document.getElementById('enviar-comision').value = 'Error';
        document.getElementById('enviar-reciben').value = '0.00';
    } else {
        document.getElementById('enviar-comision').value = comisionCalculada.toFixed(2);
        document.getElementById('enviar-reciben').value = cantidadRecibir.toFixed(2);
    }
}
// NOTA: No necesitamos el evento DOMContentLoaded ni listeners de submit, 
// ya que el HTML llama directamente a estas funciones al escribir.