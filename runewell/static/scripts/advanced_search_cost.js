let intervalId = null;

function getInput(button) {
    const wrapper = button.closest('.number-wrapper');
    return wrapper?.querySelector('input[type="number"]');
}

function initializeIfEmpty(input, direction) {
    if (input.value === '') {
        const min = input.min !== '' ? parseFloat(input.min) : 0;
        const step = input.step ? parseFloat(input.step) : 1;

        if (direction === 'up') {
            input.value = min;
        } else {
            // para decremento, começa do min também (não negativo)
            input.value = min;
        }
    }
}

function step(input, direction) {
    if (direction === 'up') {
        input.stepUp();
    } else {
        const min = input.min !== '' ? parseFloat(input.min) : null;
        const stepValue = input.step ? parseFloat(input.step) : 1;
        const current = parseFloat(input.value);
        const next = current - stepValue;

        if (min === null || next >= min) {
            input.stepDown();
        }
    }
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