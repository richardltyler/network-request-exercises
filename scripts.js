displayGottenUsers();

function displayUsers(users) {
  const displayedUsers = document.querySelector('#users-section');
  users.forEach(user => {
    const stringedUser = JSON.stringify(user);
    displayedUsers.innerHTML += 
      `<h3>${stringedUser}</h3>`;
  });
};

function displayGottenUsers() {
  fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())
  .then(boix => displayUsers(boix));
}

// function displayUsersAfterPost() {
//   fetch("http://localhost:3001/api/v1/users", {
//     method: "POST",

//   })
// }

