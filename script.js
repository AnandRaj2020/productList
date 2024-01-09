document.addEventListener("DOMContentLoaded", function () {
    const productListContainer = document.getElementById("productList");
    const sortSelect = document.getElementById("sortSelect");

    fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
        .then(response => response.json())
        .then(data => {
            let products = Object.values(data.products);
            products = sortProducts(products, "popularity");
            displayProducts(products);

            sortSelect.addEventListener("change", function () {
                const sortBy = sortSelect.value;
                products = sortProducts(products, sortBy);
                displayProducts(products);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    image_array = ['b.jpg','c.jpg','d.jpg','a.jpg','e.jpg','f.jpg','g.jpg']

    function displayProducts(products) {
        products.forEach(product => {

            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const productImage = document.createElement("img");
            productImage.src = get_random(image_array);

            const productName = document.createElement("h3");
            productName.textContent = product.title;

            const productId = document.createElement("p");
            productId.textContent = `Price: ${product.price}`;

            const productCategory = document.createElement("p");
            productCategory.textContent = `Popularity: ${product.popularity}`;

            const productPrice = document.createElement("p");
            productPrice.textContent = `Category: ${product.subcategory}`;

            productDiv.appendChild(productName);
            productDiv.appendChild(productImage);
            productDiv.appendChild(productId);
            productDiv.appendChild(productCategory);
            productDiv.appendChild(productPrice);

            productListContainer.appendChild(productDiv);
        });
    }

    function sortProducts(products, sortBy) {
        console.log(sortBy);
        return products.slice().sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'price') {
                return a.price - b.price;
            }
            else if (sortBy === 'popularity') {
                return a.popularity - b.popularity;
            }
            else if (sortBy === 'popularity') {
                return a.subcategory.localeCompare(b.subcategory);
            }
            
        });
    }

    function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
      }
});
