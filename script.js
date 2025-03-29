if (window.location.href.endsWith('workspace.html')) {
    const csr = document.getElementById('csr');
    csr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('ncsr').value);
        let r = parseInt(document.getElementById('rcsr').value);
        let resultado = combinacion_sin_repeticion(n, r);
        localStorage.setItem('resultado', `N° de combinaciones sin repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}<br>r = ${r}`);
        localStorage.setItem('imagen', 'assets/csr.png');
        window.location.href = 'results.html';
    });

    const ccr = document.getElementById('ccr');
    ccr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('nccr').value);
        let r = parseInt(document.getElementById('rccr').value);
        let resultado = combinacion_con_repeticion(n, r);
        localStorage.setItem('resultado', `N° de combinaciones con repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}<br>r = ${r}`);
        localStorage.setItem('imagen', 'assets/ccr.png');
        window.location.href = 'results.html';
    });

    const vsr = document.getElementById('vsr');
    vsr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('nvsr').value);
        let r = parseInt(document.getElementById('rvsr').value);
        let resultado = variacion_sin_repeticion(n, r);
        localStorage.setItem('resultado', `N° de variaciones sin repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}<br>r = ${r}`);
        localStorage.setItem('imagen', 'assets/vsr.png');
        window.location.href = 'results.html';
    });

    const vcr = document.getElementById('vcr');
    vcr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('nvcr').value);
        let r = parseInt(document.getElementById('rvcr').value);
        let resultado = variacion_con_repeticion(n, r);
        localStorage.setItem('resultado', `N° de variaciones con repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}<br>r = ${r}`);
        localStorage.setItem('imagen', 'assets/vcr.png');
        window.location.href = 'results.html';
    });

    const psr = document.getElementById('psr');
    psr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('npsr').value);
        let resultado = permutacion_sin_repeticion(n);
        localStorage.setItem('resultado', `N° de permutaciones sin repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}`);
        localStorage.setItem('imagen', 'assets/psr.png');
        window.location.href = 'results.html';
    });

    const pcr = document.getElementById('pcr');
    pcr.addEventListener('click', (event) => {
        event.preventDefault();
        let n = parseInt(document.getElementById('npcr').value);
        let repeticionesElementos = document.querySelectorAll('#repeticiones_elementos input[type="number"]');
        let repeticiones = Array.from(repeticionesElementos).map(input => parseInt(input.value));
        // Sumar los elementos del array de repeticiones
        let sumatoria = repeticiones.reduce((acc, curr) => acc + curr, 0);
        // Validar que la suma de las repeticiones no sea mayor que el total de elementos
        if (sumatoria > n) {
            alert('La suma de las repeticiones no puede ser mayor que el total de elementos.');
            return;
        }
        let resultado = permutacion_con_repeticion(n, repeticiones);
        localStorage.setItem('resultado', `N° de permutaciones con repetición: ${resultado}`);
        localStorage.setItem('data', `n = ${n}<br>Repeticiones: ${repeticiones.join(', ')}`);
        localStorage.setItem('imagen', 'assets/pcr.png');
        window.location.href = 'results.html';
    });
}

if (window.location.href.endsWith('results.html')) {
    document.addEventListener('DOMContentLoaded', (event) => {
        const results = document.getElementById('results');
        const data = localStorage.getItem('data');
        const resultado = localStorage.getItem('resultado');
        const imagen = localStorage.getItem('imagen');
        const imageElement = document.createElement('img');
        imageElement.src = imagen;
        const dataElement = document.createElement('p');
        dataElement.innerHTML = data;
        const resultElement = document.createElement('h3');
        resultElement.textContent = resultado;
        const backButton = document.createElement('button');
        backButton.textContent = 'Volver a inicio';
        backButton.addEventListener('click', () => {
            window.location.href = 'workspace.html';
        });
        results.appendChild(imageElement);
        results.appendChild(dataElement);
        results.appendChild(resultElement);
        results.appendChild(backButton);
    });
}

function combinacion_sin_repeticion(m, n) {
    let c = factorial(m) / (factorial(n) * factorial(m - n));
    return c;
}

function combinacion_con_repeticion(m, n) {
    let cr = factorial(m + n - 1) / (factorial(n) * factorial(m - 1));
    return cr;
}

function variacion_sin_repeticion(m, n) {
    let v = factorial(m) / factorial(m - n);
    return v;
}

function variacion_con_repeticion(m, n) {
    let vr = m**n;
    return vr;
}

function permutacion_sin_repeticion(m) {
    let p = factorial(m);
    return p;
}

function permutacion_con_repeticion(m, repeticiones_elementos) {
    let pr = factorial(m);
    for (let i of repeticiones_elementos) {
        pr /= factorial(i);
    }
    return pr;
}

function factorial(n) {
    if (n < 0) {
        throw new Error("El factorial no está definido para números negativos.");
    }
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}