let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const form = document.querySelector(".add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  getingToysFromJson()
 
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleSubmit(e)
    form.reset()
  })

});
 

function getingToysFromJson(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
      data.forEach(toy => { 
      createCard(toy)
    })
  })
}

function createCard(toy){
  let card = document.createElement('div')
  card.className = "card"
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
  toyCollection.appendChild(card)
  
  const likeBtn = card.querySelector(".like-btn")
  likeBtn.addEventListener('click', () => {
    toy.likes++
    card.querySelector('p').textContent = toy.likes
    updateLikes(toy)
  })
}

function handleSubmit(e){
  e.preventDefault();
  let newToy = {
    "name": e.target.name.value,
    "image": e.target.image.value,
    "likes": 0
  }
  postNewToy(newToy)
  console.log(`new toy ID is : ${newToy.id}`)
  form.reset()
}

function postNewToy(toy){
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy),
  })
  .then((res) => res.json())
  .then((toy) => createCard(toy))
}

function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy),
  })
  .then((res) => res.json())
  .then((toy) => console.log(`new likes count on toy ID ${toy.id} is = ${toy.likes}`))
}