export default function(str) {

    var lastChar = str.charAt(str.length-1);
    var newstr = "";
    // var arr = [];
    if(lastChar == 's'){
        newstr = str+"'";
    }else{
        newstr = str+"'s";
    }

    return newstr;
 
}