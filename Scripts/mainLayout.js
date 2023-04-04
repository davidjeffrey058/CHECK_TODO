
const setUpTasksLayout = (data, email) => {
    var items = [];

    data.forEach(element => {
        items.push({
            id: element.id,
            ...element.data()
        });
    });
    console.log(items);

    let container = '';
    var i = 0;
    items.forEach(docs => {
        const li = `
        <div class="item_container">
            <div data-id="${items[i].id}" class="check-mark ${items[i].status == "completed" ? "checked":""}">
                <img src="images/icon-check.svg">
            </div>
          <p class="task_name ${items[i].status == "completed" ? "checked":""}">${items[i].text}</p>
          <div data-id="${items[i].id}" class="delete-text ${items[i].status == "completed" ? "checked":""}">Delete</div>
        </div>
    `;
        container += li;
        i++;
    });
    document.querySelector('.theContainer').innerHTML = container;
    createEventListeners(email);
    createEventListenersDelete(email);
}

//Creates an eventListener for every single checkbox
function createEventListeners(Email){
    var todoCheckMarks = document.querySelectorAll('.item_container .check-mark');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function(){
            markCompleted(checkMark.dataset.id, Email);
        });
    });
}

//Creates an eventListener for every single delete
function createEventListenersDelete(Email){
    var todoCheckMarks = document.querySelectorAll('.item_container .delete-text');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function(){
            deleteTask(checkMark.dataset.id, Email);
        });
    });
}

//Function that fires when a checkbox is clicked
function markCompleted(id, e){
    let item = db.collection(e).doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "completed"
                })
            }else if(status == "completed"){
                item.update({
                    status: "active"
                })
            }
        }
    });
}

//Function that deletes a task
function deleteTask(id, e){
    let item = db.collection(e).doc(id);
    item.delete().then(()=>{
        alert("Deleted successfully");
    }).catch(error => {
        alert("Error deleting document: ", error);
    })
}