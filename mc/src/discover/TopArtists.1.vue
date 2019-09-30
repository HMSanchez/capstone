<template>
    <div>
        <div class="content" id="add">
            <h2 class="content-head is-center">Top Artists</h2>
            <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        <!-- <li class="pure-menu-item pure-menu-selected"><a class="pure-menu-link">Home</a></li> -->
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a id="menuLink1" class="pure-menu-link">Filters</a>
            <ul class="pure-menu-children">
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Listeners</a></li>
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Playcount</a></li>
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Genre</a></li>
                <!-- <li class="pure-menu-item"><a href="#" class="pure-menu-link">Tumblr Blog</a></li> -->
            </ul>
        </li>
    </ul>
</div>

            <div class="pure-g">
                <div v-if="topArtists.length > 0">
                <div v-for="(artist, index) in topArtists" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
                    <div @click="toArtist(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-2 is-center" >
                        {{index+1}}. {{artist.name}}
                        <img :src="topArtists[index].image[1]['#text']">            
                    </div>
                </div>
                </div>
            </div>

                      <paginate
    :page-count="maxPages"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate";

export default {
  name: "TopArtists",
  data() {
    return {
      artist: {},
      topArtists: [],
      pageNumber: 1,
      songCount: 50,
      maxPages: 20,
      query: "",
      tags: []
    };
  },
  methods: {
    toArtist(artistIndex) {
      this.$router.push({
        name: "ArtistPage",
        params: {
          name: this.topArtists[artistIndex].name
        }
      });
    },
    listen(event) {
      // console.log(event.target.innerHTML);
      switch (event.target.innerHTML) {
        case "Listeners":
          this.topArtists = _.orderBy(this.topArtists, "listeners", "desc");

          break;
        case "Playcount":
          this.topArtists = _.orderBy(this.topArtists, "playcount", "desc");
          break;
        default:
          this.topArtists = this.topArtists;
      }
    },
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.topArtists = [];
      console.log(this.pageNumber);

      axios
        .get(
          ` http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&page=${
            this.pageNumber
          }&limit=${
            this.songCount
          }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
        )
        .then(res => {
          // console.log(res);
          // this.maxPages = parseInt(res.data.artists["@attr"].totalPages);
          for (var i = 0; i < this.songCount; i++) {
            //   this.trackRanks.push(res.data.artists.artist[i]["@attr"].rank);
            this.topArtists.push(res.data.artists.artist[i]);
            this.topArtists[i].listeners = parseInt(
              this.topArtists[i].listeners
            );
            this.topArtists[i].playcount = parseInt(
              this.topArtists[i].playcount
            );
          }
        });
    }
  },
  created() {
    axios
      .get(
        ` http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&page=${
          this.pageNumber
        }&limit=${
          this.songCount
        }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(res => {
        console.log(res);
        // this.maxPages = parseInt(res.data.artists["@attr"].totalPages);
        this.maxPages = 50;
        for (var i = 0; i < this.songCount; i++) {
          //   this.trackRanks.push(res.data.artists.artist[i]["@attr"].rank);
          this.topArtists.push(res.data.artists.artist[i]);
          this.topArtists[i].listeners = parseInt(this.topArtists[i].listeners);
          this.topArtists[i].playcount = parseInt(this.topArtists[i].playcount);
        }
          //// GET TAGS////
          var songnames = [];
          Array.prototype.forEach.call(
            res.data.artists.artist.slice(0, this.songCount),
            user => {
              // console.log(user.name);
              songnames.push(user.name);
            }
          );

          const arr = [];
          for (var j = 0; j < songnames.length; j++) {
            const songsUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${songnames[j]}&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`;
            arr.push(axios.get(songsUrl));
          }

          Promise.all(arr).then(res => {
            for (var h = 0; h < this.songCount; h++) {
              console.log(res[h].data);
              // this.song = res[h].data.track;
              // console.log(this.song);

              // if (res[h].data.track.album && !res[h].data.message) {
              //   this.song = res[h].data.track;
              //   // console.log(this.song);
              //   this.tracksInfo.push(this.song);
              //   this.topTracksUrl.push(
              //     res[h].data.track.album.image[1]["#text"]
              //   );
              // } else {
              //   // console.log("invalid");
              //   this.song = res[h].data.track;
              //   // console.log(this.song);
              //   this.tracksInfo.push(this.song);
              //   this.topTracksUrl.push(
              //     "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
              //   );
              // }
            }
          });
      });
  }
};
</script>

<style scoped>
#add {
  margin-top: 100px;
}
</style>

