
function homeMethod(e){
    e.preventDefault();
    const home = `
    <div class="home_section">This is the home page</div>
`;
const theBody = document.querySelector('.the_body');
    theBody.innerHTML = home;
}

function profileMethod(e){
    e.preventDefault();
    const profile = `
    <div class="profile_section">This is the profile page</div>
`;
const theBody = document.querySelector('.the_body');
    theBody.innerHTML = profile;
}

function settingsMethod(e){
    e.preventDefault();
    const settings = `
    <div class="settings_section">This is the settings page</div>
`;
const theBody = document.querySelector('.the_body');
    theBody.innerHTML = settings;
}