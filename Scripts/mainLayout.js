
const setUpTasksLayout = (data, email) => {
    var items = [];
    var importantItems = [];

    data.forEach(element => {
        items.push({
            id: element.id,
            ...element.data()
        });
    });
    //console.log(items);

    let container = '';
    var i = 0;
    items.forEach(docs => {
        const li = `
        <div class="item_container">
            <div data-id="${items[i].id}" class="check-mark ${items[i].status == "completed" ? "checked":""}">
                <img src="images/icon-check.svg">
            </div>
            <div class="text-container">
                <p class="task_name ${items[i].status == "completed" ? "checked":""}">${items[i].text}</p>
                <label class="task_category">${items[i].category}</label>            
            </div>
          <div class="star-container ${items[i].important == true ? "important" : ""}" data-id="${items[i].id}" title="Mark as important">
            <i class="fa-solid fa-star"></i>
          </div>
          <div title="Delete task" data-id="${items[i].id}" class="delete-text ${items[i].status == "completed" ? "checked":""}">
            <i class="fa-regular fa-trash-can fa-bounce fa-xl" style="color: #ff0000;"></i>
          </div>
        </div>
    `;
        container += li;
        i++;
    });
    document.querySelector('.theContainer').innerHTML = container;

    //Copying the important items into the important list
    importantItems = items.filter(function(obj){
        return obj.important === true;
    });

    // console.log(importantItems);
    let temp = '';
    var j = 0;
    importantItems.forEach(docs => {
        const li = `
        <div class="item_container">
        <div data-id="${importantItems[j].id}" class="check-mark ${importantItems[j].status == "completed" ? "checked":""}">
            <img src="images/icon-check.svg">
        </div>
        <div class="text-container">
            <p class="task_name ${importantItems[j].status == "completed" ? "checked":""}">${importantItems[j].text}</p>
            <label class="task_category">${importantItems[j].category}</label>            
        </div>
      <div class="star-container ${importantItems[j].important == true ? "important" : ""}" data-id="${importantItems[j].id}" title="Mark as important">
        <i class="fa-solid fa-star"></i>
      </div>
      <div title="Delete task" data-id="${importantItems[j].id}" class="delete-text ${importantItems[j].status == "completed" ? "checked":""}">
        <i class="fa-regular fa-trash-can fa-bounce fa-xl" style="color: #ff0000;"></i>
      </div>
    </div>
        `;

        temp += li;
        j++;
    });
    document.querySelector('.important-container').innerHTML = temp;

    createEventListeners(email);
    createEventListenersDelete(email);
    createEventListenersImportant(email);
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

//Creates an eventListener for every single important
function createEventListenersImportant(Email){
    var todoImportant = document.querySelectorAll('.item_container .star-container');

    todoImportant.forEach((important) => {
        important.addEventListener("click", function(){
            importantTask(important.dataset.id, Email);
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
    item.delete().catch(error => {
        alert("Error deleting document: ", error);
    })
}

//Function that adds a task to important
function importantTask(id, e){
    let item = db.collection(e).doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            let priority = doc.data().important;
            if(priority == true){
                item.update({
                    important: false
                })
            }else if(priority == false){
                item.update({
                    important: true
                })
            }
        }
    });
}