async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

function addtowish(id) {
    localStorage.setItem(id, id);
    document.getElementById(id).disabled = true;
}

function deletefromwish(id) {
    localStorage.removeItem(id);
    showwhishes();
}

function editproduct(id) {
    data=data.map((item) => {
        if (item.id === id)
            return {...item, title:document.getElementById('title').value, category:document.getElementById('category').value, image:document.getElementById('image').value, rate:parseFloat(document.getElementById('rate').value),}

    });

    showproduct();
}

function showheader() {
    const container = document.getElementById('header');
    container.innerHTML = '';
    let content = ``;
    switch (headerstat) {
        case 1:
            content = `
                <div class="p-2">
                    <button onclick="showproduct()" type="button" class="btn btn-primary">products</button>
                </div>
                 <div class="p-2">
                    <button onclick="localStorage.clear() showwhishes()" type="button" class="btn btn-primary">clear wishes</button>
                </div>
                `;
            break;
        case 0:
            content = `
                <div class="p-2">
                    <button onclick="showwhishes()" type="button" class="btn btn-primary">wishes</button>
                </div>
                <div class="p-2">
                    <button onclick="showaddproduct()" type="button" class="btn btn-primary">Add Product</button>
                </div>
                <div class="p-2">
                    <button onclick="showeditproduct()" type="button" class="btn btn-primary">Edit product</button>
                </div>
            `;
            break;
        case 2:
            content = `
                <div class="p-2">
                    <button onclick="showwhishes()" type="button" class="btn btn-primary">wishes</button>
                </div>
                <div class="p-2">
                    <button onclick="showproduct()" type="button" class="btn btn-primary">products</button>
                </div>
            `;
    }
    container.innerHTML = content;
}

function showaddproduct() {
    headerstat = 2;
    showheader();
    let container = document.getElementById('context');
    container.innerHTML = `
        <form onsubmit="addNewProduct()">
            <div class="d-flex justify-content-center mt-4">
                <div class="bg-primary rounded-4" style="height: 400px; width: 400px">
                    <div class="d-flex flex-column pt-2">
                        <label for="title" class="col-form-label">Title</label>
                    </div>
                    <div class="px-5 ">
                        <input id="title" type="text" class="form-control">
                    </div>
                    <div class="d-flex flex-column">
                        <label for="category" class="col-form-label">Category</label>
                    </div>
                    <div class="px-5">
                        <input id="category" type="text" class="form-control">
                    </div>
                    <div class="d-flex flex-column">
                        <label for="image" class="col-form-label">Image Url</label>
                    </div>
                    <div class="px-5">
                        <input id="image" type="text" class="form-control">
                    </div>
                    <div class="d-flex flex-column">
                        <label for="rate" class="col-form-label">rate</label>
                    </div>
                    <div class="px-5">
                        <input id="rate" type="text" class="form-control">
                    </div>
                    <div class="p-3">
                    <button type="submit" class="btn btn-dark ">Add</button>
                    </div>
                </div>
            </div>
        </form>
    `;
}

function showeditproduct() {
    const id = parseInt(prompt('Enter Product ID'));
    const product = data.find(item => item.id === id);
    if (!product) return;

    const container = document.getElementById('context');
    container.innerHTML = `
        <form onsubmit="editproduct(${id})">
            <div class="d-flex justify-content-center mt-4">
                <div class="bg-primary rounded-4 p-4" style="width: 400px">
                    <div class="mb-3">
                        <label for="edit-title" class="form-label">Title</label>
                        <input id="edit-title" type="text" class="form-control" value="${product.title}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-category" class="form-label">Category</label>
                        <input id="edit-category" type="text" class="form-control" value="${product.category}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-image" class="form-label">Image URL</label>
                        <input id="edit-image" type="text" class="form-control" value="${product.image}">
                    </div>
                    <div class="mb-3">
                        <label for="edit-rate" class="form-label">Rating</label>
                        <input id="edit-rate" type="number" step="0.1" class="form-control" value="${product.rate}">
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-dark">Save Changes</button>
                        <button type="button" onclick="showproduct()" class="btn btn-secondary ms-2">Back</button>
                    </div>
                </div>
            </div>
        </form>
    `;
}

function addNewProduct() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const newProduct = new Product(data.length + 1, title, rate, image, category);
    data.push(newProduct);
    showproduct();
}

function renderRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }

    return stars;
}

function showwhishes() {
    headerstat = 1;
    showheader();
    const container = document.getElementById('context');
    container.innerHTML = '';

    for (let i of data) {
        if (localStorage.getItem(i.id) !== null) {
            const content = `
                <div class="card col-md-3 border border-black" style="width: 18rem; height: 600px">
                    <img src="${i.image}" class="card-img-top h-50" alt="">
                    <div class="card-body d-flex flex-column">
                        <div class="align-items-center">
                            <div class="p-3">
                                <h5 class="card-title">${i.title}</h5>
                            </div>
                            <div class="p-3">
                                ${renderRatingStars(i.rate)}
                            </div>
                            <div class="p-2">
                                <p class="card-text">${i.category}</p>
                            </div>
                            <div class="p-2">
                                <button onclick="deletefromwish(${i.id})" class="btn btn-primary">Delete from Wishes</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            container.innerHTML += content;
        }
    }
}

function showproduct() {
    headerstat = 0;
    showheader();
    const container = document.getElementById('context');
    container.innerHTML = '';

    for (let i of data) {
        const isInWishes = localStorage.getItem(i.id) !== null;
        const content = `
            <div class="card col-md-3 border border-black" style="width: 17rem; height: 600px">
                <img src="${i.image}" class="card-img-top h-50" alt="">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex flex-column mb-3">
                        <div class="p-3">
                            <h5 class="card-title">${i.title}</h5>
                        </div>
                        <div class="p-3">
                            ${renderRatingStars(i.rate)}
                        </div>
                        <div class="p-2">
                            <button id="${i.id}" ${isInWishes ? 'disabled' : ''} onclick="addtowish(${i.id})" class="btn btn-primary">
                                ${isInWishes ? 'Added to Wishes' : 'Add to Wishes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        container.innerHTML += content;
    }
}

function Product(id, title, rate, image, category) {
    this.id = id;
    this.title = title;
    this.rate = rate;
    this.image = image;
    this.category = category;
}

let data = [];
let headerstat = 0;
const url = "https://fakestoreapi.com/products";

async function loadProducts() {
    const products = await fetchData(url);
    for (let product of products) {
        data.push(new Product(
            product.id,
            product.title,
            product.rating.rate,
            product.image,
            product.category
        ));
    }
    showproduct();
}

loadProducts();
