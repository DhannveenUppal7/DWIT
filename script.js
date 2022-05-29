var email;
var password;


function signUpNow() {
    window.location.replace("signup.html")
}
function signInNow() {
    window.location.replace("index.html")
}



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user.emailVerified) {
            window.location.replace("dwit.html")
        }
    } else {
        console.log("Not Signed Up or Signed In Yet")
    }
});

function signUp() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    if (email != "" && password != "") {
        var length = Number(password.length)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == true) {
            if (length >= 7) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        localStorage.setItem("email", email)
                        window.location.replace("verify.html");


                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
            }
            else {
                window.alert("Enter a password which has minimum length of 7 Characters")
            }
        }
        else {
            window.alert("Enter a Valid Email")
        }

    }
    else {
        window.alert("Please Enter the Email And Password To Sign Up")
    }
}

function login() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    if (email != "" && password != "") {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                localStorage.setItem("email", email)
                window.location.replace("dwit.html");
            })
            .catch((error) => {
                window.alert("Incorrect Email Or Password")
            });

    }
    else {
        window.alert("Please Enter the Email And Password To Sign In")
    }
}


