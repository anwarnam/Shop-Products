const axios = window.axios;

const productsElement = document.getElementById("products-container");
const searchElement = document.getElementById("search");
const categoriesElement = document.getElementById("categories");
const sortElement = document.getElementById("sort");


let products = [];

async function fetchData() {
    try {
        const productsResponse = await axios.get("https://dummyjson.com/products");
        const categoriesResponse = await axios.get("https://dummyjson.com/products/categories");
        console.log(productsResponse.data);
        console.log(categoriesResponse.data);

    
        products = productsResponse.data.products;

        categoriesElement.innerHTML = "<option value=''>All Categories</option>";
        for (const category of categoriesResponse.data) {
            categoriesElement.innerHTML += `<option value="${category}">${category}</option>`;
        }

        
        setProducts(products);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const setProducts = (products) => {
    productsElement.innerHTML = "";
    for (const product of products) {
        productsElement.innerHTML += `
            <div class="card mb-4 mx-2" style="width: 22rem;">
                <img src="${product.images[0]}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.title.substring(0, 10)}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>${product.price} DZD</h4>
                        <a href="#" class="btn btn-primary">Buy now</a>
                    </div>
                </div>
            </div>
        `;
    }
};


const filter = () => {
    let filteredProducts = [...products]; 

    
    if (searchElement.value) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchElement.value.toLowerCase())
        );
    }

    
    if (categoriesElement.value) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === categoriesElement.value
        );
    }

    
    if (sortElement.value === "cheap") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortElement.value === "expensive") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    
    setProducts(filteredProducts);
};


searchElement.addEventListener('input', filter);
categoriesElement.addEventListener('change', filter);
sortElement.addEventListener('change', filter);


fetchData();
