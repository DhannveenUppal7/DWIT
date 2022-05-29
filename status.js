var email = localStorage.getItem("email")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.replace("index.html");
    }
});


function load() {
    document.getElementById("email").innerHTML = email;
    getMessages();
    document.getElementById("loading").style.display = "none";
}
function countCharacter(str, char) {

    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === char)
            count++;
    }
    return count;
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
    

    var numberOfDots = countCharacter(finalEmail, ".")
    for (let i = 0; i < numberOfDots; i++) {
        finalEmail = finalEmail.replace(".", ",");
        
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
// function createMessages(message) {
//     p = document.createElement("p");
//     p.innerHTML = message;
//     document.getElementById("messages").appendChild(p)
// }

function send() {
    var message = document.getElementById("message").value
    var orignalMessageCreated = document.getElementById("message").value
    if (message != "") {

        
        var finalEmail = email
        
        var numberOfDots = countCharacter(finalEmail, ".")
        for (let i = 0; i < numberOfDots; i++) {
            finalEmail = finalEmail.replace(".", ",");
            
        }

        
        var database = firebase.database();
        var ref = database.ref("Chats")
        var emailId = ref.child(finalEmail);

        numberOfDotsM = countCharacter(message, ".")
        for (i = 0; i < numberOfDotsM; i++); {
            message = message.replace(",", ".");
        }

        finalmessage = message;
        var data = {
            messages: finalmessage,
            messageBy: email
        }
        emailId.push(data);
        document.getElementById("container").style.display = "none";
        document.getElementById("loading").style.display = "";
        setTimeout(function () {
            document.getElementById("loading").style.display = "none";
            window.location.replace("status.html");
        }, 3000);
    }
    else {
        window.alert("Enter the message to send");
    }
}