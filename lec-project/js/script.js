document.addEventListener("DOMContentLoaded", function() {
  // Helper function to parse the price from a string
  function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
  }

  // Function to update the subtotal for a product
  function updateProductSubtotal(input) {
    var quantity = parseInt(input.value) || 0; // Safely parse the quantity, defaulting to 0 if not a number
    var price = parsePrice(input.dataset.price); // Use the helper function to parse price
    var subtotal = quantity * price;
    var subtotalCell = input.closest('tr').querySelector('.subtotal');
    subtotalCell.textContent = subtotal.toFixed(2) + " QR";
    updateCartTotal(); // Update the cart total whenever the subtotal is updated
  }

  // Function to update the cart subtotal and total
  function updateCartTotal() {
    var subtotalElements = document.querySelectorAll('.cart .subtotal');
    var cartSubtotal = 0;

    subtotalElements.forEach(function(subtotalElement) {
      cartSubtotal += parsePrice(subtotalElement.textContent);
    });

    document.querySelector('#cartSubtotal').textContent = cartSubtotal.toFixed(2) + " QR";
    document.querySelector('#total').textContent = cartSubtotal.toFixed(2) + " QR";
  }

  // Set up the quantity change event listeners
  document.querySelectorAll(".quantity").forEach(function(input) {
    input.addEventListener("change", function() {
      updateProductSubtotal(input); // Update the subtotal when the quantity changes
    });
  });

  // Proceed to checkout button
  document.getElementById('proceedBtn').addEventListener('click', function () {
      const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
      if (!selectedPaymentMethod) {
          alert('Please select a payment method.');
          return;
      }
      
      // Simulate bank amount check for card payment
      if (selectedPaymentMethod.value === 'CARD') {
        const total = parsePrice(document.querySelector('#total').textContent);
          const hasEnoughInBank = checkBalance(total)
          if (hasEnoughInBank) {
              window.location.href = 'shipping.html';
          } else {
              alert('Insufficient funds in the bank.');
          }
      } else if (selectedPaymentMethod.value === 'COD') {
          window.location.href = 'shipping.html';
      }
  });

  // Check if a payment method is selected in the shipping page
  const shippingForm = document.getElementById('shippingForm');
  if (shippingForm) {
      shippingForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const paymentMethod = document.querySelector('input[name="payment"]:checked');
          if (!paymentMethod) {
              alert('Please select a payment method.');
              return false;
          }

          // Proceed based on payment method
          if (paymentMethod.value === 'CARD') {
              // Simulated bank check
              alert('Proceeding with card payment.');
              // Here you would implement the card payment logic
          } else {
              window.location.href = 'lastpage.html';
          }
      });
  }
});

function checkBalance(amount){
  const user={
    name: 'Samia',
    balance: 1000
  }
  if(user.balance>amount)
    return true;
  else{
    return false;
  }
}