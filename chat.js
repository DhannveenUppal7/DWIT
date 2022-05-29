var email = localStorage.getItem("email")
var message = document.getElementById("message").value
var emailTo = document.getElementById("emailto").value
var userData = JSON.parse(localStorage.getItem(email + "lastEmails"));



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.replace("index.html");
    }
});

function load() {
    document.getElementById("email").innerHTML = email;
    showEmails();
    $('#lastcontacts a').click(function () {
        var txt = $(this).text();
        localStorage.setItem(email + "emailChk", txt);
    });
    document.getElementById("loading").style.display = "none";
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


function send() {
    var message = document.getElementById("message").value
    finalMessage = "Message from " + email + " - " + message
    var emailTo = document.getElementById("emailto").value

    

    if (message != "") {
        var database = firebase.database();
        var ref = database.ref("Chats");

        
        var finalEmailTo = emailTo
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // finalEmailTo = finalEmailTo.replace(".", ",")
        // console.log(finalEmailTo);

        var numberOfDots = countCharacter(finalEmailTo, ".")


        for (var i = 0; i < numberOfDots; i++) {
            finalEmailTo = finalEmailTo.replace(".", ",")
            
        }

        

       

        var emailId = ref.child(finalEmailTo);
        
        var data = {
            messages: message,
            messageBy: email
            
        }
        emailId.push(data)
        var lastEmails = [];
        var currentUserData = JSON.parse(localStorage.getItem(email + "lastEmails"));

        if (currentUserData != null) {
            lastEmails = currentUserData;
            lastEmails.push(finalEmailTo)
            console.log(lastEmails)
            localStorage.setItem(email + "lastEmails", JSON.stringify(lastEmails));
            console.log(lastEmails)
            showEmails();
            document.getElementById("loading").style.display = "";
            document.getElementById("container").style.display = "none";
            setTimeout(() => {
                window.location.replace("chat.html")
            }, 3000);

        }
        else {
            lastEmails.push(finalEmailTo);
            console.log(lastEmails);
            localStorage.setItem(email + "lastEmails", JSON.stringify(lastEmails));
            showEmails();
        }

    }

}
function status() {
    window.location.replace("status.html")
}

function showEmails() {
    finalApend = [...new Set(userData)];
    if (userData != null) {
        for (i = 0; i < finalApend.length; i++) {
            // var passedEmail = finalMessage
            append1 = finalApend[i].replace(",", ".")
            append2 = append1.replace(",", ".")
            a = document.createElement('a');
            a.innerHTML = append2;
            a.href = "viewchat.html";
            // a.onclick = setEmail();
            a.target = "_blank";
            br = document.createElement('br')
            document.getElementById("lastcontacts").appendChild(a);
            document.getElementById("lastcontacts").appendChild(br);
        }

    }
}

