var items =  [];
const setUpTasksLayout = (data) => {


    data.forEach(element => {
        items.push(element.data());
    });

    let container = '';
    var i = 0;
    items.forEach(docs => {
        const li = `
        <div class="item_container">
          <input type="checkbox" id="checkbox">
          <p id="task_name">${items[i].text}</p>
        </div>
    `;
        container += li;
        i++;
    });
    document.querySelector('.theContainer').innerHTML = container;
    var checkbox = document.querySelector('#checkbox');
}