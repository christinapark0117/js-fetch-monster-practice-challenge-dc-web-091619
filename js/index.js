const monsterUrl = "http://localhost:3000/monsters";
let limit = 50;
let page = 1;
//can't to const because the value of the page needs to change every time someone clicks


document.addEventListener("DOMContentLoaded", () => {
   monsterData();

   let form = getMonsterForm();
    form.addEventListener('submit', addNewMonster);

    document.getElementById('forward').addEventListener('click', nextPage);

    document.getElementById('back').addEventListener('click', pageBefore);
});

function monsterData(){
    fetch(monsterUrl + `?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsterArray => {
            monsterArray.forEach(monster => displayMonster(monster))
        } )
}

function displayMonster(monster) {
    let monsterContainer = document.getElementById('monster-container');
    let monsterCard = document.createElement('div');
    monsterCard.className = 'card';
    monsterContainer.appendChild(monsterCard);

    let monsterName = document.createElement('h3');
    let monsterAge = document.createElement('h4');
    let monsterDescription = document.createElement('h4');
    monsterName.innerText = `Name: ${monster.name}`;
    monsterAge.innerText = `Age: ${monster.age}`;
    monsterDescription.innerText = `Description: ${monster.description}`;

    monsterCard.append(monsterName, monsterAge, monsterDescription)
}

function getMonsterForm(){
    return document.getElementById('monster-form')
}

function addNewMonster(event){
    event.preventDefault();

    const newName = event.target.name.value;
    const newAge = event.target.age.value;
    const newDescription = event.target.description.value;

    fetch(monsterUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: newName,
            age: newAge,
            description: newDescription
        })
    })
        .then(response => response.json())
        .then(newMonster => displayMonster(newMonster))

}

let monsterArray =
fetch(monsterUrl)
    .then(response => response.json())
    .then(allMonsters => {
        monsterArray = Array.prototype.slice.call(allMonsters)});


function nextPage(event){
    let monsterDisplay = document.getElementById('monster-container');
    monsterDisplay.innerText = '';
    //without the monsterDisplay it will load everything on one page
    //incrementing that single page by 50 every time the even happens

    page++;

    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(function(monster){
                displayMonster(monster);
            })
        });
}

function pageBefore(event){
    let monsterDisplay = document.getElementById('monster-container');
    monsterDisplay.innerText = '';

    page--;

    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(function(monster){
                displayMonster(monster);
            })
        });
}