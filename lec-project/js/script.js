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
    const cartItems = []; 

    subtotalElements.forEach(function(subtotalElement) {
      cartSubtotal += parsePrice(subtotalElement.textContent);
      const itemRow = subtotalElement.closest('tr');
        const quantityInput = itemRow.querySelector('.quantity');
        const productName = itemRow.cells[2].textContent;
        const productPrice = parsePrice(itemRow.cells[3].textContent);

        cartItems.push({
            name: productName,
            price: productPrice,
            quantity: parseInt(quantityInput.value, 10),
            subtotal: parsePrice(subtotalElement.textContent)
        });
    });

    document.querySelector('#cartSubtotal').textContent = cartSubtotal.toFixed(2) + " QR";
    document.querySelector('#total').textContent = cartSubtotal.toFixed(2) + " QR";
    const purchaseDetails = {
      items: cartItems,
      total: cartSubtotal.toFixed(2) + " QR"
  };
  sessionStorage.setItem('purchaseDetails', JSON.stringify(purchaseDetails));
  }

 
  document.querySelectorAll(".quantity").forEach(function(input) {
    input.addEventListener("change", function() {
      updateProductSubtotal(input); 
    });
  });

  document.querySelector('#proceedBtn').addEventListener('click', function () {
    const loggedInUserJson = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserJson) {
        alert('You must be logged in to make a purchase.');
        return; 
    }
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
      shippingForm.addEventListener('submit', handleFormSubmit) 
      function handleFormSubmit(e){
        window.location.href = 'lastpage.html';
      };
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


//purchase History
document.querySelector('#shippingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const shippingDetails = {
    name: document.querySelector('#name').value,
    surname: document.querySelector('#Surname').value,
    state: document.querySelector('#State').value,
    houseNumber: document.querySelector('input[name="House number"]').value,
    streetNumber: document.querySelector('input[name="Street number"]').value
  };

  const purchaseDetails = JSON.parse(sessionStorage.getItem('purchaseDetails')) || {};
    const purchaseDate = new Date().toLocaleDateString("en-US");

    const purchaseHistory = {
        date: purchaseDate,
        items: purchaseDetails.items, 
        total: purchaseDetails.total,
        shipping: shippingDetails
    };

    let purchaseHistories = JSON.parse(localStorage.getItem('purchaseHistories')) || [];
    purchaseHistories.push(purchaseHistory);
    localStorage.setItem('purchaseHistories', JSON.stringify(purchaseHistories));

    window.location.href = 'lastpage.html';
});

function displayPurchaseHistory() {
  const purchaseHistories = JSON.parse(localStorage.getItem('purchaseHistories')) || [];
  const historyContainer = document.querySelector('.purchaseHistory'); 

  if (!historyContainer) {
    console.error("Couldn't find the container to display purchase history.");
    return;
  }
  historyContainer.innerHTML = '';
  const nonEmptyHistories = purchaseHistories.filter(history => history.items && history.items.length);

  nonEmptyHistories.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestTwoHistories = nonEmptyHistories.slice(0, 2);

  latestTwoHistories.forEach(history => {
    const purchaseDateElement = document.createElement('p');
    purchaseDateElement.textContent = `Purchase Date: ${formatDate(history.date)}`;
    historyContainer.appendChild(purchaseDateElement);

    const itemsElement = document.createElement('ul');
    history.items.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.textContent = `Item Name: ${item.name} - Quantity: ${item.quantity}`;
      itemsElement.appendChild(itemElement);
    });
    historyContainer.appendChild(itemsElement);

    const separator = document.createElement('hr');
    historyContainer.appendChild(separator);
  });
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}



