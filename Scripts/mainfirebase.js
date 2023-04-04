var userId = '';
var userEmail = '';


//Tracks the authenticaiton state
auth.onAuthStateChanged(user => {
  if (user) {
    const userName = document.querySelector('.displayName');
    userEmail = user.email;
    userId = user.uid;

    userName.innerHTML = 'Hi ' +  firstName(user.displayName);
    userName.title = 'Logged in as ' + user.email;

    //get all the tasks from the users collection
    db.collection(userEmail).onSnapshot(snapshot => {
      setUpTasksLayout(snapshot.docs, userEmail);
    });
    // console.log(user);
    //document.querySelector('#userEmail').innerHTML = 'Logged in as ' + user.email
  }
  else {
    window.location.href = './index.html';
  }
});

//Logout
function logout(e) {
  e.preventDefault();
  auth.signOut();
}

//adds a task to the firestore database
function addItem(e) {
  e.preventDefault();
  const taskText = document.querySelector('.addTask');

  // if (items.length == 0) {
  //   db.collection(userEmail).doc().set({
  //     text: taskText['task_input'].value,
  //     status: 'active',
  //     category: taskText['categorySelect'].value
  //   }).then(() => {
  //     taskText.reset();
  //   })
  // } else {
    // items.length = 0;
    db.collection(userEmail).add({
      text: taskText['task_input'].value,
      status: 'active',
      category: taskText['categorySelect'].value
    }).then(() => {
      taskText.reset();
    })
  // }
}

//method that splits the fullname and returns the first name
function firstName(value){
  var result = value.split(" ");
  return result[0];
}

