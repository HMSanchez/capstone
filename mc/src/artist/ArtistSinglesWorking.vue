<template>
    <div>
        <div class="content" id='add'>
            <h2 v-if="name" class="content-head is-center">{{name}}'s Tracks</h2>
            <div class="pure-g">
                <div v-if="tracksInfo.length > 0">
            <div v-for="(track, index) in topTracks" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
            <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-2 is-center" >
              {{index+1}}. {{tracksInfo[index].name}}
              <img :src="topTracksUrl[index]" >            
            </div>
            </div>
                </div>
        </div>

        </div>
          <paginate
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
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
      albumUrl: [],
      artistUrl: "",
      pageNumber: 1
    };
  },
  props: {
    name: { type: String }
  },
  methods: {
    toArtist() {
      console.log(this.topTracks[0]);
      this.$router.push({
        name: "ArtistInfo",
        params: {
          name: this.topTracks[0].artist.name
        }
      });
    },
    toArtistAlbum(albumName) {
      this.$router.push({
        name: "AlbumPage",
        params: {
          artistname: this.name,
          albumname: this.topAlbums[albumName].name
        }
      });
    },
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      console.log(pageNum);
    }
  },
  created() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&page=${
          this.pageNumber
        }&limit=20&artist=${
          this.name
        }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(tracksRes => {
        // console.log(tracksRes);
        // console.log(tracksRes.data.toptracks.track.length);
        for (var i = 0; i < 20; i++) {
          this.topTracks.push(tracksRes.data.toptracks.track[i]);
        }
        this.artistUrl = this.topTracks[0].image[3]["#text"];

        var songname = [];
        Array.prototype.forEach.call(
          tracksRes.data.toptracks.track.slice(0, 20),
          user => {
            //   console.log(user);
            songname.push(user.name);
          }
        );
        for (var i = 0; i < 20; i++) {
          //   console.log(`${songname}`);
          axios
            .get(
              `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${
                this.name
              }&track=${songname[i]}&format=json`
            )
            .then(res => {
              console.log(res);
              if (res.data.track.album) {
                this.song = res.data.track;
                //   this.arr.push(res.data.track);
                //   for (var i = 0; i < 10; i++) {
                this.tracksInfo.push(this.song);
                this.topTracksUrl.push(res.data.track.album.image[1]["#text"]);
              } else {
                this.song = res.data.track;

                this.tracksInfo.push(this.song);
                this.topTracksUrl.push(
                  "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
                );
              }

              //   }
            });
        }
      });
  }
};
</script>


<style scoped>
#add {
  margin-top: 100px;
}
</style>
