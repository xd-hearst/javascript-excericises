/*
Example x = 'abcde';
1. Write a JavaScript function that reverse a string.
Expected Output : 'edcba'
Click me to see the solution

2. write a function that returns a grade based on the followin conditions


If above 90, then A .
else If above 80, then B .
else If above 70, then C .
else If above 60, then D .
else F .

*/

function reverse(str){
  var newString = ''
  for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
  return newString
}

function letter(score){
  if (score > 90){
    return 'A';
  } 
  if (score > 80){
    return 'B';
  } 
  if (score > 70){
    return 'C';
  } 
  if (score > 60){
    return 'D';
  } 
    return 'F';
  }
