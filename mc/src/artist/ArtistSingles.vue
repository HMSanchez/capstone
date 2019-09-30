<template>
    <div>
        <div class="content" id='add'>
            <h2 v-if="name" class="content-head is-center">{{name | cap(name) | apos(name)}} Top Tracks </h2>
            <div class="pure-g">
                <div v-if="tracksInfo.length > 0">
            <div v-for="(track, index) in tracksInfo" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
              <p class="ranks">{{trackRanks[index]}}.</p> <router-link :to="{name: 'AlbumPage', params: {name: name, albumname: track.name}}"><h4 class="childLink">{{track.name}}</h4></router-link>
            </div>
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
              <img :src="topTracksUrl[index]" onerror="this.onerror=null;this.src=
              'https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png';">            
            </div>
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

  <!-- <div class="paginat">
  <a>&laquo;</a>
  <a>1</a>
  <a class="active">2</a>
  <a >3</a>
  <a >4</a>
  <a >5</a>
  <a >6</a>
  <a>&raquo;</a>
</div> -->
    </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate";

export default {
  name: "ArtistAlbums",
  data() {
    return {
      topAlbums: [],
      topTracks: [],
      topTracksUrl: [],
      tracksInfo: [],
      trackRanks: [],
      albumUrl: [],
      //   song: {},
      artistUrl: "",
      pageNumber: 1,
      songCount: 50,
      maxPages: 20
    };
  },
  props: {
    name: { type: String }
  },
  methods: {
    toArtist() {
      this.$router.push({
        name: "ArtistDetails",
        params: {
          name: this.topTracks[0].artist.name
        }
      });
    },
    toArtistAlbum(albumIndex) {
      if (this.tracksInfo[albumIndex].album) {
        this.$router.push({
          name: "AlbumPage",
          params: {
            name: this.topTracks[0].artist.name,
            albumname: this.tracksInfo[albumIndex].album.title
          }
        });
      } else {
        this.$router.push({
          name: "AlbumPage",
          params: {
            name: this.topTracks[0].artist.name,
            albumname: this.topTracks[albumIndex].name
          }
        });
      }
    },
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.topTracksUrl = [];
      this.topTracks = [];
      this.tracksInfo = [];
      this.trackRanks = [];
      axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&page=${
            this.pageNumber
          }&limit=${this.songCount}&artist=${
            this.name
          }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
        )
        .then(tracksRes => {
          for (var i = 0; i < this.songCount; i++) {
            this.trackRanks.push(
              tracksRes.data.toptracks.track[i]["@attr"].rank
            );
            this.topTracks.push(tracksRes.data.toptracks.track[i]);
          }

          this.artistUrl = this.topTracks[0].image[3]["#text"];

          // console.log(tracksRes.data.toptracks.track.length);
          var songname = [];
          Array.prototype.forEach.call(
            tracksRes.data.toptracks.track.slice(0, this.songCount),
            user => {
              //   console.log(user);
              // songname.push(user.name);
              axios
                .get(
                  `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${
                    this.name
                  }&track=${user.name}&format=json`
                )
                .then(res => {
                  if (res.data.track.album && !res.data.message) {
                    this.song = res.data.track;
                    //   this.arr.push(res.data.track);
                    //   for (var i = 0; i < 10; i++) {
                    this.tracksInfo.push(this.song);
                    this.topTracksUrl.push(
                      res.data.track.album.image[1]["#text"]
                    );
                  } else {
                    this.song = res.data.track;

                    this.tracksInfo.push(this.song);
                    this.topTracksUrl.push(
                      "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
                    );
                  }
                });
              // for (var i = 0; i < 30; i++) {
              //   console.log(`${songname}`);

              //   }
            }
          );
          // }
        });
    }
  },
  created() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&page=${
          this.pageNumber
        }&limit=${this.songCount}&artist=${
          this.name
        }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(tracksRes => {
        // console.log(tracksRes.data.toptracks.track);
        // console.log(tracksRes.data.toptracks["@attr"]);
        // this.maxPages = parseInt(tracksRes.data.toptracks["@attr"].totalPages);
        this.maxPages = 50;
        for (var i = 0; i < this.songCount; i++) {
          // console.log(tracksRes.data.toptracks.track[i]["@attr"]);
          if (tracksRes.data.toptracks.track[i]) {
            this.trackRanks.push(
              tracksRes.data.toptracks.track[i]["@attr"].rank
            );
          } else {
            var rank =
              parseInt(tracksRes.data.toptracks.track[i - 1]["@attr"].rank) + 1;
            console.log(rank.toString());
            this.trackRanks.push(rank.toString());
          }
          this.topTracks.push(tracksRes.data.toptracks.track[i]);
        }
        this.artistUrl = this.topTracks[0].image[3]["#text"];
        var songname = [];
        Array.prototype.forEach.call(
          tracksRes.data.toptracks.track.slice(0, this.songCount),
          user => {
            //   console.log(user);
            // songname.push(user.name);
            axios
              .get(
                `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${
                  this.name
                }&track=${user.name}&format=json`
              )
              .then(res => {
                // console.log(res);
                // console.log(res.data.track);
                if (res.data.track.album && !res.data.message) {
                  this.song = res.data.track;
                  // console.log(this.song);
                  //   this.arr.push(res.data.track);
                  //   for (var i = 0; i < 10; i++) {
                  this.tracksInfo.push(this.song);
                  this.topTracksUrl.push(
                    res.data.track.album.image[1]["#text"]
                  );
                } else {
                  this.song = res.data.track;

                  this.tracksInfo.push(this.song);
                  this.topTracksUrl.push(
                    "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
                  );
                }
              });
            // for (var i = 0; i < 30; i++) {
            //   console.log(`${songname}`);

            //   }
          }
        );
        // }
      });
  }
};
</script>


<style scoped>
.pure-menu-link{
  color: #02D4DB;
}
</style>
