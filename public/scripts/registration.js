

window.onload = () => {
  document.getElementById('register-form').onsubmit = () => {
    console.log('register')
  
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  console.log('got the elements')
  httpPostAsync('http://api.treasureisland.tech/login/register', `username=${username}&email=${email}&password=${password}`, (res) => {
    console.log("got the response: " + res)
      let obj = JSON.parse(res);
        if(obj['success']){
            window.location = '/signin.html'
        }
  })
  return false;
  }
}