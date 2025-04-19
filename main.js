async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

function addtowish(id){
    localStorage.setItem(id,id);
}

function deletefromwish(id){
    localStorage.removeItem(id);
}

function showrating(value){

}
function renderRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);


    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star text-warning"></i>';
        }  else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }

    return stars;
}

function showwhishes(data){

    const container = document.getElementById('context');
    container.innerHTML = '';
    data.then((p)=>{
            for (let i of p) {
                if(localStorage.hasOwnProperty(i.id)) {
                    const card = document.createElement('div');
                    card.classList = "card-body";
                    const content = `
                        <div class="card col-md-3 border border-black " style="width: 18rem;height: 550px">
                            <img src="${i.image}" class="card-img-top h-50" alt="">
                            <div class="card-body d-flex flex-column">
                                <div class=" align-items-center">
                                    <div class="p-3">
                                        <h5 class="card-title">${i.title}</h5>
                                    </div>
                                     <div class="p-3">
                                        ${renderRatingStars(i.rating.rate)}
                                    </div>
                                    <div class="p-2">
                                        <p class="card-text">${i.category}</p>
                                    </div>
                                    <div class="p-2">
                                        <div >
                                            <button onclick="deletefromwish(${i.id})" class="btn btn-primary ">delete from wishes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                container.innerHTML += content;
            }
        }
    })

}

 function showproduct(data){
    const container = document.getElementById('context');
     container.innerHTML = '';
      data.then((p)=>{
        for(let i of p){
            const card = document.createElement('div');
            card.classList="card-body" ;
            const content = `
            <div class="card col-md-3 border border-black " style="width: 17rem;height: 550px">
                <img src="${i.image}" class="card-img-top h-50" alt="">
                <div class="card-body d-flex flex-column">
                     <div class=" d-flex flex-column mb-3">
                        <div class="p-3">
                            <h5 class="card-title">${i.title}</h5>
                        </div>
                        <div class="p-3">
                            ${renderRatingStars(i.rating.rate)}
                        </div>
                        <div class="p-2">
                            <p class="card-text">${i.category}</p>
                        </div>
                        <div class="p-2">
                            <button onclick="addtowish(${i.id})" class="btn btn-primary">add to wish</button>
                        </div>
                    </div>
                </div>
            </div>`;
            container.innerHTML += content;
        }
      })
}


const url="https://fakestoreapi.com/products";
const data= fetchData(url);
showproduct(data);
