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
    const docRef = db.collection("collaboration").doc("JMEpR1X3jzDejR7FWeqm");

    docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const tasks = doc.data().tasks;
        console.log(tasks);
      } else {
        console.log("No such document!");
      }
    });
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
    endDate: taskText['date-input'].value
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

function collabTaskLayout(){
  let container = '';
      items.forEach(docs => {
          const li = `
       <div class="item_container" title="Created on: ${formateDate(docs.createdDate)}">
           <div data-id="${docs.id}" class="check-mark ${docs.status == "completed" ? "checked" : ""}">
               <img src="images/icon-check.svg">
           </div>
           <div class="text-container">
               <p class="task_name ${docs.status == "completed" ? "checked" : ""}">${docs.text}</p>
               <div>
                   <label class="task_category">${docs.category}</label> 
                   <label class="task_endDate ${docs.endDate == "" ? "empty" : ""}"><i>Due in: ${timeLeft(docs.createdDate, docs.endDate)}</i></label>
               </div>           
           </div>
         <div class="star-container ${docs.important == true ? "important" : ""}" data-id="${docs.id}" title="Mark as important">
           <i class="fa-solid fa-star"></i>
         </div>
         <div title="Delete task" data-id="${docs.id}" class="delete-text ${docs.status == "completed" ? "checked" : ""}">
           <i class="fa-regular fa-trash-can fa-bounce fa-xl" style="color: #ff0000;"></i>
         </div>
       </div>
   `;
          container += li;
      });
}