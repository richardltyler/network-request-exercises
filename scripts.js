const usersButton = document.querySelector('#users-button');
const sportsButton = document.querySelector('#sports-teams-button');
const animalsButton = document.querySelector('#animals-button');
const userInputs = document.querySelectorAll('.user-input');
const postButton = document.querySelector('#post-button');
const deleteButton = document.querySelector('#delete-button');

usersButton.addEventListener('click', displayGottenData);
sportsButton.addEventListener('click', displayGottenData);
animalsButton.addEventListener('click', displayGottenData);
postButton.addEventListener('click', displayDataAfterPost);
deleteButton.addEventListener('click', deleteItem);

// get requests and helpers
function displayGottenData() {
  fetch(`http://localhost:3001/api/v1/${getRadioButtonValue()}`)
    .then(response => response.json())
    .then(data => displayData(data))
}

function getRadioButtonValue() {
  const buttons = Array.from(document.querySelectorAll('.radio-button'));
  const checkedButton = buttons.find(button => button.checked);
  return checkedButton.value;
}

function displayData(dataSet) {
  formatInputs();
  const displayArea = document.querySelector('#users-section');
  displayArea.innerHTML = "";
  let idCounter = 1;
  dataSet.forEach(datum => {
    const stringedDatum = JSON.stringify(datum);
    displayArea.innerHTML += 
      `<h3 id="${idCounter}">${stringedDatum}</h3>`;
    idCounter++;
  });
};

function formatInputs() {
  if (usersButton.checked) {
    userInputs[0].placeholder = 'User\'s Name';
    userInputs[1].placeholder = 'Online or Offline?';
    userInputs[2].placeholder = 'List the user\'s interests';
  } else if (sportsButton.checked) {
    userInputs[0].placeholder = 'Team\'s Name';
    userInputs[1].placeholder = 'Head Coach\'s name';
    userInputs[2].placeholder = 'Which sport?';
  } else if (animalsButton.checked) {
    userInputs[0].placeholder = 'Animal\'s Name';
    userInputs[1].placeholder = 'What do they eat?';
    userInputs[2].placeholder = 'Gimme a fun fact';
  } else {
    userInputs.forEach(input => input.placeholder = '');
  }
}

// post requests and helpers
function postNewData(id) {
  if (checkForEmptyInputs()) {
    const options = { 
      method: "POST",
      body: getBodyFormat(id),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(`http://localhost:3001/api/v1/${getRadioButtonValue()}`, options)
      .then(response => response.json())
      .then(data => displayGottenData(data))
  }
}

function checkForEmptyInputs() {
  return Array.from(userInputs).every(field => field.value);
}

function displayDataAfterPost() {
  const displayedDataList = document.querySelectorAll('h3');
  const reversedDataDisplayList = Array.from(displayedDataList).reverse();
  const dataAtHighestID = JSON.parse(reversedDataDisplayList[0].innerText);
  const id = dataAtHighestID.id + 1;
  postNewData(id);
  clearInputFields();
}

function clearInputFields() {
  userInputs.forEach(field => field.value = '');
}

function getBodyFormat(id) {
  let body;
  if (getRadioButtonValue() === 'users') {
    body = JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      status: `${userInputs[1].value}`,
      interests: `${userInputs[2].value}`,
    });
  } else if (getRadioButtonValue() === 'sport-teams') {
    body = JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      head_coach: `${userInputs[1].value}`,
      sport: `${userInputs[2].value}`,
    });
  } else if (getRadioButtonValue() === 'animals') {
    body = JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      diet: `${userInputs[1].value}`,
      fun_fact: `${userInputs[2].value}`,
    });
  }
  return body;
}

// delete requests and helpers
function deleteItem() {
  const deleteInput = document.querySelector('#id-to-delete');
  if (deleteInput.value) {
    fetch(`http://localhost:3001/api/v1/${getRadioButtonValue()}/${deleteInput.value}`, {method: 'Delete'})
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .then(data => displayGottenData(data))
      .then(deleteInput.value = '')
  }
}

