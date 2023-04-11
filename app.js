const express = require("express");
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const meals = require("./meals.json");

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/meals", (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const search = req.query.search;

    let displayMeals = [];

    if (search) {
        displayMeals = [...(meals.meals.filter(meal=>meal.strMeal.toLowerCase().includes(search.toLowerCase())))];
    } else {
        displayMeals = [...(meals.meals)];
    }

    if (page && limit) {
    displayMeals = displayMeals.slice((page * limit) - limit, page * limit);  
    } else if (!limit && page) {
        displayMeals = displayMeals.slice((page * 9 )- 9, page * 9);
    } else if (!page && limit) {
        displayMeals = displayMeals.slice(0, limit);
    } else if (!page && !limit) {
        displayMeals = displayMeals.slice(0, 100);
    }

    res.send({meals: [...displayMeals]});
})

app.get("/meal/:id", (req, res)=>{
    const id = req.params.id;
    const meal = meals.meals.find(item=>item.idMeal === id);
    
    if(meal) res.send({meals: [{...meal}]})
    else {
        res.send({meals:null});
    };
})

module.exports = app;