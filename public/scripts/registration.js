

function registerClicked() {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  httpPostAsync('/login/register', `username=${username}&email=${email}&password=${password}`, (res) => {
      let obj = JSON.parse(res);
        if(obj['success']){
            window.location = '/signin.html'
        }
  })
}