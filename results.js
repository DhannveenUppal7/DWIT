var email = localStorage.getItem("email")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.replace("index.html");
    }
});



function load() {
    document.getElementById("email").innerHTML = email;
    document.getElementById("results").style.display = "none";
    var storedResults = JSON.parse(localStorage.getItem("searchResult"))
    // console.log(storedResults);
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").style.display = "";
    }, 2500);
    for (d = 0; d < storedResults.length; d++) {

        numberOfDots = countCharacter(email, ".")
        for (i = 0; i < numberOfDots.count; i++); {
            finalAppend = storedResults[d].replace(",", ".");
        }

        localStorage.removeItem("searchResult")  
              
        elements = "<h3>" + finalAppend + "</h3><br>"
        document.getElementById("results").innerHTML += elements
    }
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html")
        localStorage.removeItem("email")
        localStorage.removeItem("searchResult")
    }).catch(function (error) {
        console.log("An error occured")
    });
}