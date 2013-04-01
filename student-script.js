/*************************/
/**** Private Methods ****/
/*************************/

/*
 * Anything that you need for helper/private use should
 * go here.
 *
 */

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
isis.Game.prototype.buyingItem = function(item) {
  console.log('trying to buy ' + item.name);
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
isis.Game.prototype.sellingItem = function(inventoryItem) {
  var value = inventoryItem.item.currentPrice * inventoryItem.quantity;
  console.log('trying to sell ' + inventoryItem.item.name + ', I have ' + inventoryItem.quantity + ' worth $' + value);
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
  return 'Agent';
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
  this.name = 'Sterling Archer'; // This should be set by the user
  this.codename = 'Dutchess'; // This too
}



// This runs the game, this HAS to be at the 
// bottom of the file!
$(function() {
  setTimeout(function() {
    isis.init();
  }, 250);
});