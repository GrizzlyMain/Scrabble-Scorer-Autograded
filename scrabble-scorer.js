// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'], 
  10: ['Q', 'Z']
}

let letterPoints;
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let playerWord;
function initialPrompt() {
   playerWord = input.question("Let's play some scrabble! Enter a word: ");
   return playerWord;
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word){
   letterPoints = word.length;
   return letterPoints;
}


function vowelBonusScorer(word) {

   word = word.toUpperCase();
   letterPoints = 0;

   for (i = 0; i < word.length; i++) {
      if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U' ) {
         letterPoints = letterPoints + 3;
      } else {
         letterPoints++;
      }
   }

   return letterPoints;
};



function scrabbleScorer (word){
   letterPoints = 0;
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++){
         letterPoints = letterPoints + newPointStructure[word[i]]
   
       
     }
     return letterPoints;
   }



const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'One point per character',
      scoringFunct: simpleScorer
   },
   {
      name: 'Vowel Bonus',
      description: 'Vowels are worth 3 points',
      scoringFunct: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'Uses scrabble point system',
      scoringFunct: scrabbleScorer
   }
];

function scorerPrompt() {
   let playerChoice;
   console.log(`Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system`);

   playerChoice = input.question('Enter the number of your algorithm choice here: ');
   playerChoice = Number(playerChoice);
    
   if (playerChoice === 0){
      scoringAlgorithms[0].scoringFunct(playerWord);
   }
   else if (playerChoice === 1){
      scoringAlgorithms[1].scoringFunct(playerWord);
   }
   else if (playerChoice === 2){
      scoringAlgorithms[2].scoringFunct(playerWord);

   }
   else {
      console.log(`Input not valid. Try again.`);
   }

   console.log(`Your score is ${letterPoints}.`);

   };


function transform(objScore){
   let newObj = {};
   for (let key in objScore){
   let letters = objScore[key];
      for(let i = 0; i < letters.length; i++){
   newObj[letters[i].toLowerCase()] = Number(key);
   }
   }
   return newObj;
   };


function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
