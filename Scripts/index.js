//function to show the login form when the button is cliked 
function show_login_form(){
    var show_login=document.getElementById("loginForm")
    var button_1=document.getElementById("CREATE");
    var button_2=document.getElementById("LOGIN_BTN");
    //is statment to check is the form is being displayed or not if it is its hides it if not it displayes it 
if(show_login.style.display="none"){
    show_login.style.display="block";
}
//hide the old buttons when the forms display
if(show_login.style.display="block"){
    button_1.style.display="none";
    button_2.style.display="none";
}
}
//function to show the registration form when the button is cliked 
function show_Reg_form(){
    var show_reg=document.getElementById("user_details");
    var button_1=document.getElementById("CREATE");
    var button_2=document.getElementById("LOGIN_BTN");
    //is statment to check is the form is being displayed or not if it is its hides it if not it displayes it 
if(show_reg.style.display="none"){
    show_reg.style.display="block";
}
//hide the old buttons when the forms display
if(show_reg.style.display="block"){
    button_1.style.display="none";
    button_2.style.display="none";
}
}
