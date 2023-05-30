var userId = '';
var userEmail = '';


//Tracks the authenticaiton state
auth.onAuthStateChanged(async user => {
  if (user) {
    const userName = document.querySelector('.displayName');
    userEmail = user.email;
    userId = user.uid;

    userName.innerHTML = 'Hi ' + firstName(user.displayName);
    userName.title = 'Logged in as ' + user.email;

    //get all the tasks from the users collection
    db.collection(userEmail).onSnapshot(snapshot => {
      setUpTasksLayout(snapshot.docs, userEmail);
    });

    // Retrieve the document from collaboration
    const docRef = db.collection("collaboration").where("author", "==", userEmail);
    docRef.onSnapshot((doc) => {
      setCollab(doc.docs);
    });

    //Retrieve the collaborating tasks
    const collabDocRef = db.collection("collaboration").where("collaborator", "==", userEmail);
    collabDocRef.onSnapshot((doc) => {
      setCollaborating(doc.docs);
    })

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

  db.collection(userEmail).add({
    text: taskText['task_input'].value,
    status: 'active',
    category: taskText['categorySelect'].value,
    important: false,
    createdDate: Date(),
    endDate: taskText['date-input'].value,
  }).then(() => {
    taskText.reset();
  })
}

//method that splits the fullname and returns the first name
function firstName(value) {
  var result = value.split(" ");
  return result[0];
}

function checkEmailExists(e,) {
  var collabForm = document.querySelector('.collab-check-form');
  var email = document.querySelector('.check-email');

  e.preventDefault();

  auth.fetchSignInMethodsForEmail(email.value)
    .then(signInMethods => {
      if (signInMethods.length === 0) {
        alert(email.value + ' does not exist');
      } else {
        if(email.value === userEmail){
          alert("That is your email address");
          return;
        }else{
          db.collection('collaboration').add({
            text: collabForm['collab-task_input'].value,
            status: 'active',
            category: collabForm['collab-categorySelect'].value,
            createdDate: Date(),
            endDate: collabForm['collab-date-input'].value,
            collaborator: email.value,
            author: userEmail
          })
        }
      }
      collabForm.reset();
    })
    .catch(error => {
      console.log('Error checking email existence:', error);
    });
}
