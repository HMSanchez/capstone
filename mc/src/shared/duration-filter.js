export default function (time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    // console.log(minutes);
    // console.log(seconds);
    if (seconds.toString().length < 2){
      return `${minutes}:0${seconds}`;
    }else if(minutes.toString().length + seconds.toString().length < 3){
      return `${minutes}:${seconds}0`;
    }else{
      return `${minutes}:${seconds}`;
    }
  }
  