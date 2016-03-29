'use strict';

const Promise = require('bluebird');

const HOUR_TO_MIN = 100;
const MIN_TO_MILLISECONDE = 10000;

const Marchand = require ('./Marchand');


module.exports = class extends Marchand {
  constructor() {
    super();
    this.openTimeRes =
      Math.floor((Math.random() * 24*HOUR_TO_MIN) + HOUR_TO_MIN); //en heure
    this.closeTimeRes =
      Math.floor((Math.random() * 24*HOUR_TO_MIN) + HOUR_TO_MIN); //en heure
    this.openRes = false;
    this.cookTime = Math.floor((Math.random() * 50) + 5);


  }
  getOpenTimeRes(){
    return this.openTimeRes;
  }

  getCloseTimeRes(){
    return this.closeTimeRes;
  }

  openingRes() {
    this.openRes=true;
    console.log("Le restaurant est ouvert");
  };

  closingRes(){
    this.openRes=false;
    console.log("Le restaurant est fermé");
  };


  //====== REFUELING ========

  goRefueling(){
    var emptyStock=0;
    this.restaurantFrench();
    for (var i in this.stock){
      if (this.stock[i]===0){
        emptyStock++;
      }
    }
    if (emptyStock >= 2){
      this.refueling();
      for (var i in this.stock){
        this.stock[i] = 20;
      }
      console.log(this.stock);
    }

    this.restaurantItalian();
    for (var i in this.stock){
      if (this.stock[i]===0){
        emptyStock++;
      }
    }
    if (emptyStock >= 2){
      this.refueling();
      for (var i in this.stock){
        this.stock[i] = 20;
      }
      console.log(this.stock);
    }

    this.restaurantJap();
    for (var i in this.stock){
      if (this.stock[i]===0){
        emptyStock++;
      }
    }
    if (emptyStock >= 2){
      this.refueling();
      for (var i in this.stock){
        this.stock[i] = 20;
      }
      //console.log(this.stock);
    }

  }

//======== RESTAURANTS INSTANCIATION  =======
  restaurantItalian() {
    this.stock = {
      "eggs": 0,
      "pasta": 0,
      "bacon": 20,
      "cream": 20,
      "onions": 20,
      "salad": 20,
      "tomatoes": 20,
      "mozarella": 20,
      "chicken": 20,
      "parmesan": 20
    };

    this.recipe1 = {
      "eggs": 1,
      "pasta": 1,
      "bacon": 1,
      "cream": 1,
      "onions": 1
    };

    this.recipe2 = {
      "salad": 1,
      "tomatoes": 1,
      "mozarella": 1,
      "chicken": 1,
      "parmesan": 1
    };

  }

  restaurantJap() {

    this.stock = {
      "sushi": 20,
      "california": 30,
      "maki": 20,
      "brochettes": 30,
      "miso soup": 30,
      "ramen": 20,
      "maki nutella": 10

    };

    this.recipe1 = {
      "sushi": 1,
      "california": 1,
      "maki": 1,
      "brochettes": 1
    };

    this.recipe2 = {
      "miso soup": 1,
      "ramen": 1,
      "maki nutella": 1
    };

  }

  restaurantFrench() {

    this.stock = {
      "beef": 20,
      "onion": 20,
      "sauce": 30,
      "riz": 40,
      "bread": 50,
      "potatoes": 30,
      "cheese": 20,
      "ham": 20,
      "carrot": 30
    };

    this.recipe1 = {
      "beef": 1,
      "onion": 1,
      "sauce": 1,
      "riz": 1,
      "bread": 1
    };

    this.recipe2 = {
      "potatoes": 1,
      "cheese": 1,
      "ham": 1,
      "carrot": 1
    };


  }


  // ==========RECIPE CREATION=========

  createRecipe1() {
    console.log("recette 1 ");
    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in this.recipe1) {
        for (var j in this.stock) {
          if (i === j) {
            if (this.stock[j] > 0) {
              numIng++;
            }
          }
        }
      }
      console.log(numIng);
      if (numIng ===Object.keys(this.recipe1).length)
        resolve();
      else
        reject();
    });
  }

  useIngredients(recipe) {
    console.log("useIngredients");
    for (var i in recipe) {
      for (var j in this.stock) {
        if (i === j && this.stock.hasOwnProperty(j)) {
          this.stock[j]--;
        }
      }
    }
    console.log(this.stock);
  };

  cook() { //prend en param un client
    setTimeout(()=> {
      console.log("Le plat est prêt!!");
    }, this.cookTime ); // a multiplier pour mettre en milliseconde
  }

  createRecipe2() {

    console.log("recette 2");
    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in this.recipe2) {
        for (var j in this.stock) {
          if (i === j && this.stock.hasOwnProperty(j)) {
            if (this.stock[j] > 0) {
              numIng++;
            }
          }
        }
      }
      console.log(numIng);
      if (numIng === Object.keys(this.recipe2).length)
        resolve();
      else
        reject();
    });
  }

}


return module.exports;
