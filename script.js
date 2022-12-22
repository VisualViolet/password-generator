// Global Variables
const characterTypes = ["lowercase", "uppercase", "numeric", "special"];
var selectedCharacterTypes = [];
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numChar = "0123456789";
const specialChar = "!@#$%^&()_-+={[}]|\/:'<,>.?~";
var characterCombination = "";
var passwordLength;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompt user for password length
function getPasswordLength() {
  selectedCharacterTypes = [];
  passwordLength = prompt("How long would your like your password to be? Pick a number between 8 and 128.");
  if (passwordLength != null && (passwordLength < 8 || passwordLength > 128)) // allows user to cancel with null, but empty string and other parameters specificied not accepted. 
  {                                                                           // OK = "", Cancel = null
    alert("Please choose a number between 8 and 128.");
    getPasswordLength();
  } 
  else if (passwordLength == null) // allows user to exit
  {
    return;
  }
  return passwordLength;
}

// Prompt user for character types
function getCharacterTypes() {
  var passChar = prompt("Please select at least one from the following character types: lowercase, uppercase, numeric, special. Click OK after each selection and Cancel when done.");
  if (passChar == null) // allows user to exit
  {
    return;
  }
  else if (characterTypes.includes(passChar.toLowerCase())) // checks if user input matches valid inputs in array and converts to lowercase. Adds to selected types array.
  {
    selectedCharacterTypes.push(passChar.toLowerCase());
    getCharacterTypes();
  }
  else // error handling
  {
    alert("Invalid character choice. Please check spelling and try again.");
    getCharacterTypes();
  }
}

// Removes duplicates from array by converting to a set
function clearDuplicate(dirtyArray) {
  var cleanSet = new Set(dirtyArray);
  return cleanSet;
}

// Creates character combination string with user selected characters
function createCharacterCombination(userSet){
  characterCombination = "";
  for (i = 0; i < userSet.length; i++) {
    if (userSet[i] == "uppercase") 
    {
      characterCombination = characterCombination + upperCase;
    }
    else if (userSet[i] == "lowercase")
    {
      characterCombination = characterCombination + lowerCase;
    }
    else if (userSet[i] == "numeric")
    {
      characterCombination = characterCombination + numChar;
    }
    else if (userSet[i] == "special")
    {
      characterCombination = characterCombination + specialChar;
    }
  }
}

// Randomly generates password using function return values and a for loop
function generatePassword() {
  passwordLength = getPasswordLength();
  getCharacterTypes();
  var cleanPicks = Array.from(clearDuplicate(selectedCharacterTypes));
  createCharacterCombination(cleanPicks);
  var genPass = "";

  for (var i = 0; i < passwordLength; i++) 
  {
    genPass += characterCombination.charAt(Math.floor(Math.random() * characterCombination.length)); // selects random index ID's from characterCombination array
  }
  return genPass;
}