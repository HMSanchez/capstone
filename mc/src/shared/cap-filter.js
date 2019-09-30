export default function(str) {

       var words = str.split(" ");
       var arr = [];
       for (var i=0;i< words.length;i++)
       {
         var temp = words[i].toLowerCase();
          temp = temp.charAt(0).toUpperCase() + temp.substring(1);
          arr.push(temp);
       }
       return arr.join(" ");
    
}