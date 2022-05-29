function countCharacter(str, char) {

    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === char)
            count++;
    }
    return count;
}

