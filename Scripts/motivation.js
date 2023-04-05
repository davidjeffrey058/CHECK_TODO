const url = "https://api.quotable.io/random";
// var btn = document.getElementById("new");

async function getQuote () {
  // var quotes = [];
  var container = '';
  for(var i = 0; i < 5; i++){
    await fetch(url)
    .then((data) => data.json())
    .then((item) => {
      // console.log(item);
      // console.log(item.content);
      // console.log(item.author);
      let li = `
      <p class="quote">${item.content}</p>
      <p class="author">Author: <i>${item.author}</i></p>
      <hr width="100%" color="grey" size="0.5px">
      `;
      container += li;
    });
    
  }
  document.querySelector(".quote-container").innerHTML = container; 
};
window.addEventListener("load", getQuote());
//btn.addEventListener("click", getQuote);