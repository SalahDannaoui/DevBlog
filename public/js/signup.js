const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        if (password.length >= 8) {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert(response.statusText);
            }
        } else {
            alert('password must be greater than or equal to 8 characters!')
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);