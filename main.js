const form = document.getElementById("form");
const baseUrl = "https://crudcrud.com/api/5d6fd41157224d2e8a6357a6885b25f1";
// const baseUrl =
//   "https://cors-anywhere.herokuapp.com/https://crudcrud.com/api/826dbbc86c43420d9440e9784f525ece";

// Function to fetch and display products from the API
async function fetchAndDisplayProducts() {
  try {
    const categories = ["Electronics", "Food Items", "Skinkare Items"];
    let cat;
    for (const category of categories) {
      if (category === "Electronics") {
        cat = "electronics";
      } else if (category === "Food Items") {
        cat = "food_items";
      } else if (category === "Skinkare Items") {
        cat = "skinkare_items";
      }

      const response = await axios.get(`${baseUrl}/${cat}`);
      const products = response.data;

      // Loop through the products and create list items for each
      products.forEach((product) => {
        showOnScreen(product, product._id);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// Call the fetchAndDisplayProducts function when the page loads
window.addEventListener("load", fetchAndDisplayProducts);

form.addEventListener("submit", async function submitHandler(e) {
  e.preventDefault();
  try {
    const price = document.getElementById("price").value;
    const productName = document.getElementById("product_name").value;
    const category = document.getElementById("category").value;

    const obj = {
      price,
      productName,
      category,
    };

    // console.log(obj);
    if (obj.category === "Electronics") {
      const response = await axios.post(`${baseUrl}/electronics`, obj);
      const data = response.data;
      const id = data._id;
      showOnScreen(data, id);
      console.log(data);
    } else if (obj.category === "Food Items") {
      const response = await axios.post(`${baseUrl}/food_items`, obj);
      const data = response.data;
      const id = data._id;
      showOnScreen(data, id);
      console.log(data);
    } else if (obj.category === "Skinkare Items") {
      const response = await axios.post(`${baseUrl}/skinkare_items`, obj);
      const data = response.data;
      const id = data._id;
      showOnScreen(data, id);
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
});

function showOnScreen(data, id) {
  const liElement = document.createElement("li");
  liElement.textContent = `${data.price}-${data.productName}-${data.category}`; // Use textContent to set the text.

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  liElement.appendChild(deleteBtn);
  liElement.setAttribute("id", id);

  if (data.category === "Electronics") {
    document.getElementById("electronics").appendChild(liElement);
  } else if (data.category === "Food Items") {
    document.getElementById("food_items").appendChild(liElement);
  } else if (data.category === "Skinkare Items") {
    document.getElementById("skinkare_items").appendChild(liElement); // Correct the typo here.
  }

  deleteBtn.addEventListener("click", async function () {
    try {
      let category;
      console.log("Delete button clicked");
      // Send a DELETE request to your API endpoint to delete the item
      if (data.category === "Electronics") {
        category = "electronics";
      } else if (data.category === "Food Items") {
        category = "food_items";
      } else if (data.category === "Skinkare Items") {
        category = "skinkare_items";
      }
      await axios.delete(`${baseUrl}/${category}/${id}`);
      console.log("Item deleted from API");
      // Remove the corresponding <li> element from the DOM
      liElement.remove();
      console.log("Item removed from DOM");
    } catch (err) {
      console.log(err);
    }
  });
}
