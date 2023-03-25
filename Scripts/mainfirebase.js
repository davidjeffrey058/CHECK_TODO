var userId = '';
var userEmail = '';

//Tracks the authenticaiton state
auth.onAuthStateChanged(user => {
  if (user) {
    userEmail = user.email;
    userId = user.uid;

    //get all the tasks from the users collection
    db.collection(userEmail).onSnapshot(snapshot => {
      setUpTasksLayout(snapshot.docs);
    });
    console.log(user.email);
    document.querySelector('#userEmail').innerHTML = 'Logged in as ' + user.email
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

  if (items.length == 0) {
    db.collection(userEmail).doc().set({
      text: taskText['add_task_field'].value,
      status: 'active',
      category: taskText['categorySelect'].value
    }).then(() => {
      taskText.reset();
    })
  } else {
    items.length = 0;
    db.collection(userEmail).add({
      text: taskText['add_task_field'].value,
      status: 'active',
      category: taskText['categorySelect'].value
    }).then(() => {
      taskText.reset();
    })
  }
}

