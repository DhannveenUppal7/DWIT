var email = localStorage.getItem("email")

function countCharacter(str, char) {

    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === char)
            count++;
    }
    return count;
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.replace("index.html");
    }
});


function load() {
    document.getElementById("email").innerHTML = email;
    document.getElementById("loading").style.display = "none";
    getData();
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html")
    }).catch(function (error) {
        console.log("An error occured")
    });
}
function send() {
    var message = document.getElementById("message").value
    var time  = new Date();
    finalMessage = "Dwit from " + email + " - " + message;
    var msgObject = {
        message: finalMessage,
        likes: 0,
    }
    
    if (message != "") {
        firebase.database().ref("/").child("Dwits").push(msgObject);
        document.getElementById("loading").style.display = "";
        document.getElementById("container").style.display = "none";
        setTimeout(() => {
            window.location = "dwit.html"
        }, 3000);
    }

}
function status() {
    window.location.replace("status.html")
}
function getData() {
    firebase.database().ref("/" + "Dwits").on('value', function (snapshot) {
        document.getElementById("dwits").innerHTML = "<br>";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            dwit = childData['message'];
            like = childData['likes'];
            row = "<div style='border-radius:30px; border: 2px solid gray; margin: 30px; padding: 20px'><h4> " + dwit + "<br><img src='thumbsUp.png'><button class='btn btn-success' id='" + childKey + "' value='" + like + "' onclick='updateLike(this.id)'><span >Likes: " + like + "</span></button></h4></div><hr />";
            document.getElementById("dwits").innerHTML += row;
        });
    });
}


function updateLike(dwit_id) {
    if (localStorage.getItem(dwit_id + " likes") != null) {

    }
    else {
        id = dwit_id;
        likes = document.getElementById(id).value;
        console.log(likes);
        likes_in_number = Number(likes) + 1;
        console.log(likes_in_number);

        firebase.database().ref("/").child("Dwits").child(id).update({
            likes: likes_in_number
        });
        localStorage.setItem(dwit_id + " likes", dwit_id)
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
