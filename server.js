const express = require("express");

const app = express();
app.get("/greetings/:name", (req, res) => {
    const name = req.params.name;
    res.send(`What a delight it is to see you once more, ${name}.`);
});

app.listen(3000, () => {
    console.log("Express server is listening on port 3000");
});

app.get("/roll/:num", (req, res) => {
    const num = req.params.num;
    if (isNaN(num)) {
        res.send("You must specify a number");
    } else {
        const randomNum = Math.floor(Math.random() * num);
        res.send(`You rolled a ${randomNum}.`);
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get("/collectibles/:index", (req, res) => {
    const index = req.params.index;
    if (collectibles[index]) {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    } else {
        res.send("This item is not yet in stock. Check back soon!");
    }
});


app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req, res) => {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const type = req.query.type;
    let filteredShoes = shoes;
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    res.send(filteredShoes);
});