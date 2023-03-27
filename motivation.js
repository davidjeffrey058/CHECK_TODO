// let quote=document.getElementById("quote").innerHTML;
// let author =document.getElementById("name").innerHTML;
//  let quotebutton=document.getElementById("button");
//  let url="https://api.quotable.io/random";
// //  function randomequote(){
// //     fetch(url)
// //     .then((data) => data.json())
// //     .then((item) =>{ 
// //         // console.log(item.content); 
// //         // console.log(item.author);
// //         quote.innerText = item.content;
// //         author.innerText = item.author;

// //     });
// //  }

// let getquote = () =>{
//     fetch(url)
//     .then((data) => data.json())
//     .then((item) =>{ 
//         console.log(item.content); 
//         console.log(item.author);
//         quote.innerText = item.content;
//         author.innerText = item.author;
// });

// }
// window.addEventListener("load",getquote);
// quotebutton.addEventListener("click",getquote);

const url = "https://api.quotable.io/random";
var btn = document.getElementById("new");

function getQuote () {
var quote = document.getElementById("quote");
var author = document.getElementById("author");


  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      console.log(item.content);
      console.log(item.author);
      console.log(quote);
      quote.innerText = item.content;
      author.innerText = item.author;
    });
};
getQuote();
window.addEventListener("load", getQuote);
//btn.addEventListener("click", getQuote);