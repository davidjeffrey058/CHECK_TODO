
const setUpTasksLayout = (data, email) => {
    var items = [];
    var importantItems = [];

    data.forEach(element => {
        items.push({
            id: element.id,
            ...element.data()
        });
    });
    
    document.querySelector('.theContainer').innerHTML = todoLayout(items);
    document.querySelector(".collab").innerHTML = todoLayout(items);

    //Copying the important items into the important list
    importantItems = items.filter(function (obj) {
        return obj.important === true;
    });

    //Displays all the important tasks    
    const emptyMessage = `<h2 class="error-message">There is no important message here!</h2>`;
    if (importantItems.length == 0) {
        document.querySelector('.important-container').innerHTML = emptyMessage;
    } else {
        document.querySelector('.important-container').innerHTML = todoLayout(importantItems);

    }

    createEventListeners(email);
    createEventListenersDelete(email);
    createEventListenersImportant(email);
}

//Creates an eventListener for every single checkbox
function createEventListeners(Email) {
    var todoCheckMarks = document.querySelectorAll('.item_container .check-mark');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            markCompleted(checkMark.dataset.id, Email);
        });
    });
}

//Creates an eventListener for every single delete
function createEventListenersDelete(Email) {
    var todoCheckMarks = document.querySelectorAll('.item_container .delete-text');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            deleteTask(checkMark.dataset.id, Email);
        });
    });
}

//Creates an eventListener for every single important
function createEventListenersImportant(Email) {
    var todoImportant = document.querySelectorAll('.item_container .star-container');

    todoImportant.forEach((important) => {
        important.addEventListener("click", function () {
            importantTask(important.dataset.id, Email);
        });
    });
}

//Function that fires when a checkbox is clicked
function markCompleted(id, e) {
    let item = db.collection(e).doc(id);
    item.get().then(function (doc) {
        if (doc.exists) {
            let status = doc.data().status;
            if (status == "active") {
                item.update({
                    status: "completed"
                })
            } else if (status == "completed") {
                item.update({
                    status: "active"
                })
            }
        }
    });
}

//Function that deletes a task
function deleteTask(id, e) {
    let item = db.collection(e).doc(id);
    item.delete().catch(error => {
        alert("Error deleting document: ", error);
    })
}

//Function that adds a task to important
function importantTask(id, e) {
    let item = db.collection(e).doc(id);
    item.get().then(function (doc) {
        if (doc.exists) {
            let priority = doc.data().important;
            if (priority == true) {
                item.update({
                    important: false
                })
            } else if (priority == false) {
                item.update({
                    important: true
                })
            }
        }
    });
}

//Function that formats the date object to string
function formateDate(dateValue) {
    var result = Date(dateValue).toString();
    return result;
}


function todoLayout(items) {
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
                <label class="task_endDate"><i>Due in: 2hrs 3min</i></label>
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
    return container;
}