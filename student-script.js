/*************************/
/**** Private Methods ****/
/*************************/

/*
 * Anything that you need for helper/private use should
 * go here.
 *
 */

 function promptForNumber(message)
 {
    var num;
    do {
      num = prompt(message);
    } while (isNaN(num) || num == "" || num < 1);

    return num;
 }

 isis.Agent.prototype.canAfford = function(amount) {
    return this.money >= amount;
 };

 isis.Agent.prototype.spendMoney = function(amount) {
    if (this.canAfford(amount))
      this.money -= amount;
 };

 isis.Agent.prototype.earnMoney = function(amount) {
    this.money += amount;
 };


/*************************/
/****    isis.Game    ****/
/*************************/

/* 
 * This function will be called when the user changes cities
 * 
 * User Story:
 * Whenever you move citites, the game will have to move the player to 
 * the new city and regenerate the items at that location.
 *
 * Hint:
 * Use this.refreshViews() to reload the UI.
 */
isis.Game.prototype.changeCity = function(newCity) {
  console.log('trying to change city to ' + newCity.name);
  this.currentCity = newCity;
  this.refreshViews();
}

/*
 * This function will be called when the user buys an item
 *
 * User Story:
 * A player can buy items in a city. Each item has a cost and can be 
 * bought in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 */
isis.Game.prototype.buyItem = function(item) {
  console.log('trying to buy ' + item.name);

  var qty = promptForNumber("How many of " + item.name + " do you want?")
  var amount = item.currentPrice * qty;

  if (!this.agent.canAfford(amount)) {
    alert("You can't afford $" + amount + ".")
    return; 
  }

  var yes = confirm("Please confirm you want " + qty + " of " + 
    item.name + " for $" + amount);

  if (yes) {
    this.agent.spendMoney(amount);
    this.agent.inventory.push(item, qty);
  }

  this.refreshViews();
}

/**
 * This function will be called when the user sells an item
 *
 * User Story:
 * A player can sell items in a city. Each item has a cost and can be 
 * sold in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 * 
 * @params inventoryItem
 * An AgentInventoryItem which contains the info about the item the game
 * is trying to sell.
 */
isis.Game.prototype.sellItem = function(inventoryItem) {
  var value = inventoryItem.item.currentPrice * inventoryItem.quantity;
  console.log('trying to sell ' + inventoryItem.item.name + ', I have ' + inventoryItem.quantity + ' worth $' + value);

  var invalid = true;
  while (invalid) {
    var qty = promptForNumber("How many of " + inventoryItem.item.name + " do you want to sell?")
    if (qty < 1) {
      alert("Please enter a number 1 or greater");
    }
    else if (qty > inventoryItem.quantity) {
      alert("You only have " + inventoryItem.quantity);
    }
    else {
      invalid = false;
    }
  }

  var amount = qty * inventoryItem.item.currentPrice;
  this.agent.inventory.pop(inventoryItem.item, qty);
  this.agent.earnMoney(amount);

  this.refreshViews();
}


/*
 * This function is called when the game is initialized to produce a list of bad
 * things which could happen to our travelling agent. 
 *
 * Make up a few more bad things that could happen to our agent!
 * A few examples:
 *   Customs Fare Hike (5% tax on all current money)
 *   Search & Seizure (-$5000)
 *
 * N.B.
 * The bad thing needs to follow the same format as the temporary bad thing
 */
isis.Game.prototype.initBadThings = function(badThings) {
  badThings.push({
    name: "Kiss from the Don!",
    ohNoes: function(agent) {
      alert("The Mafia has given you a deal you can't refuse. You lose 95% of your money.");
      agent.money = agent.money * 0.02;
    }
  });
  
  // Fill this one in with a new bad thing which could happen!
  // If you want, copy and paste it to make more bad things!
  badThings.push({
    name: "Name your bad thing!",
    ohNoes: function(agent) {
      // Your bad thing code goes here
    }
  });
  
}

/*************************/
/****    isis.Agent   ****/
/*************************/

/*
 * This method returns the player's rank based on the amount of 
 * money the player has.
 *
 * User Story:
 * If the player has less than $500 then they should be ranked as a 'Rookie'.
 * If the player has more than $500 then they should be ranked as an 'Agent'.
 * If the player has more than $1000 then they should be ranked as a 'Top Agent'.
 * If the player has more than $5000 then they should be ranked as a 'Double-0'.
 */
isis.Agent.prototype.getRank = function(item) { 
  if (this.money < 500)
    return "Rookie";
  if (this.money < 1000)
    return "Agent";
  if (this.money < 5000)
    return "Top Agent";
  if (this.money >= 5000)
    return "Double-0";
}

/*
 * This will initialize the agent for your player. Make sure to change
 * this so that you collect the information from the user instead of
 * hard coding it.
 * 
 * Hint:
 * Use prompt() to get user input.
 */
isis.Agent.prototype.init = function(item) { 
  this.name = prompt("What is your name, agent?"); // This should be set by the user
  this.codename = prompt("And your codename?"); // This too
}



// This runs the game, this HAS to be at the 
// bottom of the file!
$(function() {
  setTimeout(function() {
    isis.init();
  }, 250);
});