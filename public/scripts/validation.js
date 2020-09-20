function message(){
    window.alert("You are registered");
  }
  function validate(eval,pwd)
  {
    var uletter=/[A-Z]/;
    var letter = /[a-z]/;
    var number = /[0-9]/;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(eval))
    {
      if (pwd.length < 8 || !letter.test(pwd) || !number.test(pwd) || !uletter.test(pwd)) {
        window.alert("Password should contain atleast 1 uppercase letter, 1 lowercase letter and 1 number with minimum length of 8 characters");
      }
      else{
        message();
        
      }
    }
    else{
    window.alert("You have entered an invalid email address!");
    return (false);
    }


  }

  function validateEmail(eval)
  {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(eval))
      {
        window.alert("Password reset mail sent to registered email id");
      }
      alert("You have entered an invalid email address!")
      return (false)
  }