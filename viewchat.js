var email2 = localStorage.getItem("email")
var email = localStorage.getItem(email2 + "emailChk")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.replace("index.html");
    }
});

function load() {
    document.getElementById("email").innerHTML = email2;
    getMessages();
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

function getMessages() {
    
    var finalEmail = email

    numberOfDots = countCharacter(finalEmail, ".")
    

    for (var i = 0; i < numberOfDots; i++) {
        finalEmail = finalEmail.replace(".", ",")
    }
    console.log(finalEmail);
    var database = firebase.database();
    
    
    var ref = database.ref("Chats")
    var emailId = ref.child(finalEmail);
    emailId.on("value", function (snapshot) {
        document.getElementById("messages").innerHTML = "<br>";
        snapshot.forEach(function (childSnapshot) {

            var values = childSnapshot.val();

            var messages = values.messages;
            var messageBy = values.messageBy;
            console.log(messages)
            createMessages(messages, messageBy);
        });
    })
}
function createMessages(message, messageBy) {
    p = document.createElement("p");
    p.innerHTML = "Message from - " + messageBy + " " + " - " + message;
    document.getElementById("messages").appendChild(p)
}

function send() {
    var message = document.getElementById("message").value
    var messageWhichWasCreated = document.getElementById("message").value
    var finalEmail = email
    if (message != "") {
        numberOfDots = countCharacter(finalEmail, ".")

        for (var i = 0; i < numberOfDots; i++) {
            finalEmail = finalEmail.replace(".", ",")
        }
        
        
        
        var database = firebase.database();
        var ref = database.ref("Chats")
        var emailId = ref.child(finalEmail);

        
        finalmessage = message;
        var data = {
            messages: messageWhichWasCreated,
            messageBy: email2
        }
        emailId.push(data);
        document.getElementById("container").style.display = "none";
        document.getElementById("loading").style.display = "";
        setTimeout(function () {
            document.getElementById("loading").style.display = "none";
            window.location.replace("viewchat.html");
        }, 3000);
    }
    else {
        window.alert("Enter the message to send");
    }
}
