import axios from 'axios';

export default {
  // data() {
  //   return {
  //     info: '',
  //   };
  // },
  created() {
    // axios
    // .get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.results}&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`)
    //         .then(response => (response.data.site = "Last FM",this.info = response.data, console.log(this.info)))
    // console.log('Spotify created');
    // console.log(this.info);

      // axios.get(
      //   `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.results}&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      //  ).then(
      //   res => {
      //     this.info = res;
      //     // this.artist_url = res.data.artist.image[3]["#text"];
      //     console.log(this.info);
      //     // this.artist_url.push(res.data.artist.image[3]["#text"]);
      //   //  console.log(res) 
      //   for(var i =0; i < res.data.artist.similar.artist.length;i++){
      //     this.similar[i] = res.data.artist.similar.artist[i];
      //       // console.log(res.data.artist.similar.artist[i].image[3]["#text"]);
      //       this.artist_url.push(res.data.artist.similar.artist[i].image[3]["#text"]);
      //   }
      //   console.log(this.similar);
      //   console.log(this.artist_url);
      //    return { index: res}
      //   }
      //  )

      //artist search w/similar artists
            axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.results}&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
       ).then(
        res => {
          this.info = res;
          console.log(this.info);
         console.log(res); 
        for(var i =0; i < res.data.artist.similar.artist.length;i++){
          this.similar[i] = res.data.artist.similar.artist[i];
            // console.log(res.data.artist.similar.artist[i].image[3]["#text"]);
            this.artist_url.push(res.data.artist.similar.artist[i].image[3]["#text"]);
        }
        console.log(this.similar);
        console.log("ARIST URL "+this.artist_url);
         return { index: res}
        }
       )

       //albums search
      //  axios
      //  .get(
      //    `http://ws.audioscrobbler.com/2.0/?method=album.search&album=Ultralife&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      //  )
      //  .then(res => {
      //    //   this.info = res;
      //    //   console.log(this.info);
      //    console.log(res);
      //    this.album = res.data.results.albummatches.album[0];
      //    //  console.log(res.data.results.albummatches.album[0])
      //    console.log(this.album);
      //    // console.log(this.album.artist);
      //    // console.log( this.album.image[3]["#text"]);
      //    this.albumImg = this.album.image[3]["#text"];
      //    return { index: res };
      //  });
   
  },
  updated() {

  },
 actions: {

  },
};

// export default function() {
//   getArtistBySearch(query) {
//     return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${query}&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`)
//         .then(response => {
//           this.response = response.data
//           return this.response;
//         });
//     }
// };