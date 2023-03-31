
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
          <input data-id="${items[i].id}" type="checkbox" class="checkbox ${items[i].status == "completed" ? "checked":""}">
          <p class="task_name ${items[i].status == "completed" ? "checked":""}">${items[i].text}</p>
        </div>
    `;
        container += li;
        i++;
    });
    document.querySelector('.theContainer').innerHTML = container;
    createEventListeners(email);
    
}

//Creates an eventListener for every single checkbox
function createEventListeners(Email){
    var todoCheckMarks = document.querySelectorAll('.item_container .checkbox');
    var taskName = document.querySelector('#task_name');

    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function(){
            markCompleted(checkMark.dataset.id, Email);
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