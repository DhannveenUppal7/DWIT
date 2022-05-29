// Seach Algorithm
// Algorithm Made for Searching
// Dhannveen Uppal 2020

function search() {
    query = document.getElementById("query").value;
    if (query != "") {
        var searchResults = [];
        console.log(query);
        firebase.database().ref("/" + "Dwits").on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                checkingKey = childKey.toLowerCase();
                childData = childSnapshot.val();
                
                valued2 = query.toLowerCase();
                check = valued2.split(" ")
                localStorage.setItem("searchResult", JSON.stringify(searchResults));
                for (i = 0; i < check.length; i++) {
                    if (checkingKey.includes(check[i])) {
                        console.log(childKey);
                        searchResults.push(childData["dwit"]);
                        console.log(searchResults)
                        // if searchResults == 
                        localStorage.setItem("searchResult", JSON.stringify(searchResults));
                        window.location = "results.html";
                    }
                    
                    
                }
                
                

            });
        });
    }
    else {
        window.alert("Enter Query To Search")
    }
}