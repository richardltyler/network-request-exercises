const usersButton = document.querySelector('#users-button');
const sportsButton = document.querySelector('#sports-teams-button');
const animalsButton = document.querySelector('#animals-button');



usersButton.addEventListener('click', displayGottenUsers);

function displayUsers(users) {
  const displayedUsers = document.querySelector('#users-section');
  let idCounter = 1;
  users.forEach(user => {
    const stringedUser = JSON.stringify(user);
    displayedUsers.innerHTML += 
      `<h3 id="${idCounter}">${stringedUser}</h3>`;
    idCounter++;
  });
};

function displayGottenUsers() {
  fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())
  .then(boix => displayUsers(boix));
}

function displayUsersAfterPost() {
  const options = { 
    method: "POST",
    body: JSON.stringify({
      id: `${input}`,
      name: `${input}`,
      status: `${input}`,
      interests: `${input}`,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch("http://localhost:3001/api/v1/users", options)
    .then(response => response.json())
    .then(users => displayGottenUsers(users))
}

