<template>
    <div>
        <div class="content" id="add">
            <h2 class="content-head is-center">Top Artists</h2>
            <div class="pure-g">
              <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-3">
                <form action="">
            Search by genre: <input class="search-bar" type="text" v-model="search" placeholder="'pop'">
                </form>
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-3">
                  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a id="menuLink1" class="pure-menu-link">Filters</a>
            <ul class="pure-menu-children">
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Listeners</a></li>
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Playcount</a></li>
                <li class="pure-menu-item"><a @click="listen($event)" class="pure-menu-link">Genre</a></li>
            <li class="pure-menu-item pure-menu-has-children">
            <a id="menuLink1" class="pure-menu-link">More</a>
            <ul class="pure-menu-children">
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Autos</a></li>
                <li class="pure-menu-item"><a href="#" class="pure-menu-link">Flickr</a></li>
                <li class="pure-menu-item pure-menu-has-children">
                    <a href="#" id="menuLink1" class="pure-menu-link">Even More</a>
                    <ul class="pure-menu-children">
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Foo</a></li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Bar</a></li>
                        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Baz</a></li>
                    </ul>
                </li>
            </ul>
            </li>
            </ul>
        </li>
    </ul>
  </div>
              </div>
            </div>


            <div class="pure-g">
                <div v-if="topArtists.length > 0">
                <div v-for="(artist, index) in filterMembers" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-5" :key="index">
                    <div @click="toArtist(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center" >
                        <p class="ranks">{{index+1}}.</p> <router-link class="artist-links" :to="{name: 'AccountPlaylists'}"><h4 class="childLink">{{artist.name}}</h4></router-link>                        
                    </div>
                    <div @click="toArtist(index)" class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center clickable" >
                        <img :src="filterMembers[index].image[1]['#text']">            

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
      tags: [],
      search: ""
    };
  },
  computed: {
    filterMembers: function() {
      let filtered = this.topArtists;
      if (this.search) {
        filtered = this.topArtists.filter(
          m =>
            m.toptags[0].toLowerCase().indexOf(this.search) > -1 ||
            m.toptags[1].toLowerCase().indexOf(this.search) > -1
        );
      }
      console.log(filtered);
      return filtered;
    }
  },
  methods: {
    toArtist(artistIndex) {
      this.$router.push({
        name: "ArtistPage",
        params: {
          name: this.filterMembers[artistIndex].name
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
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
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
            if (res.data.artists.artist[i]) {
              this.topArtists.push(res.data.artists.artist[i]);
            }
            if (this.topArtists[i]) {
              this.topArtists[i].listeners = parseInt(
                this.topArtists[i].listeners
              );
            }
            if (this.topArtists[i]) {
              this.topArtists[i].playcount = parseInt(
                this.topArtists[i].playcount
              );
            }
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
        // console.log(res);
        // console.log(res.data.artists.artist);
        // this.maxPages = parseInt(res.data.artists["@attr"].totalPages);
        this.maxPages = 50;
        for (var i = 0; i < this.songCount; i++) {
          //   this.trackRanks.push(res.data.artists.artist[i]["@attr"].rank);
          if (res.data.artists.artist[i]) {
            this.topArtists.push(res.data.artists.artist[i]);
          }
          if (this.topArtists[i].listeners) {
            this.topArtists[i].listeners = parseInt(
              this.topArtists[i].listeners
            );
          }
          if (this.topArtists[i].playcount) {
            this.topArtists[i].playcount = parseInt(
              this.topArtists[i].playcount
            );
          }
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
          const songsUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${
            songnames[j]
          }&api_key=8b54926771ecc9a7145bbe1e430f1782&format=json`;
          arr.push(axios.get(songsUrl));
        }

        Promise.all(arr).then(res => {
          for (var h = 0; h < this.songCount; h++) {
            // console.log(res[h].data.toptags.tag);
            var tagone = res[h].data.toptags.tag[0].name;
            var tagtwo = res[h].data.toptags.tag[1].name;
            this.topArtists[h].toptags = [tagone, tagtwo];
          }
          // console.log(this.topArtists);
          // this.tags = this.tags.filter(this.onlyUnique);
          // console.log(this.tags);
        });
      });
  }
};
</script>

<style scoped>
#add{
    margin: 0px;
}
.ranks{
  color: #e6e6e6;
}
.artist-links {
  text-decoration: none;
}
#menuLink1, li a{
  text-decoration: none;
  cursor: pointer;
}
.pure-menu-link{
  color: #02D4DB;
} 
.pure-menu-link:hover{
  background: rgb(116, 116, 116);
  /* color: #02D4DB; */
} 
  .pure-menu-children {
    /* background: #696b76; */
  }
  
  .pure-menu-children li:hover {
    /* background: rgb(88, 89, 95); */
    color: #02D4DB;
  }
  

</style>

