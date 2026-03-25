let intervalId = null;

function getInput(button) {
    const wrapper = button.closest('.number-wrapper');
    return wrapper?.querySelector('#cost');
}

function initializeIfEmpty(input, direction) {
    if (input.value === '') {
        const min = input.min !== '' ? parseFloat(input.min) : INT4_MIN;
        input.value = min;
    }
}

function step(input, direction) {
    const max = input.max !== '' ? parseFloat(input.max) : INT4_MAX;
    const min = input.min !== '' ? parseFloat(input.min) : INT4_MIN;
    const stepValue = input.step ? parseFloat(input.step) : 1;

    let current = input.value === '' ? null : parseFloat(input.value);

    if (current === null) return;

    let next = direction === 'up'
        ? current + stepValue
        : current - stepValue;

    // clamp
    if (next > max) next = max;
    if (next < min) next = min;

    input.value = next;
}

function startStepping(button, direction) {
    const input = getInput(button);
    if (!input) return;

    stopStepping();

    initializeIfEmpty(input, direction);
    step(input, direction);

    intervalId = setInterval(() => {
        step(input, direction);
    }, 100);
}

function stopStepping() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// desktop
document.addEventListener('mousedown', (e) => {
    const incBtn = e.target.closest('.btn-increment');
    const decBtn = e.target.closest('.btn-decrement');

    if (incBtn) startStepping(incBtn, 'up');
    if (decBtn) startStepping(decBtn, 'down');
});

document.addEventListener('mouseup', stopStepping);
document.addEventListener('mouseleave', stopStepping);

// mobile
document.addEventListener('touchstart', (e) => {
    const incBtn = e.target.closest('.btn-increment');
    const decBtn = e.target.closest('.btn-decrement');

    if (incBtn || decBtn) e.preventDefault();

    if (incBtn) startStepping(incBtn, 'up');
    if (decBtn) startStepping(decBtn, 'down');
}, { passive: false });

document.addEventListener('touchend', stopStepping);

// submit: só envia se tiver valor
document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form.matches('.advanced-form')) return;

    const cost = form.querySelector('#cost');
    const costOp = form.querySelector('#cost_op');

    if (!cost || cost.value === '') {
        if (cost) cost.disabled = true;
        if (costOp) costOp.disabled = true;
    }
});

const INT4_MAX = 2147483647;
const INT4_MIN = 0; // ajuste se quiser permitir negativo

// bloqueia teclas inválidas
document.addEventListener('keydown', (e) => {
    const input = e.target;

    if (!input.matches('#cost')) return;

    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'
    ];

    if (allowedKeys.includes(e.key)) return;

    // permite apenas dígitos
    if (!/^\d$/.test(e.key)) {
        e.preventDefault();
    }
});

// sanitiza valor colado ou digitado
document.addEventListener('input', (e) => {
    const input = e.target;

    if (!input.matches('#cost')) return;

    let value = input.value;

    // remove tudo que não for número
    value = value.replace(/\D/g, '');

    if (value === '') {
        input.value = '';
        return;
    }

    value = Number(value);

    // clamp
    if (value > INT4_MAX) value = INT4_MAX;
    if (value < INT4_MIN) value = INT4_MIN;

    input.value = value;
});