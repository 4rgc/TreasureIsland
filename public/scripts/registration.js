function registerClicked() {
    validateEmail();
}

function validateEmail(eval) {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(eval))
  {
    return (true)
  }
    return (false)
}

document.onload = () => {
    document.getElementById('register').onclick = () => {};//registerClicked;
}