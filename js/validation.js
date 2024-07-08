document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed"); // To check if the script runs
    const validation = new JustValidate('#signup');

    validation
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Name is required',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required',
            },
            {
                rule: 'email',
                errorMessage: 'Email is not valid',
            },
            {
                validator: (value) => () => {
                    return fetch("validate-email.php?email=" + encodeURIComponent(value))
                    .then(function (response) {
                        return response.json();
                    }).then((json) => {return json.available;})
                },
                errorMessage: "email already taken"
            }
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required',
            },
            {
                rule: 'minLength',
                value: 6,
                errorMessage: 'Password must be at least 6 characters long',
            },
        ]).addField('#password_confirmation', [
            {
                rule: 'required',
                errorMessage: 'Password confirmation is required',
            },
            {
                validator: (value, fields) => {
                    return value === fields["#password"].elem.value;
                },
                errorMessage: "Passwords should match"
            },
        ]).onSuccess((event) => {
            document.getElementById("signup").submit();
        })
});