
function homeMethod(){
    const home = `
    <div class="task_container">
    <h3 class="container_title">Tasks</h3>

    <div class="theContainer">

    </div>

    <form action="" class="addTask" onsubmit="addItem(event)">
      <input type="text" id="task_input" placeholder="+   Add task" required>
      <div class="category_part">
        <label for="">Category</label>
        <select id="categorySelect">
          <option value="None">None</option>
          <option value="Academic">Academic</option>
          <option value="Religious">Religious</option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Activity">Activity</option>
        </select>
      </div>
    </form>
  </div>
`;
const theBody = document.querySelector('.main');
    theBody.innerHTML = home;
}

function importantMethod(e){
    e.preventDefault();
    const important = `
    <div>This is the important page</div>
`;
const theBody = document.querySelector('.main');
    theBody.innerHTML = important;
}

function categoryMethod(e){
    e.preventDefault();
    const settings = `
    <div>This is the settings page</div>
`;
const theBody = document.querySelector('.main');
    theBody.innerHTML = settings;
}