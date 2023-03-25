var items =  [];
const setUpTasksLayout = (data) => {


    data.forEach(element => {
        items.push(element.data());
    });

    let container = '';
    var i = 0;
    items.forEach(docs => {
        const li = `
    <li>
        <div><b>Content: </b>${items[i].text}</div>
        <div><b>Category: </b>${items[i].category}</div>
        <div><b>Status: </b>${items[i].status}</div><br>
    </li>
    `;
        container += li;
        i++;
    });
    document.querySelector('.tasks').innerHTML = container
}