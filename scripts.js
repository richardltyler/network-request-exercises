const usersButton = document.querySelector('#users-button');
const sportsButton = document.querySelector('#sports-teams-button');
const animalsButton = document.querySelector('#animals-button');
const userInputs = document.querySelectorAll('.user-input');
const postButton = document.querySelector('#post-button');

usersButton.addEventListener('click', displayGottenUsers);
sportsButton.addEventListener('click', displayGottenSportsTeams);
animalsButton.addEventListener('click', displayGottenAnimals);
postButton.addEventListener('click', displayDataAfterPost);

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

function displayGottenUsers() {
  sportsButton.checked = false;
  animalsButton.checked = false;
  fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(data => displayData(data))
}

function displayGottenSportsTeams() {
  animalsButton.checked = false;
  usersButton.checked = false;
  fetch("http://localhost:3001/api/v1/sport-teams")
    .then(response => response.json())
    .then(data => displayData(data));
}

function displayGottenAnimals() {
  usersButton.checked = false;
  sportsButton.checked = false;
  fetch("http://localhost:3001/api/v1/animals")
    .then(response => response.json())
    .then(data => displayData(data))
}

function displayDataAfterPost() {
  const displayedDataList = Array.from(document.querySelectorAll('h3'));
  const reversedDataDisplayList = displayedDataList.reverse();
  const id = parseInt(reversedDataDisplayList[0].id) + 1;
  if (usersButton.checked) {
    postNewUser(id);
  } else if (animalsButton.checked) {
    postNewAnimal(id);
  } else if (sportsButton.checked) {
    postNewTeam(id);
  }
}


function postNewUser(id) {
  const options = { 
    method: "POST",
    body: JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      status: `${userInputs[1].value}`,
      interests: `${userInputs[2].value}`,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch("http://localhost:3001/api/v1/users", options)
    .then(response => response.json())
    .then(users => displayGottenUsers(users))
}

function postNewAnimal(id) {
  const displayedDataList = Array.from(document.querySelectorAll('h3'));
  const reversedDataDisplayList = displayedDataList.reverse();
  const options = { 
    method: "POST",
    body: JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      diet: `${userInputs[1].value}`,
      fun_fact: `${userInputs[2].value}`,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch("http://localhost:3001/api/v1/animals", options)
    .then(response => response.json())
    .then(animals => displayGottenAnimals(animals))
}

function postNewTeam(id) {
  const options = { 
    method: "POST",
    body: JSON.stringify({
      id: id,
      name: `${userInputs[0].value}`,
      head_coach: `${userInputs[1].value}`,
      sport: `${userInputs[2].value}`,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch("http://localhost:3001/api/v1/sport-teams", options)
    .then(response => response.json())
    .then(teams => displayGottenSportsTeams(teams))
}

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
