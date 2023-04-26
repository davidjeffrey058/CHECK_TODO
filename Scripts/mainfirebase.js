var userId = '';
var userEmail = '';


//Tracks the authenticaiton state
auth.onAuthStateChanged(user => {
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
    // const docRef = db.collection("collaboration").doc("DOCUMENT_ID");

    // var cont = "";

    // docRef.get().then((doc) => {
    //   if (doc.exists) {
    //     const tasks = doc.data().tasks;

    //   } else {
    //     console.log("No such document!");
    //   }
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    // });

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
    createdDate: Date()
  }).then(() => {
    taskText.reset();
  })
}

//method that splits the fullname and returns the first name
function firstName(value) {
  var result = value.split(" ");
  return result[0];
}

function checkEmailExists(e) {
  var email = document.querySelector(".check-email");
  e.preventDefault();
  auth.fetchSignInMethodsForEmail(email.value)
    .then(signInMethods => {
      if (signInMethods.length === 0) {
        console.log('Email does not exist');
      } else {
        console.log('Email exists');
      }
      document.querySelector(".check-form").reset();
    })
    .catch(error => {
      console.log('Error checking email existence:', error);
    });
}

