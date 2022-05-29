firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // window.location.replace("dwit.html");
        console.log(user);
        if (user.emailVerified) {
            console.log(true)
            window.location.replace("dwit.html")
        }
        else {
            user.sendEmailVerification().then(() => {
                if (user.emailVerified) {
                    console.log();
                    window.location.replace("dwit.html")
                }
                else {
                    setTimeout(() => {
                        user.delete().then(() => {
                            window.alert("You Did not Verify Your Email Within 3 minutes hence your account is deleted")
                        })
                    }, 120000);
                }
            })
        }

    } else {
        console.log("Not Signed Up or Signed In Yet")
    }
});