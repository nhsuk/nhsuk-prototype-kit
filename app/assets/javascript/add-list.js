

// Add to a list

//Define empty array where NHS numbers will live when entered
var numbersList = []
//Define variables and helps the html talk to the javascript
var nhsNumberinput = document.getElementById('nhs-num-txt')
var domNumberslist = document.getElementById('numbersList')
var listLink = document.getElementById('add-list-link')

//Listen for the add another link to be clicked
listLink.addEventListener('click', addNhsnumberTolist)

//Function to save the nhs number and spit it back out above
function addNhsnumberTolist() {
  var number = nhsNumberinput.value // get value of whats inside the box
  numbersList.push(number) //adds it to the array
  domNumberslist.innerHTML+="<li><strong>"+number+"</strong> <span class='nhsuk-body-s' style='display: inline; text-decoration: underline; margin-left:6px'><a class='remove-link' data-nhsnumber='"+number+"'> Remove </a> </span> </li>" //spit it back out (with some added extras)
  nhsNumberinput.value="" // clears the box for the next input
  
}
