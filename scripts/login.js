const loginForm = document.getElementById("loginForm");
const finalValidation = document.getElementById("final-validation");

loginForm.addEventListener("submit", handleSubmit);
var logindata = {};
function handleSubmit(event) {
  event.preventDefault();
  console.log("hello");
  const data = new FormData(event.target);

  const emailorusername = data.get("emailorusername");
  const password = data.get("password");
  //   const confirmPassword = data.get("confirmPassword");
  //   logindata = { email, username, password, confirmPassword };
  console.log({ emailorusername, password });
  if (emailorusername.length > 0 && password.length > 0) {
    validateEmail(emailorusername)
      ? login({ email: emailorusername, password }, "email")
      : login({ username: emailorusername, password }, "username");
  } else {
    finalValidation.innerHTML = `Please fill all the required fields`;
    setTimeout(() => {
      finalValidation.innerHTML = ``;
    }, 2000);
  }
}

function login(data, type) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (type === "email") {
    if (user.email === data.email && user.password === data.password) {
      window.location.href = "index.html";
    } else {
      finalValidation.innerHTML = `Invalid Email or Password`;
      setTimeout(() => {
        finalValidation.innerHTML = ``;
      }, 2000);
    }
  } else {
    if (user.username === data.username && user.password === data.password) {
      window.location.href = "index.html";
    } else {
      finalValidation.innerHTML = `Invalid Username or Password`;
      setTimeout(() => {
        finalValidation.innerHTML = ``;
      }, 2000);
    }
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
