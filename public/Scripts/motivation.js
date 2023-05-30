const url = "https://api.quotable.io/random";
// var btn = document.getElementById("new");
window.addEventListener('load', getQuote(0));
async function getQuote (number) {
  // var quotes = [];
  if(number == 1){
    document.querySelector(".spinner").style.display = "inline-block";
  }

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
  document.querySelector(".spinner").style.display = "none";
};
