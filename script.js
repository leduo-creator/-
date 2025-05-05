document.addEventListener('DOMContentLoaded', function() {
    // Get references to the input elements and result display
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    const thicknessInput = document.getElementById('thickness');
    const densityInput = document.getElementById('density'); // Assuming density is in lbs/cu ft
    const lengthUnitSelect = document.getElementById('length-unit');
    const widthUnitSelect = document.getElementById('width-unit');
    const thicknessUnitSelect = document.getElementById('thickness-unit');
    const calculateButton = document.getElementById('calculate-btn');
    const clearButton = document.getElementById('clear-btn');
    const resultElement = document.getElementById('result-tons');

    // Add event listeners to the buttons
    calculateButton.addEventListener('click', calculateAsphalt);
    clearButton.addEventListener('click', clearForm);

    // --- Calculation Logic ---
    function calculateAsphalt() {
        // Get values from inputs
        let length = parseFloat(lengthInput.value);
        let width = parseFloat(widthInput.value);
        let thickness = parseFloat(thicknessInput.value);
        let density = parseFloat(densityInput.value); // Density in lbs/cu ft

        // Get selected units
        const lengthUnit = lengthUnitSelect.value;
        const widthUnit = widthUnitSelect.value;
        const thicknessUnit = thicknessUnitSelect.value;

        // --- Input Validation ---
        if (isNaN(length) || isNaN(width) || isNaN(thickness) || isNaN(density) || length <= 0 || width <= 0 || thickness <= 0 || density <= 0) {
            resultElement.textContent = "Please enter valid positive numbers for all fields.";
            resultElement.style.color = '#e74c3c'; // Use red for error messages
            return; // Stop the function if inputs are invalid
        }

        // --- Unit Conversion to a Common Base (e.g., Feet) ---
        // Convert length to feet
        switch (lengthUnit) {
            case 'meters':
                length *= 3.28084; // 1 meter = 3.28084 feet
                break;
            case 'yards':
                length *= 3; // 1 yard = 3 feet
                break;
            // 'feet' is already in feet, no conversion needed
        }

        // Convert width to feet
        switch (widthUnit) {
            case 'meters':
                width *= 3.28084; // 1 meter = 3.28084 feet
                break;
            case 'yards':
                width *= 3; // 1 yard = 3 feet
                break;
            // 'feet' is already in feet, no conversion needed
        }

        // Convert thickness to feet
        switch (thicknessUnit) {
            case 'inches':
                thickness /= 12; // 1 foot = 12 inches
                break;
            case 'yards':
                thickness *= 3; // 1 yard = 3 feet
                break;
            case 'meters':
                 thickness *= 3.28084; // 1 meter = 3.28084 feet
                 break;
            case 'cm':
                 thickness *= 0.0328084; // 1 cm = 0.0328084 feet (1 cm = 0.01 meter, 0.01 * 3.28084)
                 break;
            // 'feet' is already in feet, no conversion needed
        }

        // --- Calculate Volume (in cubic feet) ---
        const volumeCubicFeet = length * width * thickness;

        // --- Calculate Weight (in pounds) ---
        // Weight = Volume (cu ft) * Density (lbs/cu ft)
        const weightLbs = volumeCubicFeet * density;

        // --- Convert Weight to Tons ---
        // 1 ton = 2000 lbs
        const weightTons = weightLbs / 2000;

        // --- Display Result ---
        // Format the result to two decimal places
        resultElement.textContent = weightTons.toFixed(2) + " Tons";
        resultElement.style.color = '#007aff'; // Use the primary blue color for results
        // Or use a success color like green: resultElement.style.color = '#28a745';
    }

    // --- Clear Form Logic ---
    function clearForm() {
        // Reset input values
        lengthInput.value = '';
        widthInput.value = '';
        thicknessInput.value = '';
        densityInput.value = '150'; // Reset density to default

        // Reset unit selections (optional, depends on desired behavior)
        lengthUnitSelect.value = 'feet';
        widthUnitSelect.value = 'feet';
        thicknessUnitSelect.value = 'inches';

        // Reset result display
        resultElement.textContent = "0.00 Tons";
        resultElement.style.color = '#007aff'; // Reset color to default result color
    }

    // Optional: Trigger calculation on Enter key press in input fields
    const inputs = document.querySelectorAll('.calculator-inputs input[type="number"], .calculator-inputs select');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if it were a form
                calculateAsphalt();
            }
        });
    });

});
