let diamonds = 10000;
let gold = 5000;
let playerCards = [
    { name: "Player 1", rating: 85, image: "https://via.placeholder.com/150", price: 3000 },
    { name: "Player 2", rating: 90, image: "https://via.placeholder.com/150", price: 5000 },
    { name: "Player 3", rating: 80, image: "https://via.placeholder.com/150", price: 2500 },
    { name: "Player 4", rating: 92, image: "https://via.placeholder.com/150", price: 7000 },
];

let team = [];

function updateDiamonds() {
    document.getElementById('diamondCount').textContent = diamonds;
    document.getElementById('goldCount').textContent = gold;
}

function createMarketCard(player) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${player.image}" alt="${player.name}">
        <div class="name">${player.name}</div>
        <div class="rating">Rating: ${player.rating}</div>
        <div class="price">Price: ${player.price} Diamonds</div>
        <button onclick="buyPlayer('${player.name}', ${player.price})">Buy</button>
    `;
    return card;
}

function createTeamCard(player) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${player.image}" alt="${player.name}">
        <div class="name">${player.name}</div>
        <div class="rating">Rating: ${player.rating}</div>
    `;
    return card;
}

function buyPlayer(name, price) {
    if (diamonds >= price) {
        diamonds -= price;
        updateDiamonds();
        
        const player = playerCards.find(p => p.name === name);
        team.push(player);

        const teamGrid = document.getElementById('teamGrid');
        teamGrid.appendChild(createTeamCard(player));

        const cardGrid = document.getElementById('market').querySelector('.card-grid');
        const cardToRemove = Array.from(cardGrid.children).find(card => card.querySelector('.name').textContent === name);
        cardGrid.removeChild(cardToRemove);
    } else {
        alert('Not enough diamonds!');
    }
}

document.getElementById('openPack').addEventListener('click', function() {
    if (diamonds >= 3000) {
        diamonds -= 3000;
        updateDiamonds();

        const randomPlayer = playerCards[Math.floor(Math.random() * playerCards.length)];
        team.push(randomPlayer);
        
        const teamGrid = document.getElementById('teamGrid');
        teamGrid.appendChild(createTeamCard(randomPlayer));
    } else {
        alert('Not enough diamonds!');
    }
});

function initMarket() {
    const cardGrid = document.getElementById('market').querySelector('.card-grid');
    playerCards.forEach(player => {
        cardGrid.appendChild(createMarketCard(player));
    });
}

initMarket();
