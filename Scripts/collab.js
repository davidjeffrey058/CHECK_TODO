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
      <div title="Delete task" data-id="${docs.id}" class="delete-text ${docs.status == "completed" ? "checked" : ""}">
        <i class="fa-regular fa-trash-can fa-bounce fa-xl" style="color: #ff0000;"></i>
      </div>
    </div>
        `;
        container += li;    
    });
    
    return container;
}

//Creates an eventListener for every single collaboration checkbox
function collabCheckboxEventListener(Email) {
    var todoCheckMarks = document.querySelectorAll('.collab_container .collab-check-mark');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            collabCompleted(checkMark.dataset.id, Email);
        });
    });
}

function collabCompleted(id, e,) {

    let item = db.doc("/collaboration/JMEpR1X3jzDejR7FWeqm/task/bA0Iw6JhgwxRZGFo6IFn");
    item.get().then(function (doc) {
        if (doc.exists) {
            let status = doc.data().tasks[id].status;
            const value = "tasks." + id + ".status";
            if (status == "active") {
                item.update({
                    [value]: "completed"
                })
            } else if (status == "completed") {
                item.update({
                    [value]: "active"
                });
                // document.querySelector("#done").style.display = "none";
            }
        }
    });
}