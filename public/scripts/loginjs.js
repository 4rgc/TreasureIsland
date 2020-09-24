// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only


var pwShown = 0;

function show() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'text');
}

function hide() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'password');
}

function logInClicked() {
    let username = document.getElementById('txt-input').value;
    let password = document.getElementById('pwd').value;
    console.log('got the elements')
    httpPostAsync('http://api.treasureisland.tech/login/authorize', `username=${username}&password=${password}`, (res) => {
        console.log("got the response: " + res)
        let obj = JSON.parse(res);
        if(obj['success']){
            console.log('looks like you know the password...')
            window.location = '/index.html'
        }
    })
    return false;
}
document.onload = () => {
    document.getElementById("eye").addEventListener("click", function () {
        if (pwShown == 0) {
            pwShown = 1;
            show();
        } else {
            pwShown = 0;
            hide();
        }
    }, false);
}
