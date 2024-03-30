// async function getProducts() {
//     const filePath = 'case1/items.json'; 
//     try {
//       const response = await fetch(filePath);
//       if (!response.ok) {
//         throw new Error(`Error fetching products: ${response.status}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error; // Re-throw for handling in calling code
//     }
//   }

//   getProducts()
//   .then(fetchedProducts => {
//     const products = fetchedProducts; 
//     console.log("Products:", products);
//     // Now i can use the 'products' constant for further processing
//   })
//   .catch(error => {
//     console.error("Error fetching products:", error);
//   });

  
// const categories =[ ...new Set(products.map((item)=>{return item}))]

// document.getElementById('searchBar').addEventListener('keyup', (e)=>{
//     const searchData = e.target.value.toLowerCase();
//     const filterData = categories.filter((item)=>{
//         return(
//             item.title.toLowerCase().includes(searchData)
//         )
//     })
//     displayItem(filterData)
// });

// const displayItem= (item)=>{
//     document.getElementById('root').innerHTML=items.map((item)=>{
//         var {image, title, price} = item;

//         return(
//             `<div class='box'>
//                 <div class='img-box'>
//                     <img class='images' src="${image}"></img>
//                 </div>

//                 <div class='buttom'>
//                     <p>${title}</p>
//                     <h2>${price}.00</h2>
//                     <button>Add to cart</button>
//                 </div>

//             </div>`
//         )

//     }).join('');
// };
// displayItem(categories);



// async function getProducts() {
//     const filePath = 'case1/items.json'; // Replace with the correct path
//     try {
//       const response = await fetch(filePath);
//       if (!response.ok) {
//         throw new Error(`Error fetching products: ${response.status}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error; // Re-throw for handling in calling code
//     }
//   }
  
//   getProducts()
//     .then(fetchedProducts => {
//       const products = fetchedProducts;
//       displayItem(products); // Call displayItem after products are fetched
//     })
//     .catch(error => {
//       console.error("Error fetching products:", error);
//     });
  
//   const displayItem = (products) => {
//     const filteredCategories = [...new Set(products.map(item => item.title.toLowerCase()))]; // Extract unique titles (case-insensitive)
  
//     document.getElementById('searchBar').addEventListener('keyup', (e) => {
//       const searchData = e.target.value.toLowerCase();
//       const filterData = products.filter(item => item.title.toLowerCase().includes(searchData));
//       displayItem(filterData); // Update display with filtered products
//     });
  
//     const productHTML = products.map(item => {
//       const { image, title, price } = item;
//       return `
//         <div class='box'>
//           <div class='img-box'>
//             <img class='images' src="${image}" alt="${title}"></img>
//           </div>
//           <div class='buttom'>
//             <p>${title}</p>
//             <h2>$${price}.00</h2>
//             <button>Add to cart</button>
//           </div>
//         </div>
//       `;
//     }).join('');
  
//     document.getElementById('root').innerHTML = productHTML;
//   };
  

async function getProducts() {
    const filePath = 'case1/items.json'; // Replace with the correct path
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Re-throw for handling in calling code
    }
  }
  
  getProducts()
    .then(fetchedProducts => {
      const products = fetchedProducts;
      displayItem(products); // Call displayItem after products are fetched
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
  
  const displayItem = (products) => {
    const searchBar = document.getElementById('searchBar');
    const root = document.getElementById('root');
  
    // const updateDisplay = (filteredData) => {
    //   const productHTML = filteredData.map(item => {
    //     const { image, title, price } = item;
    //     return `
    //       <div class='box'>
    //         <div class='img-box'>
    //           <img class='images' src="${image}" alt="${title}"></img>
    //         </div>
    //         <div class='buttom'>
    //           <p>${title}</p>
    //           <h2>$${price}.00</h2>
    //           <button>Add to cart</button>
    //         </div>
    //       </div>
    //     `;
    //   }).join('');
  
    //   root.innerHTML = productHTML;
    // };

    const updateDisplay = (filteredData) => {
        const productHTML = filteredData.map(item => `
            <div class="pro-container">
                <article class="pro">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="des">
                        <span>${item.category}</span>
                        <h5>${item.title}</h5>
                        <div class="star">
                            ${generateStarIcons(item.rating)}
                        </div>
                        <h4>${item.price}</h4>
                    </div>
                    <a href="cart.html"><i class="fa-solid fa-basket-shopping cart"></i></a>
                </article>
            </div>
        `).join('');
        document.getElementById('root').innerHTML = productHTML;
    };
    
    // Function to generate star icons based on rating
    const generateStarIcons = (rating) => {
        let starsHTML = '';
        for (let i = 0; i < rating; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        return starsHTML;
    };
  
    searchBar.addEventListener('keyup', (e) => {
      const searchData = e.target.value.toLowerCase();
      const filterData = products.filter(item => item.title.toLowerCase().includes(searchData));
      updateDisplay(filterData); // Update display with filtered products
    });
  
    // Initial display
    updateDisplay(products);
  };
  