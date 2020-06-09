"use strict";

var userInput = document.getElementById("user-input");
var firstInput = false;
var displayText = document.getElementById("display-text");
var childTextNodes;

var locations = ["room", "ssh", "linkedlist", "stacks", "root", "ssh", "room"]; //linear sequence, advance one thru the other

var roomStoryWelcome = "you see a large, messy room. the area is filled with red bull, crisps, and half opened computer science textbooks. you see the computer blinking in front of you, with the blinking prompt... CONNECT TO SSH?";
var roomStory = {
  branch1: ["as you type the command, the room around you begind to swirl. you see nothing but swirling characters and darkness. you fear you may never finish this homework on time!"],
  branch2: ["you leave your room and go to hand out with friends. you are done with this homework for now."]
};
var roomStoryOptions = ["connect to ssh?", "walk away and socialise"];
//var roomStoryTriggers = [2, "end", "branch2"];
var roomStoryTriggers = [{result:"end", branch:"branch2"}, {result:"ssh", branch:"branch1"}]; //atm 2 types of triggers, location changes and end of game

var sshStoryWelcome = "you look around, and see a large purple portal, with the lessers S S H engraved into the stone.";

var mainStoryWelcome = "passing the open door, you arrive within what can only be described as a junkyard. you see the letters main() high in the sky. this must be your program!";

var stacksStoryWelcome = "you see massive highrise skyscrapers. at the end of the street in glowing neon is the sign 'SYSTEM STACK'. you proceed there.";

class Location {
  constructor(locationName, locationNarration, locationStory, storyOptions, triggers) {
    this.locationName = locationName;
    this.locationNarration = locationNarration;
    this.locationStory = locationStory;
    this.storyOptions = storyOptions;
    this.currentStoryIndex = 0;
    this.triggers = triggers;
    this.currentBranch;
  }

  welcomeNarration() { //onload call this
    outputResponseToParent(displayText, this.locationNarration);
  }

  presentOptions() {
    outputResponseToParent(displayText, "1: "+this.storyOptions[0]);
    outputResponseToParent(displayText, "2: "+this.storyOptions[1]);
  }

  getTriggerResult(branchname) {
    var i, result;

    for (i = 0; i < this.triggers.length; i++) { //cycle thru triggers until we hit branch
      if (this.triggers[i].branch == branchname) {
        result = this.triggers[i].result;
        return result;
      }
    }
  }

  checkTriggers() {
    var status;

    console.log(this.currentBranch);
    status = this.getTriggerResult(this.currentBranch);
    return status;
  }

  advanceNarration(userInputText) {
    if (this.currentStoryIndex < this.locationStory["branch1"].length) { //if story for a single location is still going
      if (userInputText == "1") {
        var branchStory = this.locationStory["branch1"];
        this.currentBranch = "branch1";
        outputResponseToParent(displayText, this.currentBranch[this.currentStoryIndex]);
        this.currentStoryIndex++; //for longer locations

      } else if (userInputText == "2"){
        var branchStory = this.locationStory["branch2"];
        this.currentBranch = "branch2";
        outputResponseToParent(displayText, branchStory[this.currentStoryIndex]);
        this.currentStoryIndex++;

      } else {
        outputResponseToParent(displayText, "sorry, that's not an option");
      }
    } else { //story is done for this location, player must move on
      outputResponseToParent(displayText, "there is nothing to do! type look to see where you can go");
    }

    var triggerResult = this.checkTriggers();

    if (triggerResult == "end") { //check for game ending
      outputResponseToParent(displayText, "game over");
      userInput.disabled = true;
      return "end";

    } else {
      console.log("TRIGGER RESULT "+triggerResult)
      return triggerResult; //return new location we going to
    }

  }
}

class Controller {
  constructor(playername, inventory, stats, currentLocation) {
    this.locations = [];
    this.playername = playername; //string
    this.inventory = inventory; //array
    this.stats = stats; //json object
    this.currentLocation = currentLocation;
  }

  spawnLocations() {
    this.locations.push(new Location("room", roomStoryWelcome, roomStory, roomStoryOptions, roomStoryTriggers));
    this.locations.push(new Location("ssh", sshStoryWelcome));
    this.locations.push(new Location("main", mainStoryWelcome));
    this.locations.push(new Location("stacks", stacksStoryWelcome));
  }

  introductionText() {
    outputResponseToParent(displayText, "welcome to our demo. to view inventory, please press inv.");
    outputResponseToParent(displayText, "if you forget commands, write 'help' in the console");
    outputResponseToParent(displayText, "to set character name, type setname <name>");
    outputResponseToParent(displayText, "to proceed write goto room");
  }

  viewInventory() {
    outputResponseToParent(displayText, "inventory for: "+this.playername);
    outputResponseToParent(displayText, this.inventory.join(", "));
  }

  viewStats() {
    outputResponseToParent(displayText, "stats for: "+this.playername);
    outputResponseToParent(displayText, "health - "+this.stats['health']);
    outputResponseToParent(displayText, "armour - "+this.stats['armour']);
  }

  setCharName(newName) {
      this.playername = newName;
      outputResponseToParent(displayText, "set name to "+newName);
  }

  loadLocationNarrative(gotoLocation) {
    console.log("loading location");
    switch(gotoLocation) {
      case "room":
        this.locations[0].welcomeNarration();
        this.locations[0].presentOptions();
        this.currentLocation = 0;
        break;
      case "ssh":
        this.locations[1].welcomeNarration();
        this.locations[1].presentOptions();
        this.currentLocation = 1;
        break;
      case "main":
        this.locations[2].welcomeNarration();
        this.locations[2].presentOptions();
        this.currentLocation = 2;
        break;
      case "stacks":
        this.locations[3].welcomeNarration();
        this.locations[3].presentOptions();
        this.currentLocation = 3;
        break;
      default:
        outputResponseToParent(displayText, "you can't go there");
        break;
    }
  }

  getLocationIndex(name) {
    var i;
    for (i = 0; i < this.locations.length; i++) {
      if (this.locations.locationName == name) {
        return i;
      }
    }
    return 0;
  }

  gameCommands(userInput) {
    var inputWords = userInput.split(" ");

    switch (inputWords[0]) {
      case "help":
        outputResponseToParent(displayText, "commands: help look inv setname goto stats");
        break;
      case "look":
        outputResponseToParent(displayText, this.locations[this.currentLocation].welcomeNarration());
        break;
      case "inv":
        this.viewInventory();
        break;
      case "stats":
        this.viewStats();
        break;
      case "setname":
        this.setCharName(inputWords[1]);
        break;
      case "goto":
        outputResponseToParent(displayText, "going to "+inputWords[1]);
        this.loadLocationNarrative(inputWords[1]);
        break;
      case "1":
        var narrationResult = this.locations[this.currentLocation].advanceNarration(inputWords[0]);

        if (narrationResult != "end") {
          this.loadLocationNarrative(narrationResult);
        }

        break;
      case "2":
        var narrationResult = this.locations[this.currentLocation].advanceNarration(inputWords[0]);
        if (narrationResult != "end") {
          this.loadLocationNarrative(narrationResult);
        }

        break;
      default: //cases for a/b/c?
        outputResponseToParent(displayText, "can't understand command. try again.");
        break;
    }
  }
}

var game = new Controller("", ["cs textbook", "calculator"], {health:3, armour:3}, 0);

mainDemo();

function mainDemo() {
  var userInput = document.getElementById("user-input");
  document.addEventListener("keypress", inputHandler, false);
}

function inputHandler(e) {
  if (e.key == 'Enter') {
    var userInput = document.getElementById("user-input");


    if (firstInput == false) {
      childTextNodes = displayText.childNodes;
      fadeText(document.getElementById('welcome'));
      clearChildNodes(displayText);

      game.spawnLocations();
      game.introductionText();

      firstInput = true;
      userInput.value = "";

    } else {

      childTextNodes = displayText.childNodes;
      var childNodesNum = childTextNodes.length;

      if(childNodesNum > 13) {
        clearChildNodes(displayText);
      }

      game.gameCommands(userInput.value);
      userInput.value = ""; //clear the value

    }
  }
}

function fadeText(element) {
  var element;
  var transparency = 1;
  var id = setInterval(frame, 100);

  console.log(element);

  function frame() {
    if (transparency == 0) {
      clearInterval(id);
    } else {
      transparency -= 0.1;
      element.style.opacity = transparency;
    }
  }
}

function clearChildNodes(element) {
  var child = element.lastElementChild;

  while (child) {

    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function outputResponseToParent(parent, text) {
  var newOutputText = document.createElement('p'); //new p node
  newOutputText.classList.add("welcome-text"); //styling
  newOutputText.classList.add("console");

  var textnode = document.createTextNode(text);
  newOutputText.appendChild(textnode);
  parent.appendChild(newOutputText);
}
