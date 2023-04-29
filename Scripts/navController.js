
var links = document.querySelectorAll('.sidenav a');

links.forEach(function (link) {
  link.addEventListener('click', function (event) {
    links.forEach(function (link) {
      link.classList.remove('active');
    });
    event.target.classList.add('active');

    var linkName = event.target.textContent;

    switch (linkName) {
      case "Home":
        document.querySelector(".main").style.display = "grid";
        document.querySelector(".important-list").style.display = "none";
        document.querySelector(".category-list").style.display = "none";
        document.querySelector(".collaborations").style.display = "none";
        document.querySelector(".submenu").style.display = "none";
        break;
      case "Important":
        document.querySelector(".main").style.display = "none";
        document.querySelector(".important-list").style.display = "block";
        document.querySelector(".category-list").style.display = "none";
        document.querySelector(".collaborations").style.display = "none";
        document.querySelector(".submenu").style.display = "none";
        break;
      case "Category":
        document.querySelector(".submenu").style.display = "block";

        break;
      case "Collaborations":
        document.querySelector(".main").style.display = "none";
        document.querySelector(".important-list").style.display = "none";
        document.querySelector(".category-list").style.display = "none";
        document.querySelector(".collaborations").style.display = "grid";
        document.querySelector(".submenu").style.display = "none";
        break;
    }

    // if(linkName == "Home"){
    // document.querySelector(".main").style.display = "grid";
    // document.querySelector(".important-list").style.display = "none";
    // document.querySelector(".category-list").style.display = "none";
    // document.querySelector(".collaborations").style.display = "none";
    // document.querySelector(".submenu").style.display = "none";

    // }else if(linkName == 'Important'){
    //   document.querySelector(".main").style.display = "none";
    //   document.querySelector(".important-list").style.display = "block";
    //   document.querySelector(".category-list").style.display = "none";
    //   document.querySelector(".collaborations").style.display = "none";
    //   document.querySelector(".submenu").style.display = "none";

    // }else if(linkName == "Category"){
    //   // document.querySelector(".main").style.display = "none";
    //   // document.querySelector(".important-list").style.display = "none";
    //   //  document.querySelector(".category-list").style.display = "block";
    //   // document.querySelector(".collaborations").style.display = "none";
    //   document.querySelector(".submenu").style.display = "block";
    // }else if(linkName == "Collaborations"){
    //   document.querySelector(".main").style.display = "none";
    //   document.querySelector(".important-list").style.display = "none";
    //   document.querySelector(".category-list").style.display = "none";
    //   document.querySelector(".collaborations").style.display = "grid";
    //   document.querySelector(".submenu").style.display = "none";

    // }
  });
});

// var submenuLinks = document.querySelector(".submenu a");

// submenuLinks.forEach(function (sublinks) {
//   sublinks.addEventListener("click", function (event) {
//     console.log(event.target);
//   })
// })

