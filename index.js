// Select elements
const newtonRaphsonBtn = document.getElementById('newtonRaphsonBtn');
const eulerBtn = document.getElementById('eulerBtn');
const rungeKuttaBtn = document.getElementById('rungeKuttaBtn');
const solveBtn = document.getElementById('solveBtn');
const equationInput = document.getElementById('equation');
const initialValueInput = document.getElementById('initialValue');
const stepSizeInput = document.getElementById('stepSize');
const outputDiv = document.getElementById('output');
let method = 'newtonRaphson'; // Default method

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Method selection
newtonRaphsonBtn.addEventListener('click', () => {
    method = 'newtonRaphson';
    displayMessage('Newton-Raphson method selected.');
});
eulerBtn.addEventListener('click', () => {
    method = 'euler';
    displayMessage('Euler\'s method selected.');
});
rungeKuttaBtn.addEventListener('click', () => {
    method = 'rungeKutta';
    displayMessage('Runge-Kutta method selected.');
});

// Display message in output div
function displayMessage(message) {
    outputDiv.innerHTML = `<p>${message}</p>`;
}

// Solve the equation based on selected method
solveBtn.addEventListener('click', () => {
    const equation = equationInput.value;
    const initialValue = parseFloat(initialValueInput.value);
    const stepSize = parseFloat(stepSizeInput.value);

    if (!equation || isNaN(initialValue)) {
        displayMessage('Please enter valid equation and initial value.');
        return;
    }

    let result;
    switch (method) {
        case 'newtonRaphson':
            result = newtonRaphson(equation, initialValue);
            break;
        case 'euler':
            result = eulerMethod(equation, initialValue, stepSize);
            break;
        case 'rungeKutta':
            result = rungeKuttaMethod(equation, initialValue, stepSize);
            break;
        default:
            result = 'Please select a method.';
    }
    outputDiv.innerHTML = result;
});

// Newton-Raphson Method with detailed steps
function newtonRaphson(eq, x0, maxIter = 10, tol = 1e-6) {
    let x = x0;
    let detailedSteps = `<strong>Newton-Raphson Method Steps:</strong><br>`;

    for (let i = 0; i < maxIter; i++) {
        let fVal = evaluateFunction(eq, x);
        let fPrimeVal = derivative(eq, x);

        detailedSteps += `Iteration ${i + 1}:<br>`;
        detailedSteps += `&nbsp;&nbsp;Current x: ${x.toFixed(6)}<br>`;
        detailedSteps += `&nbsp;&nbsp;f(x) = ${fVal.toFixed(6)}<br>`;
        detailedSteps += `&nbsp;&nbsp;f'(x) = ${fPrimeVal.toFixed(6)}<br>`;

        if (Math.abs(fVal) < tol) {
            detailedSteps += `&nbsp;&nbsp;Root found at x = ${x.toFixed(6)}<br>`;
            return detailedSteps;
        }

        let newX = x - fVal / fPrimeVal;
        detailedSteps += `&nbsp;&nbsp;New x = x - f(x)/f'(x) = ${newX.toFixed(6)}<br><br>`;
        x = newX;
    }

    detailedSteps += `Approximate root after ${maxIter} iterations: ${x}`;
    return detailedSteps;
}

// Euler's Method with detailed steps
function eulerMethod(eq, x0, h = 0.1, steps = 10) {
    let x = x0;
    let y = evaluateFunction(eq, x);
    let detailedSteps = `<strong>Euler's Method Steps:</strong><br>`;
    detailedSteps += `Initial value: y(${x.toFixed(2)}) = ${y.toFixed(6)}<br><br>`;

    for (let i = 1; i <= steps; i++) {
        let slope = evaluateFunction(eq, x);
        detailedSteps += `Step ${i}:<br>`;
        detailedSteps += `&nbsp;&nbsp;Slope at x = ${x.toFixed(2)} is f(${x.toFixed(2)}) = ${slope.toFixed(6)}<br>`;
        y = y + h * slope;
        x = x + h;
        detailedSteps += `&nbsp;&nbsp;y(${x.toFixed(2)}) = y + h*f(x) = ${y.toFixed(6)}<br><br>`;
    }

    return detailedSteps;
}

// Runge-Kutta Method (4th order) with detailed steps
function rungeKuttaMethod(eq, x0, h = 0.1, steps = 10) {
    let x = x0;
    let y = evaluateFunction(eq, x);
    let detailedSteps = `<strong>Runge-Kutta 4th Order Method Steps:</strong><br>`;
    detailedSteps += `Initial value: y(${x.toFixed(2)}) = ${y.toFixed(6)}<br><br>`;

    for (let i = 1; i <= steps; i++) {
        let k1 = h * evaluateFunction(eq, x);
        let k2 = h * evaluateFunction(eq, x + 0.5 * h);
        let k3 = h * evaluateFunction(eq, x + 0.5 * h);
        let k4 = h * evaluateFunction(eq, x + h);

        detailedSteps += `Step ${i}:<br>`;
        detailedSteps += `&nbsp;&nbsp;k1 = h*f(x) = ${k1.toFixed(6)}<br>`;
        detailedSteps += `&nbsp;&nbsp;k2 = h*f(x + 0.5*h) = ${k2.toFixed(6)}<br>`;
        detailedSteps += `&nbsp;&nbsp;k3 = h*f(x + 0.5*h) = ${k3.toFixed(6)}<br>`;
        detailedSteps += `&nbsp;&nbsp;k4 = h*f(x + h) = ${k4.toFixed(6)}<br>`;

        y = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        x = x + h;

        detailedSteps += `&nbsp;&nbsp;y(${x.toFixed(2)}) = ${y.toFixed(6)}<br><br>`;
    }

    return detailedSteps;
}

// Helper: Evaluate function value
function evaluateFunction(eq, x) {
    try {
        return math.evaluate(eq.replace(/x/g, x));
    } catch (e) {
        return NaN;
    }
}

// Helper: Derivative using central difference approximation
function derivative(eq, x, h = 1e-5) {
    const f1 = evaluateFunction(eq, x + h);
    const f2 = evaluateFunction(eq, x - h);
    return (f1 - f2) / (2 * h);
}
