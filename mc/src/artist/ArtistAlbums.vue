<template>
    <div>
        <div class="content" id='add'>
            <h2 v-if="name" class="content-head is-center">{{name|apos(name)}} Albums</h2>
            <div class="pure-g">
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
            <div class="pure-g">
            <div v-for="(album, index) in topAlbums" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center transported" >
              <p class="ranks">{{index+1}}.</p><router-link :to="{name: 'AlbumPage', params: {name: name, albumname: album.name}}"><h4 class="childLink">{{album.name}}</h4></router-link>         
            </div>
            <div @click="toArtistAlbum(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center transported" >
              <img :src="albumUrl[index]" onerror="this.onerror=null;this.src=
              'https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png';">  
            </div>
            </div>
                </div>
            </div>
            </div>

        </div>
        
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArtistAlbums",
  data() {
    return {
      allAlbums: [],
      topAlbums: [],
      albumUrl: []
    };
  },
  props: {
    name: { type: String }
  },
  methods: {
    toArtist() {
      console.log(this.topTracks[0]);
      this.$router.push({
        name: "ArtistDetails",
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
    }
  },
  created() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${
          this.name
        }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`
      )
      .then(albumsRes => {
        console.log(albumsRes);
        for (var i = 0; i < 50; i++) {
          if (!albumsRes.data.topalbums.album[i].name.includes("null") && albumsRes.data.topalbums.album[i].image[0]["#text"] != ""
          && albumsRes.data.topalbums.album[i].image[1]["#text"] != ""&& albumsRes.data.topalbums.album[i].image[2]["#text"] != "" && albumsRes.data.topalbums.album[i].image[3]["#text"] != "") {
            this.topAlbums.push(albumsRes.data.topalbums.album[i]);
            if (albumsRes.data.topalbums.album[i].image[1]["#text"] != "") {
              this.albumUrl.push(
                albumsRes.data.topalbums.album[i].image[1]["#text"]
              );
            } else {
            //   console.log("hit");
              this.albumUrl.push(
                "https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/55045792-a48f-11e6-a434-00163ed833e7/2677206224/last-fm-logo.png"
              );
            }
          } else {
            i++;
          }
        }
        console.log(this.topAlbums);
      });
  }
};
</script>

<style scoped>

</style>
