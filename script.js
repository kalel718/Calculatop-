// Get references to HTML elements we need to work with
const displayInput = document.querySelector(".display-input");    // Main input field
const displayResult = document.querySelector(".display-result");  // Result field
const buttons = document.querySelectorAll(".buttons button");     // All calculator buttons

// Variables to store our calculator's state
let input = "";    // What the user has typed (like "2+3")
let result = "";   // The calculated answer (like "5")

// Main function that handles what happens when any button is clicked
function calculate(btnValue) {

  // If user clicks "AC" (All Clear) - reset everything
  if (btnValue === "AC") {
    input = "";      // Clear the input
    result = "";     // Clear the result

  // If user clicks "=" - calculate the answer
  } else if (btnValue === "=") {
    try {
      // Replace our display symbols with JavaScript-friendly operators
      let expression = input.replace(/×/g, "*").replace(/÷/g, "/");
      // Use eval() to calculate the math expression
      result = eval(expression);
    } catch {
      // If calculation fails (like dividing by zero), show error
      result = "Error";
    }

  // If user clicks backspace - remove last character
  } else if (btnValue === "backspace") {
    input = input.slice(0, -1);  // Remove last character from input

  // If user clicks parentheses button - smart parentheses handling
  } else if (btnValue === "( )") {
    // Count how many open vs closed parentheses we have
    if (input.split("(").length > input.split(")").length) {
      input += ")";    // More opens than closes, so add closing
    } else {
      input += "(";    // Add opening parenthesis
    }

  // For any other button (numbers, operators) - just add to input
  } else {
    input += btnValue;
  }

  // Update the display with current input and result
  displayInput.value = input;    // Show what user typed
  displayResult.value = result;  // Show the calculated result
}

// Add click event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Get the text content of the clicked button
    let value = e.target.textContent.trim();

    // Special case: if it's the backspace button, use "backspace" as value
    if (button.classList.contains("backspace")) {
      value = "backspace";
    }

    // Call our calculate function with the button's value
    calculate(value);
  });
});
