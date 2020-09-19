function validateEmail(eval) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(eval))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
