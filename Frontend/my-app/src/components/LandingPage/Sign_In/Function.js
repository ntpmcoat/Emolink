const LoginFunction = () => {
    const container = document.querySelector('#forms-container');
    const registerBtn = document.querySelector('#register');
    const loginBtn = document.querySelector('#login');
  
    console.log("cont" + container + " reg" + registerBtn + " log" + loginBtn);
  
    if (container && registerBtn && loginBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });
  
      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    } else {
      console.error('One or more elements not found.');
    }
  };
  
  export default LoginFunction;
  