const setCollab = (data) => {
    var collabItems = [];

    data.forEach(element => {
        collabItems.push({
            id: element.id,
            ...element.data()
        });
    });
    document.querySelector(".collab").innerHTML = collabTaskLayout(collabItems, true);
    // collabCheckboxEventListener(email);
}

const setCollaborating = (data) => {
    var collaborating = [];

    data.forEach(element => {
        collaborating.push({
            id: element.id,
            ...element.data()
        });
    });
    document.querySelector(".collabTask").innerHTML = collabTaskLayout(collaborating, false);
    collabCheckboxEventListener();
    collabEventListenersDelete();
}

function collabTaskLayout(array, isCollab) {
    
    var container = "";
    array.forEach(docs => {
        var li = `
        <div class="collab_container" title="Created on: ${formatedDate(docs.createdDate)}">
        <div data-id="${docs.id}" class="collab-check-mark ${docs.status == "completed" ? "checked" : ""}">
            <img src="images/icon-check.svg">
        </div>
        <div class="text-container">
            <p class="task_name ${docs.status == "completed" ? "checked" : ""}">${docs.text}</p>
            <div>
                <label class="task_category">${docs.category}</label> 
                <label class="task_endDate ${docs.endDate == "" ? "empty" : ""}"><i>Due in: ${timeLeft(docs.endDate)}</i></label>
                
            </div>           
            <label class="task_category" style="margin-top: 10px"><b>${isCollab ? "Collaborator" : "Author"}:</b> ${isCollab ? docs.collaborator : docs.author}</label>
        </div>
      <div title="Delete task" data-id="${docs.id}" class="collab-delete-text ${docs.status == "completed" ? "checked" : ""}">
        <i class="fa-regular fa-trash-can fa-bounce fa-xl" style="color: #ff0000;"></i>
      </div>
    </div>
        `;
        container += li;    
    });
    
    return container;
}

//Creates an eventListener for every single collaboration checkbox
function collabCheckboxEventListener() {
    var todoCheckMarks = document.querySelectorAll('.collab_container .collab-check-mark');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            collabCompleted(checkMark.dataset.id);
        });
    });
}

//Creates an eventListener for every single collaboration delete
function collabEventListenersDelete() {
    var todoCheckMarks = document.querySelectorAll('.item_container .collab-delete-text');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            deleteCollabTask(checkMark.dataset.id);
        });
    });
}

//Mark a collab task as completed
function collabCompleted(id) {

    let item = db.collection("collaboration").doc(id);
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
                });
                document.querySelector("#done").style.display = "none";
            }
        }
    });
}

//Function that deletes a task
function deleteCollabTask(id) {
    let item = db.collection("collaboration").doc(id);
    item.delete().catch(error => {
        alert("Error deleting document: ", error);
    });
    document.querySelector("#done").style.display = "none";
}