export function createLocalStorage(name,email,password){
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password",password);
  }
  export function getLocalStorage(email,password){
    localStorage.getItem(email)
    localStorage.getItem(password)
  }