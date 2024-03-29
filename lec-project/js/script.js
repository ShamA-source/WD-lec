document.addEventListener("DOMContentLoaded", function() {
 
  
  function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.]/g, '')) || 0;
  }

  function updateProductSubtotal(input) {
    var quantity = parseInt(input.value) || 0; 
    var price = parsePrice(input.dataset.price); 
    var subtotal = quantity * price;
    var subtotalCell = input.closest('tr').querySelector('.subtotal');
    subtotalCell.textContent = subtotal.toFixed(2) + " QR";
    updateCartTotal(); 
  }

  function updateCartTotal() {
    var subtotalElements = document.querySelectorAll('.cart .subtotal');
    var cartSubtotal = 0;

    subtotalElements.forEach(function(subtotalElement) {
      cartSubtotal += parsePrice(subtotalElement.textContent);
    });

    document.querySelector('#cartSubtotal').textContent = cartSubtotal.toFixed(2) + " QR";
    document.querySelector('#total').textContent = cartSubtotal.toFixed(2) + " QR";
  }

 
  document.querySelectorAll(".quantity").forEach(function(input) {
    input.addEventListener("change", function() {
      updateProductSubtotal(input); 
    });
  });

  document.getElementById('proceedBtn').addEventListener('click', function () {
      const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
      if (!selectedPaymentMethod) {
          alert('Please select a payment method.');
          return;
      }
      
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

  const shippingForm = document.querySelector('#shippingForm');
  if (shippingForm) {
      shippingForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const paymentMethod = document.querySelector('input[name="payment"]:checked');
          if (!paymentMethod) {
              alert('Please select a payment method.');
              return false;
          }

          if (paymentMethod.value === 'CARD') {
              alert('Proceeding with card payment.');
          } else {
              window.location.href = 'lastpage.html';
          }
      });
  }
});

function checkBalance(amount) {

  const loggedInUserJson = sessionStorage.getItem('loggedInUser');
  if (!loggedInUserJson) {
    console.error('No user is currently logged in.');
    return false;
  }

  const loggedInUser = JSON.parse(loggedInUserJson);
  const userBalance = parseFloat(loggedInUser.money_balance); 

  console.log(`Checking balance. User balance: ${userBalance}, Required amount: ${amount}`);

  
  if (userBalance >= amount) {
    console.log("Sufficient funds");
    return true;
  } else {
    console.log("Insufficient funds.");
    return false;
  }
}


