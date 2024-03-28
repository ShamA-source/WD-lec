document.addEventListener("DOMContentLoaded", function() {
    // Get all quantity input fields
    var quantityInputs = document.querySelectorAll(".quantity");

    // Attach event listeners to each quantity input field
    quantityInputs.forEach(function(input) {
      input.addEventListener("change", function() {
        // Get the quantity and price data attributes
        var quantity = parseInt(this.value);
        var price = parseFloat(this.dataset.price);

        // Calculate subtotal
        var subtotal = quantity * price;

        // Update the subtotal in the corresponding table cell
        var subtotalCell = this.parentElement.nextElementSibling;
        subtotalCell.textContent = subtotal.toFixed(2) + " QR";
      });
    });
    var quantityInputs = document.querySelectorAll(".quantity");

  // Attach event listeners to each quantity input field
  quantityInputs.forEach(function(input) {
    input.addEventListener("change", updateSubtotal);
  });

  // Initial update of subtotal
  updateSubtotal();
});
function updateSubtotal() {
    var subtotalElements = document.querySelectorAll('.cart .subtotal'); // Select only within the cart section
    var cartSubtotal = 0;
  
    // Loop through each subtotal element and add its value to cartSubtotal
    subtotalElements.forEach(function(subtotalElement) {
      var subtotalText = subtotalElement.textContent.trim();
      var subtotalValue = parseFloat(subtotalText.split(" ")[0]); // Extract numerical value
      if (!isNaN(subtotalValue)) { // Check if it's a valid number
        cartSubtotal += subtotalValue;
      }
    });
  
    // Update cart subtotal and total
    var cartSubtotalCell = document.getElementById('cartSubtotal');
    cartSubtotalCell.textContent = cartSubtotal.toFixed(2) + " QR";
  
    var totalCell = document.getElementById('total');
    totalCell.textContent = cartSubtotal.toFixed(2) + " QR";
}
