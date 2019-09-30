<template>
  <div>
    <div class="content" id="add">
      <h2 class="content-head is-center">{{albumname}}</h2>
      <!-- {{mediaPlaying}} -->
      <div class="pure-g">
        <!-- {{spotifySongs.length}}
        {{album.tracks.track.length}}-->
        <div
          v-if="(album.tracks && album.tracks.track.length > 0) || spotifySongs.length > 0"
          class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 left-contents"
        >
          <!-- {{"BORK"}} -->
          <!-- {{album}} -->
          <div class="pure-g">
            <!-- <i v-if="album.uri" id="albumPlayButton" class="fas fa-play" @click="playAlbum()"></i> -->
            <!-- <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1"> -->
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-5-6">
              <img class="pure-img" :src="albumImg" />
            </div>
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
              <ul id="drop-down">
                <li>
                  <i class="fas fa-plus"></i>
                  <ul>
                    <li v-if="album.uri" class="dropdownItem is-center">
                      <div>
                        <i id="albumPlayButton" class="fas fa-play" @click="playAlbum()"></i>
                      </div>
                    </li>
                    <li class="dropdownItem">
                      <div @click="addAlbumToFavorites()">Add album to Favorites</div>
                    </li>
                    <!-- <li v-else class="dropdownItemRemove"><div @click="addToList($event)">Remove from Favorites</div></li> -->
                    <!-- {{itemInTopFiveCopy}} -->
                    <li v-show="!itemInTopFiveCopy" class="dropdownItem">
                      <div @click="addAlbumToTopFive()">Add album to Top Five</div>
                    </li>
                    <li v-show="itemInTopFiveCopy" class="dropdownItemRemove">
                      <div @click="addToList($event)">Remove from Top Five</div>
                    </li>
                  </ul>
                </li>
              </ul>

              <!-- </div> -->
            </div>
            <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1 summary-box">
              <!-- {{spotifyAlbumReleaseDate}} -->
              <router-link :to="{name: 'ArtistDetails',props: {name: album.artist}}">
                <h4>{{album.artist}}</h4>
              </router-link>
              <!-- <p v-if="!spotifyAlbumReleaseDate &&album.wiki">Published: {{album.wiki.published}}</p>
              <p
                v-else-if="spotifySongs.length > 0"
              >Published:{{spotifyAlbumReleaseDate}}, {{spotifyTotalAlbumTime | duration}}</p>
              <p v-else-if="album.wiki && album.published">Published: {{album.wiki.published}}</p>
              <p
                v-else-if="album.wiki && album.tracks && album.tracks.track.length ==0"
              >Published: {{album.wiki.published}}</p>
              <h5 v-else>Published: No data</h5> -->
              <p v-if="album.wiki" v-html="album.wiki.summary">Album summary:</p>
            </div>
          </div>
        </div>
        <div
          v-else-if="spotifySongs.length <=0 || !album.tracks.track"
          class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center"
        >
          <!-- {{"BORK2"}} -->
          <div class="pure-g">
            <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1">
              <!-- {{spotifySongs.length}} -->
              <!-- {{album.tracks.track.length}} -->
              <img v-if="albumImg" :src="albumImg" />
              <!-- <img v-else src="https://i.kym-cdn.com/entries/icons/original/000/017/533/unnamed.png">  -->

              <p>
                <!-- {{album.wiki === 'undefined' || album.wiki == ' '}} -->
                <!-- {{spotifySongs.length ==0}} -->
              </p>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3"></div>
            <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3 is-center summary-box">
              <!-- {{spotifySongs.length}} -->
              <router-link :to="{name: 'ArtistDetails',props: {name: album.artist}}">
                <h4>{{album.artist}}</h4>
              </router-link>
              <p v-if="album.wiki && spotifySongs.length < 0">Published: {{album.wiki.published}}</p>
              <p
                v-else-if="spotifySongs.length > 0"
              >Published:{{spotifyAlbumReleaseDate}}, {{spotifyTotalAlbumTime | duration}}</p>
              <p
                v-else-if="album.wiki && album.tracks.track.length ==0"
              >Published: {{album.wiki.published}}</p>
              <p v-else>Published: No data</p>
              <p v-if="album.wiki" v-html="album.wiki.summary">Album summary:</p>
            </div>
            <div class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-3"></div>
          </div>
        </div>
        <!-- {{spotifySongs.length}} -->
        <div
          v-if=" (album.tracks && album.tracks.track.length > 0 )|| spotifySongs.length > 0"
          class="pure-u-1 pure-u-md-1-2 pure-u-lg-2-3 tracks-box"
        >
          <div v-if="album.tracks.track.length > 1" class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1">
              <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <div
                  v-if="!checkboxesVisible && !allCheckboxesVisible"
                  class="pure-button"
                  @click="showCheckboxes()"
                >Select multiple</div>
                <div
                  v-else-if="checkboxesVisible && !allCheckboxesVisible"
                  class="button-error pure-button"
                  @click="hideCheckboxes()"
                >Cancel</div>
                <div v-else class="pure-button" @click="showCheckboxes()">Select multiple</div>
                <!-- <div v-show="!checkboxesVisible && !allCheckboxesVisible" id="showAllButton" class="pure-button" @click="showAllCheckboxes()" >Select All</div>   -->

                <!-- {{checkedSongs}}  -->
              </div>
              <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <div
                  v-if="!checkboxesVisible && !allCheckboxesVisible"
                  style="margin-left: 10px;"
                  id="showAllButton"
                  class="pure-button"
                  @click="showAllCheckboxes()"
                >Select All</div>
                <div
                  v-else-if="!checkboxesVisible && allCheckboxesVisible"
                  style="margin-left: 10px;"
                  class="button-error pure-button"
                  @click="hideAllCheckboxes()"
                >Cancel</div>
                <div
                  v-else-if="checkboxesVisible&& !allCheckboxesVisible"
                  id="showAllButton"
                  class="pure-button"
                  @click="showAllCheckboxes()"
                >Select All</div>
                <div
                  v-else-if="checkboxesVisible && allCheckboxesVisible"
                  class="button-error pure-button"
                  @click="hideAllCheckboxes()"
                >Cancel</div>
                <!-- {{checkedSongs}}  -->
              </div>
              <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                <div v-if="checkedSongs.length > 0">
                  <div class="pure-menu-horizontal dropdown">
                    <ul class="pure-menu-list">
                      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                        <a id="menuLink1" class="pure-menu-link">Options</a>
                        <ul v-if="authUser" class="pure-menu-children">
                          <!-- {{alreadyInTopFive}} -->
                          <li class="pure-menu-item">
                            <div class="pure-menu-link">
                              <div @click="buttonOnClick(index)" id="myBtn">Add to playlist</div>

                              <div :id="`myModal${index}`" class="modal">
                                <div class="modal-content">
                                  <span @click="spanOnClick(index)" class="close">&times;</span>
                                  <h2 class="playlist-header is-center">Choose Playlist</h2>
                                  <!-- {{playlistsObjects}} -->
                                  <div v-if="playlistsObjects.length > 0" class="pure-g">
                                    <div
                                      v-for="(playlist, holder) in playlistsObjects"
                                      class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4"
                                      :key="holder"
                                    >
                                      <div class="pure-u-1 pure-u-md-1 pure-u-lg-1">
                                        <div
                                          @click="addSelectedToPlaylist(index, holder)"
                                          class="playlistItem is-center"
                                        >
                                          <h3
                                            id="`playlistBtn${holder}`"
                                            v-if="playlist.name"
                                          >{{playlist.name | cap(playlist.name)}}</h3>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
                                      <button
                                        v-if="!showForm"
                                        @click="showPlaylistForm($event)"
                                        class="pure-button is-center"
                                      >Create Playlist</button>
                                      <button
                                        v-else
                                        @click="showPlaylistForm($event)"
                                        class="button-error pure-button is-center"
                                      >Cancel</button>
                                      <form
                                        v-show="showForm"
                                        class="pure-form"
                                        v-on:submit.prevent="createPlaylist"
                                      >
                                        <fieldset>
                                          <input
                                            class="search-bar"
                                            v-model="newPlaylistObject.name"
                                            placeholder="Playlist Name"
                                          />
                                          <input
                                            class="search-bar"
                                            v-model="newPlaylistObject.description"
                                            placeholder="Playlist Description"
                                          />
                                          <button
                                            v-if="valdiation"
                                            type="submit"
                                            class="button-add pure-button"
                                          >Create</button>
                                          <button
                                            v-else
                                            disabled
                                            type="submit"
                                            class="button-add pure-button"
                                          >Create</button>
                                        </fieldset>
                                        <ul id="errors">
                                          <!-- {{newPlaylistObject.name.trim().length == 0}} -->
                                          <li
                                            v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 "
                                          >Name cannot be empty.</li>
                                          <li
                                            v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  "
                                          >Description cannot be empty.</li>
                                          <!-- <li v-show="!validation.description">Please provide a valid description.</li> -->
                                        </ul>
                                      </form>
                                    </div>
                                    <!-- </div> -->
                                  </div>
                                  <div v-else>
                                    <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
                                      <button
                                        v-if="!showForm"
                                        @click="showPlaylistForm($event)"
                                        class="pure-button is-center"
                                      >Create Playlist</button>
                                      <button
                                        v-else
                                        @click="showPlaylistForm($event)"
                                        class="button-error pure-button is-center"
                                      >Cancel</button>
                                      <form
                                        v-show="showForm"
                                        class="pure-form"
                                        v-on:submit.prevent="createPlaylist"
                                      >
                                        <fieldset>
                                          <input
                                            class="search-bar"
                                            v-model="newPlaylistObject.name"
                                            placeholder="Playlist Name"
                                          />
                                          <input
                                            class="search-bar"
                                            v-model="newPlaylistObject.description"
                                            placeholder="Playlist Description"
                                          />
                                          <button
                                            v-if="valdiation"
                                            type="submit"
                                            class="button-add pure-button"
                                          >Create</button>
                                          <button
                                            v-else
                                            disabled
                                            type="submit"
                                            class="button-add pure-button"
                                          >Create</button>
                                        </fieldset>
                                        <ul id="errors">
                                          <!-- {{newPlaylistObject.name.trim().length == 0}} -->
                                          <li
                                            v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 "
                                          >Name cannot be empty.</li>
                                          <li
                                            v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  "
                                          >Description cannot be empty.</li>
                                          <!-- <li v-show="!validation.description">Please provide a valid description.</li> -->
                                        </ul>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li class="pure-menu-item">
                            <div
                              @click="addSelectedToFavorites(index)"
                              class="pure-menu-link"
                            >Favorite</div>
                          </li>
                          <li class="pure-menu-item">
                            <!-- {{`alreadyInTopFive${index}`}} -->
                            <div
                              v-if="checkedSongs.length <= 5"
                              @click="addSelectedToTopFive(index)"
                              class="pure-menu-link"
                            >Add to Top Five</div>
                          </li>
                        </ul>
                        <ul v-else>
                          <p>Login for more options</p>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="album.tracks && album.tracks.track.length > 0" class="l-box">
            <div
              v-for="(albumInfo, index) in album.tracks.track"
              class="pure-u-1 pure-u-md-1-2 pure-u-lg-1"
              :key="index"
            >
              <div
                v-show="checkboxesVisible || allCheckboxesVisible"
                class="checkbox-l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <input
                  v-show="checkboxesVisible || allCheckboxesVisible"
                  class="songCheckbox"
                  type="checkbox"
                  :id="`checkBox${index}`"
                  :value="album.tracks.track[index]"
                  v-model="checkedSongs"
                />
                <label
                  v-show="checkboxesVisible || allCheckboxesVisible"
                  class="songCheckboxLabel"
                  :id="`label${index}`"
                  :for="`checkBox${index}`"
                ></label>
              </div>
              <div v-if="albumInfo.uri" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
                <!-- {{currentTrack.name}} -->
                <i :id="`playButton${index}`" class="fas fa-play" @click="playTrack(index)"></i>
                <!-- <i v-show="(currentTrack && currentTrack.name) && currentTrack.name == albumInfo.name" :id="`playButton${index}`" class="fas fa-play current" @click="playTrack(index)"></i> -->
                <!-- <i v-show="currentTrack.name == albumInfo.name" :id="`playButton${index}`" class="fas fa-play current" @click="playTrack(index)"></i> -->
              </div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12">
                <!-- <label class="container">
                <input v-if="checkboxesVisible" :id="`checkBox${index}`" :value="album.tracks.track[index]" v-model="checkedSongs" type="checkbox"><span class="checkmark"></span>
                </label>-->
                <!-- <i v-if="albumInfo.uri" :id="`playButton${index}`" class="fas fa-play" @click="playTrackToggle(index)"></i> -->
                <!-- <i v-else-if="songAlreadyStarted" @click="playTrackToggle(index)" class="fas fa-pause"></i> -->
                <strong>{{index+1}}.</strong>
              </div>
              <div
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >{{albumInfo.duration | duration}}</div>
              <div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
                {{albumInfo.name}}
                <!-- <h2>Toast</h2> -->

                <!-- <button @click="launch_toast()">Show Toast</button> -->

                <div id="notification-success">
                  <div id="img">
                    <i class="fas fa-check"></i>
                  </div>
                  <div id="desc-success">Successfully added</div>
                </div>
                <div id="notification-error">
                  <div id="img">
                    <i class="fas fa-times"></i>
                  </div>
                  <div id="desc-error">Not added</div>
                </div>
              </div>
              <!-- {{albumInfo}} -->
              <!-- {{!albumInfo.hasOwnProperty('spotify_url')}}
            {{getCookie('access_token') === 'undefined'}}
              {{!albumInfo.hasOwnProperty('spotify_url') && getCookie('access_token') === 'undefined'}}-->
              <div
                v-if="!albumInfo.hasOwnProperty('spotify_url')"
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <a :href="albumInfo.url" target="_blank">
                  <i v-if="albumInfo.api == 'lastfm'" class="fab fa-lastfm-square"></i>
                  <i v-else-if="albumInfo.api == 'spotify'" class="fab fa-spotify"></i>
                  <i v-else class="fab fa-lastfm-square"></i>
                </a>
              </div>
              <!-- {{albumInfo.api}} -->
              <!-- {{getCookie('access_token') !== 'undefined'}} -->
              <div
                v-if="albumInfo.hasOwnProperty('spotify_url') && albumInfo.api =='lastfm-spotify'"
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <a :href="albumInfo.spotify_url" target="_blank">
                  <i class="fab fa-spotify"></i>
                </a>
              </div>
              <div
                v-if="albumInfo.hasOwnProperty('lastfm_url') && albumInfo.api =='lastfm-spotify'"
                class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-12"
              >
                <a :href="albumInfo.lastfm_url" target="_blank">
                  <i class="fab fa-lastfm-square"></i>
                </a>
              </div>
              <!-- (authUser && !checkboxesVisible) && (authUser && !allCheckboxesVisible) -->
              <div v-if="authUser" class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-6">
                <div
                  v-bind:class="{ dropdwnvisible: !((authUser && !checkboxesVisible) && (authUser && !allCheckboxesVisible))}"
                  class="pure-menu-horizontal dropdown"
                >
                  <ul class="pure-menu-list">
                    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                      <a id="menuLink1" class="pure-menu-link">Options</a>
                      <ul v-if="authUser" class="pure-menu-children">
                        <!-- {{alreadyInTopFive}} -->
                        <li class="pure-menu-item">
                          <div class="pure-menu-link">
                            <div @click="buttonOnClick(index)" id="myBtn">Add to playlist</div>

                            <div :id="`myModal${index}`" class="modal">
                              <div class="modal-content">
                                <span @click="spanOnClick(index)" class="close">&times;</span>
                                <h2 class="playlist-header is-center">Choose Playlist</h2>
                                <!-- {{playlistsObjects}} -->
                                <div v-if="playlistsObjects.length > 0" class="pure-g">
                                  <div
                                    v-for="(playlist, holder) in playlistsObjects"
                                    class="l-box pure-u-1 pure-u-md-1 pure-u-lg-1-4"
                                    :key="holder"
                                  >
                                    <div class="pure-u-1 pure-u-md-1 pure-u-lg-1">
                                      <div
                                        @click="addToPlaylist(index, holder)"
                                        class="playlistItem is-center"
                                      >
                                        <h3
                                          id="`playlistBtn${holder}`"
                                          v-if="playlist.name"
                                        >{{playlist.name | cap(playlist.name)}}</h3>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1 is-center">
                                    <button
                                      v-if="!showForm"
                                      @click="showPlaylistForm($event)"
                                      class="pure-button is-center"
                                    >Create Playlist</button>
                                    <button
                                      v-else
                                      @click="showPlaylistForm($event)"
                                      class="button-error pure-button is-center"
                                    >Cancel</button>
                                    <form
                                      v-show="showForm"
                                      class="pure-form"
                                      v-on:submit.prevent="createPlaylist"
                                    >
                                      <fieldset>
                                        <input
                                          class="search-bar"
                                          v-model="newPlaylistObject.name"
                                          placeholder="Playlist Name"
                                        />
                                        <input
                                          class="search-bar"
                                          v-model="newPlaylistObject.description"
                                          placeholder="Playlist Description"
                                        />
                                        <button
                                          v-if="valdiation"
                                          type="submit"
                                          class="button-add pure-button"
                                        >Create</button>
                                        <button
                                          v-else
                                          disabled
                                          type="submit"
                                          class="button-add pure-button"
                                        >Create</button>
                                      </fieldset>
                                      <ul id="errors">
                                        <!-- {{newPlaylistObject.name.trim().length == 0}} -->
                                        <li
                                          v-show="newPlaylistObject.name &&newPlaylistObject.name.toString().trim().length == 0 "
                                        >Name cannot be empty.</li>
                                        <li
                                          v-show="newPlaylistObject.description &&newPlaylistObject.description.toString().trim().length == 0  "
                                        >Description cannot be empty.</li>
                                        <!-- <li v-show="!validation.description">Please provide a valid description.</li> -->
                                      </ul>
                                    </form>
                                  </div>
                                  <!-- </div> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="pure-menu-item">
                          <div @click="addToFavorites(index)" class="pure-menu-link">Favorite</div>
                        </li>
                        <li class="pure-menu-item">
                          <!-- {{`alreadyInTopFive${index}`}} -->
                          <div @click="addToTopFive(index)" class="pure-menu-link">
                            Add to Top Five
                            <input v-model="topFiveCount" class="numberCircle" />
                          </div>
                          <!-- <div v-else class="pure-menu-link">
                                Remove from Top Five
                          </div>-->
                        </li>
                      </ul>
                      <ul v-else>
                        <p>Login for more options</p>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- {{albumTracks}} -->
        </div>
        <div v-else class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center">
          <h3>No tracks found</h3>
        </div>
        <div
          v-if="mediaPlaying"
          class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 media-container is-center"
        >
          <div class="pure-g">
            <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <img v-if="!minimizePlay" :src="albumImg" style="height:64px;width:64px;" alt />
              <img v-else :src="albumImg" style="height:40px;width:40px;" alt />
            </div>

            <div class="pure-u-lg-1-2">
              <div class="pure-g">
                <div class="pure-u-lg-1">
                  <div class="pure-u-lg-1-12">
                    <label class="durationLabel" for="musicSlider">{{node.sum | duration}}</label>
                  </div>
                  <div v-if="!minimizePlay" class="pure-u-lg-1-2">
                    <input
                      id="musicSlider"
                      type="range"
                      min="0"
                      v-bind:max="currentTrack.duration"
                      v-bind:value="node.sum"
                      v-on:input="onChg($event)"
                    />
                  </div>
                  <div v-if="minimizePlay" class="pure-u-lg-1-2">
                    <input
                      id="musicSlider"
                      type="range"
                      min="0"
                      v-bind:max="currentTrack.duration"
                      v-bind:value="node.sum"
                      v-on:input="onChg($event)"
                    />
                  </div>
                  <div class="pure-u-lg-1-12">
                    <label class="durationLabel">{{currentTrack.duration | duration}}</label>
                  </div>
                </div>
                <div v-show="!minimizePlay" class="pure-u-lg-1">
                  <div class="pure-u-lg-1-12">
                    <i class="fas fa-backward" @click="previousTrack()"></i>
                  </div>
                  <div v-show="!minimizePlay" class="pure-u-lg-1-12">
                    <i class="fas fa-step-backward" @click="stepBackward()"></i>
                  </div>
                  <div class="pure-u-lg-1-12">
                    <i class="fas fa-pause pause" id="playButton" @click="togglePlay()"></i>
                  </div>
                  <div v-show="!minimizePlay" class="pure-u-lg-1-12">
                    <i class="fas fa-step-forward" @click="stepForward()"></i>
                  </div>
                  <div class="pure-u-lg-1-12">
                    <i class="fas fa-forward" @click="nextTrack()"></i>
                  </div>
                  <div class="pure-u-lg-1-12">
                    <!-- <input type="checkbox" id="repeatBox">
                    <label id="repeatBoxLabel" for="repeatBox"></label>-->
                    <i class="fas fa-redo-alt" id="repeat-button" @click="repeat()"></i>
                  </div>
                  <div class="pure-u-lg-1-12">
                    <i
                      class="fas fa-sync-alt"
                      id="repeat-album-button"
                      @click="cycleThroughAlbum()"
                    ></i>
                  </div>
                  <div class="pure-u-lg-1-12">
                    <i class="fas fa-random" id="shuffle-button" @click="shuffleAlbum()"></i>
                  </div>
                  <div v-show="!minimizePlay" class="pure-u-lg-1-12 drop-down-parent">
                    <i class="fas fa-ellipsis-v" id="drpParent" @click="showDropDwn()"></i>
                    <div id="drp">
                      <div @click="lyricsButtonOnClick($event)" class="pure-menu-link">Show Lyrics</div>
                      <div @click="lyricsButtonOnClick($event)" class="pure-menu-link">Show Queue</div>
                    </div>

                    <!-- <i class="fas fa-ellipsis-v" @click="lyricsButtonOnClick()"></i> -->
                    <div id="myModalLyrics" class="modal">
                      <div class="modal-content">
                        <span @click="lyricsSpanOnClick()" class="close">&times;</span>
                        <h2 v-if="showQueue" class="modal-header is-center">Queue</h2>
                        <h2 v-else-if="showLyrics" class="modal-header is-center">Lyrics</h2>
                        <div class="l-box pure-g">
                          <!-- <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <div @click="displayLyrics()" class="pure-button">Show Lyrics</div>                        
                      </div>
                      <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <div @click="displayQueue()" class="pure-button">Show Queue</div>                        
                          </div>-->
                          <div
                            v-show="!showQueue"
                            id="modalContainer"
                            class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center"
                          ></div>
                          <div
                            v-show="showQueue"
                            id="modalContainer"
                            class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1 is-center"
                          >
                            <div v-for="(track, index) in albumTracks" :key="index">
                              <div
                                v-if="currentTrack.name== track.name"
                                class="pure-u-1 pure-u-md-1-2 pure-u-lg-1 currentlyPlaying"
                              >
                                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-5">
                                  <img
                                    class="pure-img"
                                    :src="albumImg"
                                    style="height:40px;width:40px;"
                                  />
                                </div>
                                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                                  <div class>{{track.name}}</div>
                                </div>
                                <div
                                  class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-5"
                                >{{track.duration | duration}}</div>
                              </div>
                              <div v-else class="pure-u-1 pure-u-md-1-2 pure-u-lg-1">
                                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-5">
                                  <img
                                    class="pure-img"
                                    :src="albumImg"
                                    style="height:40px;width:40px;"
                                  />
                                </div>
                                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                                  <div class>{{track.name}}</div>
                                </div>
                                <div
                                  class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-5"
                                >{{track.duration | duration}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <p v-if="currentTrack.lyrics">
                        {{currentTrack.lyrics}}
                        </p>
                     <p v-else-if="!currentTrack.lyrics">
                        No lyrics available
                        </p>-->
                      </div>
                    </div>
                  </div>
                </div>
                <div v-show="!minimizePlay" class="pure-u-lg-1">
                  <p id="ptag">{{album.name}} - {{currentTrack.name}}</p>
                </div>
              </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
              <!-- {{repeatState}} -->
              <div v-show="!minimizePlay" @click="minimizePlayer()">
                <i class="fas fa-minus"></i>
              </div>
              <div v-show="minimizePlay" @click="minimizePlayer()">
                <i class="fas fa-plus"></i>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import * as firebase from "firebase";
import SpotifyWebApi from "spotify-web-api-node";
import { mapKeys } from "lodash";

var mediaUpdate = null;

const play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });
  });
};

export default {
  name: "AlbumPage",
  data() {
    return {
      album: {},
      albumTracks: [],
      songLyricsHolder: [],
      albumImg: "",
      playlistsObjects: [],
      authUser: false,
      showForm: false,
      access_token: "",
      loggedInToSpotify: this.checkCookie(),
      existsInSpotify: false,
      itemInTopFive: false,
      itemInFavorites: false,
      spotifyArtistObject: {},
      spotifyAlbumObject: {},
      spotifyTotalAlbumTime: 0,
      spotifyAlbumReleaseDate: 0,
      spotifySongs: [],
      errors: [],
      topFiveCount: 0,
      newPlaylistObject: {
        songs: [],
        name: "",
        description: ""
      },
      mykeys: [],
      songObject: {},
      songObjectCopy: {},
      itemInTopFiveCopy: false,
      playlistArrayKey: "",
      showDropDown: false,
      trackIndex: 0,
      checkedSongs: [],
      checkboxesVisible: false,
      allCheckboxesVisible: false,
      allCheckboxes: [],
      grabbedAllTracks: false,
      player: null,
      mediaPlaying: false,
      currentTrack: null,
      currentIndex: 0,
      node: {
        sum: 0
      },
      repeatState: false,
      repeatAlbum: false,
      repeatAlbumCount: 0,
      showQueue: false,
      minimizePlay: false
    };
  },

  computed: {
    valdiation() {
      if (this.newPlaylistObject.name && this.newPlaylistObject.description) {
        console.log(this.newPlaylistObject.name.toString().trim().length);
        if (
          this.newPlaylistObject.name.toString().trim().length == 0 ||
          this.newPlaylistObject.name == undefined
        ) {
          return false;
        } else if (
          this.newPlaylistObject.description.toString().trim().length == 0 ||
          this.newPlaylistObject.description == undefined
        ) {
          return false;
        } else {
          return true;
        }
      }

      return false;
    }
  },
  props: {
    name: { type: String },
    albumname: { type: String }
  },
  methods: {
    minimizePlayer() {
      if (this.minimizePlay) {
        this.minimizePlay = false;
      } else {
        this.minimizePlay = true;
      }
    },
    onChg(e) {
      this.node.sum = e.target.value;
      console.log(e.target.value);
      this.player.seek(e.target.value * 1000).then(() => {
        console.log("Changed position!");
      });
    },
    change_autorefreshdiv(index) {
      var NAME = document.getElementById(`playButton${index}`);
      var currentClass = NAME.className;
      if (currentClass == "fas fa-play") {
        // Check the current class name
        NAME.className = "fas fa-pause"; // Set other class name
      } else {
        NAME.className = "fas fa-play"; // Otherwise, use `second_name`
      }
    },
    playTrack(index) {
      console.log(index);
      console.log(this.albumTracks);
      var track = this.albumTracks[index];
      this.currentIndex = index;
      this.mediaPlaying = true;
      this.currentTrack = track;
      console.log(track);
      var NAME = document.getElementById(`playButton${this.currentIndex}`);
      for (var i = 0; i < this.album.tracks.track.length; i++) {
        if (this.album.tracks.track[i].name == this.currentTrack.name) {
          var modal = document.getElementById(`playButton${i}`);
          NAME.className = "fas fa-play current";
          //   if(modal==NAME){
          // }
        } else {
          var modals = document.getElementById(`playButton${i}`);
          modals.className = "fas fa-play";
        }
      }
      play({
        playerInstance: this.player,
        spotify_uri: track.uri
        // spotify_uri: 'spotify:album:6htgf3qv7vGcsdxLCDxKp8'
      });
      this.mediaPlaying = true;
      this.currentTrack = track;
      // console.log(this.currentTrack.duration * 1000);
      var ref = this;
      ref.runMedia();
    },
    runMedia() {
      var ref = this;
      // console.log("run media");
      mediaUpdate = setInterval(function() {
        ref.updateMediaPlayer();
      }, 300);
    },
    updateMediaPlayer() {
      // console.log("update media");
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          clearInterval(mediaUpdate);
          return;
        }
        // console.log(state);
        // console.log(state.position * 0.001);
        this.node.sum = Math.round(state.position * 0.001);

        // console.log(this.currentTrack.duration - 1);
        // console.log(this.node.sum);

        if (
          ((this.node.sum > 0 &&
            Math.ceil(this.node.sum) >= this.currentTrack.duration) ||
            (this.node.sum > 0 &&
              Math.ceil(this.node.sum) >= this.currentTrack.duration)) &&
          !this.repeatState
        ) {
          this.nextTrack();
        } else if (
          ((this.node.sum > 0 &&
            Math.ceil(this.node.sum) >= this.currentTrack.duration) ||
            (this.node.sum > 0 &&
              Math.ceil(this.node.sum) >= this.currentTrack.duration)) &&
          this.repeatState
        ) {
          // this.nextTrack();
          this.startSongOver();
        } else {
        }
      });
    },
    stepBackward() {
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          clearInterval(mediaUpdate);
          return;
        }
        if ((state.position - 5000) * 0.001 > 0) {
          this.node.sum = Math.floor((state.position - 5000) * 0.001);
        } else {
          this.node.sum = 0;
        }
        this.player.seek((state.position - 5000) * 0.001 * 1000).then(() => {
          console.log("Changed position!");
        });
      });
    },
    stepForward() {
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          clearInterval(mediaUpdate);
          return;
        }

        this.node.sum = Math.floor((state.position + 5000) * 0.001);
        this.player.seek((state.position + 5000) * 0.001 * 1000).then(() => {
          console.log("Changed position!");
        });
      });
    },
    repeat() {
      var NAME = document.getElementById(`repeat-button`);
      var nameClass = NAME.className;
      if (nameClass == "fas fa-redo-alt") {
        NAME.className = "fas fa-redo-alt current";
      } else {
        NAME.className = "fas fa-redo-alt";
      }
      // var NAME = document.getElementById(`repeat-album-button`);
      // var NAME = document.getElementById(`shuffle-button`);

      if (this.repeatState) {
        this.repeatState = false;
      } else {
        this.repeatState = true;
      }
    },
    cycleThroughAlbum() {
      var NAME = document.getElementById(`repeat-album-button`);
      var nameClass = NAME.className;
      if (nameClass == "fas fa-sync-alt") {
        NAME.className = "fas fa-sync-alt current";
      } else {
        NAME.className = "fas fa-sync-alt";
      }
      if (this.repeatAlbum) {
        this.repeatAlbum = false;
      } else {
        this.repeatAlbum = true;
      }
    },
    startSongOver() {
      play({
        playerInstance: this.player,
        spotify_uri: this.currentTrack.uri
      });
      this.node.sum = 0;
      this.runMedia();
    },
    previousTrack() {
      var pb = document.getElementById("playButton");
      var currentClass = pb.className;
      pb.className = "fas fa-pause pause";
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          clearInterval(mediaUpdate);
          return;
        }
        console.log(state.position);
        if (state.position < 1000) {
          clearInterval(mediaUpdate);
          if (this.currentIndex - 1 > 0) {
            // var track = this.album.tracks.track[this.currentIndex++];
            this.playTrack(this.currentIndex - 1);
          } else {
            this.currentIndex = this.albumTracks.length - 1;
            // var track = this.album.tracks.track[this.currentIndex];
            // this.currentTrack = track;
            this.playTrack(this.albumTracks.length - 1);
          }
        } else if (state.position > 1000) {
          this.startSongOver();
        }
      });
    },
    nextTrack() {
      var pb = document.getElementById("playButton");
      var currentClass = pb.className;
      pb.className = "fas fa-pause pause";
      var track = this.album.tracks.track[this.currentIndex].name;

      // console.log(track);
      // console.log(this.currentTrack.name);

      clearInterval(mediaUpdate);
      // console.log(this.currentIndex+1);
      if (this.currentIndex + 1 < this.albumTracks.length) {
        // var track = this.album.tracks.track[this.currentIndex++];
        // console.log(this.currentIndex++);
        this.playTrack(this.currentIndex + 1);
      } else if (
        this.currentIndex + 1 < this.albumTracks.length &&
        this.repeatAlbum
      ) {
        this.playTrack(this.currentIndex + 1);
      } else if (
        this.currentIndex + 1 >= this.albumTracks.length &&
        this.repeatAlbum
      ) {
        this.currentIndex = 0;
        this.playTrack(0);
      } else if (
        this.currentIndex + 1 >= this.albumTracks.length &&
        !this.repeatAlbum &&
        !this.repeatState
      ) {
        // this.player.disconnect();
        this.player.pause().then(() => {
          // console.log('Paused!');
        });
        this.mediaPlaying = false;
        clearInterval(mediaUpdate);
        this.node.sum = 0;
      } else if (this.repeatState) {
        this.startSongOver();
      }
    },
    displayLyrics() {
      var modalDiv = document.getElementById("modalContainer");
      modalDiv.innerHTML = this.songLyricsHolder[this.currentIndex];
      this.showQueue = false;
    },
    displayQueue() {
      var modalDiv = document.getElementById("modalContainer");
      modalDiv.innerHTML = "";
      this.showQueue = true;
      // for(var i = 0; i < this.albumTracks.length;i++){
      //   var newDiv= document.createElement('div');
      //   newDiv.className = 'pure-u-1 pure-u-md-1-2 pure-u-lg-1';
      //   newDiv.id = `queue${i}`;
      //   newDiv.innerHTML = this.albumTracks[i].name;
      //   modalDiv.appendChild(newDiv);
      // }
    },
    shuffleAlbum() {
      this.albumTracks = this.albumTracks.sort(() => Math.random() - 0.5);
      for (var o = 0; o < this.albumTracks.length; o++) {
        if (this.albumTracks[o].name == this.currentTrack.name) {
          this.currentIndex = o;
          break;
        }
      }
      var NA = document.getElementById(`shuffle-button`);
      var nameClass = NA.className;
      if (nameClass == "fas fa-random") {
        NA.className = "fas fa-random current";
      } else {
        NA.className = "fas fa-random";
      }
    },
    togglePlay() {
      console.log("tp triggered");
      this.player.getCurrentState().then(state => {
        if (!state) {
          console.error(
            "User is not playing music through the Web Playback SDK"
          );
          clearInterval(mediaUpdate);
          return;
        }

        if (state.position == 0) {
          console.log("toggle if");
          this.startSongOver();
        } else if (state.paused) {
          this.runMedia();
          this.player.togglePlay().then(() => {
            console.log("Toggled playback!");
          });
        } else if (!state.paused) {
          clearInterval(mediaUpdate);
          this.player.togglePlay().then(() => {
            console.log("Toggled playback!");
          });
        } else {
          this.player.togglePlay().then(() => {
            console.log("Toggled playback!");
          });
        }

        var pb = document.getElementById("playButton");
        var currentClass = pb.className;
        console.log(state);
        if (currentClass == "fas fa-play current" && state.paused) {
          // Check the current class name
          pb.className = "fas fa-pause pause"; // Set other class name
        } else if (currentClass == "fas fa-pause pause" && !state.paused) {
          pb.className = "fas fa-play current"; // Otherwise, use `second_name`
        }
        // else if(currentClass == "fas fa-pause pause" && state.position >0 && !state.paused){
        //   pb.className = "fas fa-play current"; // Otherwise, use `second_name`
        // }
      });
    },
    pauseTrack(index) {
      // console.log(index);
      var track = this.albumTracks[index];
      // console.log(track);
      play({
        playerInstance: this.player,
        spotify_uri: track.uri
      });
    },
    showDropDwn() {
      var pb = document.getElementById("drp");
      pb.style.display = "block";
    },
    playAlbum() {
      clearInterval(mediaUpdate);
      console.log(this.album);
    },
    grabAlbumInfo(index) {
      console.log(this.album.tracks.track[index]);
    },
    showCheckboxes() {
      this.checkboxesVisible = true;
      this.allCheckboxesVisible = false;
      this.grabbedAllTracks = false;
      this.checkedSongs = [];
      // console.log(document.getElementById("label0"));
    },
    hideCheckboxes() {
      this.checkboxesVisible = false;
      this.allCheckboxesVisible = false;
      this.grabbedAllTracks = false;
      this.checkedSongs = [];
    },
    showAllCheckboxes() {
      this.allCheckboxesVisible = true;
      this.grabbedAllTracks = true;
      // console.log(this.album.tracks.track);
      this.checkedSongs = this.album.tracks.track;
      // console.log(this.checkedSongs);
      // this.addSelectedToPlaylist();
    },
    hideAllCheckboxes() {
      this.allCheckboxesVisible = false;
      this.checkboxesVisible = false;
      this.grabbedAllTracks = false;
      this.checkedSongs = [];
    },
    launch_success(desc = "success", duration = 4500) {
      var x = document.getElementById("notification-success");
      var success_notifcation_desc = document.getElementById("desc-success");
      success_notifcation_desc.innerHTML = desc;
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, duration);
    },
    launch_error(desc = "something went wrong", duration = 4500) {
      var x = document.getElementById("notification-error");
      var error_notifcation_desc = document.getElementById("desc-error");
      error_notifcation_desc.innerHTML = desc;
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, duration);
    },
    getIndex(index) {
      // console.log(index);
      this.trackIndex = index;
      return index;
    },
    onClick: function(event) {
      console.log(event.target);
      for (var i = 0; i < this.album.tracks.track.length; i++) {
        var modal = document.getElementById(`myModal${i}`);
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      var drpd = document.getElementById(`ptag`);
      var drpdo = document.getElementById(`drp`);
      if (event.target == drpd) {
        // console.log(drpd.childNodes[0]);
        drpdo.style.display = "none";
      }

      var lyricsModal = document.getElementById(`myModalLyrics`);
      if (event.target == lyricsModal) {
        lyricsModal.style.display = "none";
      }
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
      // this.hideCheckboxes();
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie() {
      var user = this.getCookie("access_token");
      if (!user) {
        return true;
      } else {
        return false;
      }
    },
    addSelectedToPlaylist(ind, playlistIndex) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      // this.songObject = this.album.tracks.track[ind];
      console.log(this.checkedSongs);
      console.log(playlistIndex);
      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {})
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            console.log(childNodes.key);
            ref.mykeys.push(childNodes.key);
          });
          playlistKey = ref.mykeys[playlistIndex];
          console.log(playlistKey);
          firebase
            .database()
            .ref("userObjects/" + user.uid + "/playlists/" + playlistKey)
            .once("value", function(snapshot) {})
            .then(function(snap) {
              snap.forEach(function(item) {
                var itemVal = item.val();
                keys.push(itemVal);
              });
              console.log(keys);

              snap.forEach(function(childNodes) {
                console.log(childNodes.val());
                var songKVObject = {
                  key: childNodes.key,
                  value: childNodes.val()
                };
                // if (childNodes.val().songs) {
                songsInPlaylist.push(songKVObject);
                // console.log(songsInPlaylist.length);
                // }
                // console.log(ref.mykeys);
              });
              console.log(songsInPlaylist);
              // SONG KEYS
              // snap.forEach(function(childNodes) {
              //   console.log(childNodes.val());
              // });
              if (songsInPlaylist[2] && songsInPlaylist[2].value) {
                console.log(ref.mykeys[playlistIndex]);

                // console.log(ref.checkedSongs[0].api);
                console.log(ref.checkedSongs.length);
                if (ref.checkedSongs[0].api == "lastfm-spotify") {
                  for (var s = 0; s < ref.checkedSongs.length; s++) {
                    console.log(ref.checkedSongs[s]);
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push();
                    newPostRef.set({
                      attr: {
                        rank: ref.checkedSongs[s].attr.rank
                      },
                      name: ref.checkedSongs[s].name,
                      artist: {
                        // mbid: ref.songObject.artist.mbid,
                        name: ref.checkedSongs[s].artist.name,
                        url: ref.checkedSongs[s].artist.href,
                        id: ref.checkedSongs[s].artist.id
                      },
                      duration: ref.checkedSongs[s].duration,
                      image_url: ref.albumImg,
                      api: "lastfm-spotify",
                      type: "track",
                      spotify_url: ref.checkedSongs[s].spotify_url,
                      lastfm_url: ref.checkedSongs[s].lastfm_url,
                      // streamable: ref.songObject.streamable,
                      url: ref.checkedSongs[s].spotify_url
                    });
                  }
                  ref.launch_success(
                    `Songs added to ${ref.playlistsObjects[playlistIndex].name}`
                  );
                } else if (ref.checkedSongs[0].api == "spotify") {
                  // console.log("spotify only yo");
                  console.log(ref.checkedSongs);

                  for (var sj = 0; sj < ref.checkedSongs.length; sj++) {
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push();
                    newPostRef.set({
                      attr: {
                        rank: ref.checkedSongs[sj].attr.rank
                      },
                      name: ref.checkedSongs[sj].name,
                      artist: {
                        // mbid: ref.checkedSongs[s].artist.mbid,
                        name: ref.checkedSongs[sj].artist.name,
                        url: ref.checkedSongs[sj].artist.href,
                        id: ref.checkedSongs[sj].artist.id,
                        type: ref.checkedSongs[sj].artist.type
                      },
                      duration: ref.checkedSongs[sj].duration,
                      image_url: ref.albumImg,
                      api: "spotify",
                      id: ref.checkedSongs[sj].id,
                      type: "track",
                      // spotify_url: ref.checkedSongs[s].spotify_url,
                      // lastfm_url: ref.checkedSongs[s].lastfm_url,
                      // streamable: ref.songObject.streamable,
                      url: ref.checkedSongs[sj].url
                    });
                  }
                  ref.launch_success(
                    `Songs added to ${ref.playlistsObjects[playlistIndex].name}`
                  );
                } else {
                  // console.log("else hiiiii");
                  // console.log(ref.checkedSongs);
                  for (var sjw = 0; sjw < ref.checkedSongs.length; sjw++) {
                    console.log(ref.checkedSongs[sjw]);
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push();
                    newPostRef.set({
                      attr: {
                        rank: ref.checkedSongs[sjw].attr.rank
                      },
                      name: ref.checkedSongs[sjw].name,
                      artist: {
                        // mbid: ref.checkedSongs[s].artist.mbid,
                        name: ref.checkedSongs[sjw].artist.name,
                        url: ref.checkedSongs[sjw].artist.url
                        // id: ref.checkedSongs[s].artist.id
                      },
                      duration: ref.checkedSongs[sjw].duration,
                      image_url: ref.albumImg,
                      api: "lastfm",
                      type: "track",
                      // spotify_url: ref.checkedSongs[s].spotify_url,
                      // lastfm_url: ref.checkedSongs[s].lastfm_url,
                      // streamable: ref.songObject.streamable,
                      url: ref.checkedSongs[sjw].url
                    });
                  }
                  ref.launch_success(
                    `Songs added to ${ref.playlistsObjects[playlistIndex].name}`
                  );
                }
              } else {
              }
            });
        });
    },
    addSelectedToFavorites(ind, holder) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.albumObject = this.album;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/favorites")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          // console.log(arr);
          // console.log(ref.checkedSongs);
          var duplicates = [];
          var checked = ref.checkedSongs;
          for (var i = 0; i < checked.length; i++) {
            checked[i].type = "track";
          }

          for (var j = 0; j < arr.length; j++) {
            for (var jk = 0; jk < checked.length; jk++) {
              if (arr[j].type == "track") {
                if (
                  checked[jk].artist.name == arr[j].artist.name &&
                  checked[jk].name == arr[j].name
                ) {
                  duplicates.push(checked[jk]);
                  checked.splice(jk, 1);
                }
              }
            }
          }
          console.log(checked);
          console.log(duplicates);

          for (var jkl = 0; jkl < checked.length; jkl++) {
            delete checked[jkl].streamable;
            checked[jkl].image_url = ref.albumImg;
            var newPostRef = firebase
              .database()
              .ref("userObjects/" + user.uid + "/favorites/")
              .push(checked[jkl]);
          }

          var songsNotAdded = "";
          var songsNotAddedCount = 0;
          if (duplicates.length > 0) {
            for (var jklo = 0; jklo < duplicates.length; jklo++) {
              songsNotAdded += duplicates[jklo].name + ", ";
              songsNotAddedCount++;
            }
            ref.launch_error(`${songsNotAdded} already in Favorites`, 2500);
          }
          ref.launch_success(
            `${checked.length} songs added to Favorites`,
            5500
          );
        });
    },
    addSelectedToTopFive(ind, holder) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.albumObject = this.album;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/topfive")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          console.log(arr);
          var duplicates = [];
          var checked = ref.checkedSongs;
          console.log(checked);
          console.log(snapshot.numChildren());
          if (snapshot.numChildren() < 5) {
            for (var i = 0; i < checked.length; i++) {
              checked[i].type = "track";
            }

            for (var j = 0; j < arr.length; j++) {
              for (var jk = 0; jk < checked.length; jk++) {
                if (arr[j].type == "track") {
                  if (
                    checked[jk].artist.name == arr[j].artist.name &&
                    checked[jk].name == arr[j].name
                  ) {
                    duplicates.push(checked[jk]);
                    checked.splice(jk, 1);
                  }
                }
              }
            }

            for (
              var ik = 0;
              ik < snapshot.numChildren() + checked.length;
              ik++
            ) {
              // delete checked[ik].streamable;
              console.log(snapshot.numChildren() + checked.length);
              if (snapshot.numChildren() + checked.length > 5) {
                duplicates.push(checked[checked.length - 1]);
                checked.pop();
              }
              console.log(snapshot.numChildren() + checked.length);
            }

            console.log(checked);
            console.log(duplicates);

            for (var jkl = 0; jkl < checked.length; jkl++) {
              checked[jkl].image_url = ref.albumImg;
              delete checked[jkl].streamable;
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/topfive/")
                .push(checked[jkl]);
              ref.topFiveCount++;
            }

            var songsNotAdded = "";
            if (duplicates.length > 0) {
              for (var jklo = 0; jklo < duplicates.length; jklo++) {
                songsNotAdded += "'" + duplicates[jklo].name + "', ";
              }
              console.log(snapshot.numChildren() + checked.length);
              if (snapshot.numChildren() + checked.length >= 5) {
                ref.launch_error(
                  `${duplicates.length} song not added due to overflow.`,
                  3000
                );
              } else {
                ref.launch_error(`${songsNotAdded} already in Top Five.`, 3000);
              }
            }
            ref.launch_success(
              `${checked.length} songs added to Top Five. ${5 -
                (snapshot.numChildren() + checked.length)} spots left.`,
              5000
            );
          } else {
            ref.launch_error(`Top Five already set`);
          }
        });
    },
    addAlbumToFavorites(index) {
      console.log(this.album);
      console.log(this.album.tracks.track);
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.albumObject = this.album;
      this.albumObject.image_url = this.albumImg;
      ref.itemInFavorites = false;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/favorites")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          console.log(arr);

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "album") {
              if (
                ref.albumObject.artist == arr[i].artist &&
                ref.albumObject.name == arr[i].name
              ) {
                ref.itemInFavorites = true;
              }
            }
          }

          if (!ref.itemInFavorites) {
            var newPostRef = firebase
              .database()
              .ref("userObjects/" + user.uid + "/favorites/")
              .push();

            newPostRef.set({
              artist: ref.albumObject.artist,
              image: ref.albumObject.image,
              listeners: ref.albumObject.listeners,
              name: ref.albumObject.name,
              playcount: ref.albumObject.playcount,
              tags: ref.albumObject.tags,
              tracks: ref.albumObject.tracks,
              type: ref.albumObject.type,
              url: ref.albumObject.url
            });
            ref.launch_success(`${ref.albumObject.name} added to favorites`);
          } else {
            ref.launch_error(`${ref.albumObject.name} already in favorites`);
          }
        });
    },
    addAlbumToTopFive() {
      console.log(this.album);
      // console.log(this.album.tracks.track);
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.albumObject = this.album;
      this.albumObject.image_url = this.albumImg;
      ref.itemInTopFive = false;
      ref.itemInTopFiveCopy = false;

      console.log(this.albumObject);
      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/topfive")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          // console.log(arr);

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "album") {
              if (
                ref.albumObject.artist == arr[i].artist &&
                ref.albumObject.name == arr[i].name
              ) {
                ref.itemInTopFive = true;
                ref.itemInTopFiveCopy = true;
              }
            }
          }
          var images = [];
          var albumTracks = [];
          for (var is = 0; is < ref.albumObject.image.length; is++) {
            // textArray.push(artist.image[0]);
            const test = mapKeys(ref.albumObject.image[is], (value, key) => {
              if (key === "#text") return "text";
              return key;
            });
            images.push(test);
          }
          delete ref.albumObject.image;
          ref.albumObject.image = images;

          console.log(ref.albumObject);
          delete ref.albumObject.streamable;
          delete ref.albumObject.tracks.track[0].streamable;
          if (!ref.itemInTopFive) {
            if (snapshot.numChildren() < 5) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/topfive/")
                .push(ref.albumObject);
              ref.itemInTopFiveCopy = true;
              ref.launch_success(`${ref.albumObject.name} added to Top Five`);
            } else {
              ref.launch_error(`Top Five is set`);
            }
          } else {
            ref.launch_error(`${ref.albumObject.name} already in Top Five`);
          }
        });
    },
    grabAlbumSpotify() {
      var ref = this;
      this.access_token = this.getCookie("access_token");
      var spotifyApi = new SpotifyWebApi();
      // console.log(this.access_token);
      spotifyApi.setAccessToken(this.access_token);
      spotifyApi.searchArtists(this.name).then(
        function(data) {
          // console.log(`Search artists by name`, data.body);
          ref.spotifyArtistObject = data.body.artists.items[0];
          // console.log(data.body.artists.items[0]);
          // Get albums by a certain artist
          spotifyApi
            .getArtistAlbums(`${data.body.artists.items[0].id}`, { limit: 10 })
            .then(
              function(data) {
                var albObj = {};
                // console.log("Artist albums", data.body);
                for (var i = 0; i < data.body.items.length; i++) {
                  if (
                    ref.albumname.toLowerCase() ==
                    data.body.items[i].name.toLowerCase()
                  ) {
                    albObj = data.body.items[i];
                  }
                }
                ref.spotifyAlbumObject = albObj;

                var nums = [];
                spotifyApi.getAlbumTracks(albObj.id).then(
                  function(data) {
                    // console.log(data.body);
                    for (var t = 0; t < data.body.items.length; t++) {
                      // console.log(data.body.items[t].external_urls.spotify);
                      var seconds = Math.floor(
                        data.body.items[t].duration_ms / 1000
                      );
                      // nums.push(seconds);
                      var songObject = {
                        attr: {
                          rank: data.body.items[t].track_number
                        },
                        artist: {
                          href:
                            data.body.items[t].artists[0].external_urls.spotify,
                          id: data.body.items[t].artists[0].id,
                          name: data.body.items[t].artists[0].name,
                          type: data.body.items[t].artists[0].type
                        },
                        type: data.body.items[t].type,
                        id: data.body.items[t].id,
                        url: data.body.items[t].external_urls.spotify,
                        api: "lastfm-spotify",
                        name: data.body.items[t].name,
                        duration: seconds
                      };
                      ref.spotifySongs.push(songObject);
                    }
                  },
                  function(err) {
                    console.log("Something went wrong!", err);
                  }
                );
              },
              function(err) {
                console.error(err);
              }
            );
        },
        function(err) {
          console.error(err);
        }
      );
    },
    grabSpotifyArtist() {
      var ref = this;
      this.album.api = "spotify";
      this.access_token = this.getCookie("access_token");
      var spotifyApi = new SpotifyWebApi();
      // console.log(this.access_token);
      spotifyApi.setAccessToken(this.access_token);
      spotifyApi.searchArtists(this.name).then(
        function(data) {
          // console.log(`Search artists by name`, data.body);
          ref.spotifyArtistObject = data.body.artists.items[0];
          // console.log(data.body.artists.items[0]);
          // Get albums by a certain artist
          spotifyApi
            .getArtistAlbums(`${data.body.artists.items[0].id}`, { limit: 10 })
            .then(
              function(data) {
                var albObj = {};
                console.log("Artist albums", data.body);
                var albumSplit = ref.albumname.split(" ");
                var strMatchCount = 0;
                console.log(albumSplit);
                // var spotifyAlbumSplit = null;
                for (var i = 0; i < data.body.items.length; i++) {
                  var spotifyAlbumSplit = data.body.items[i].name.split(" ");
                  // for(var ik = 0; ik < albumSplit.length; ik++){
                  //     if(albumSplit[ik]  == spotifyAlbumSplit[ik] && albumSplit[ik+1] == spotifyAlbumSplit[ik+1]){
                  //        console.log(albumSplit[ik]);
                  //        console.log(albumSplit[ik+1]);
                  //        console.log(spotifyAlbumSplit[ik]);
                  //        console.log(spotifyAlbumSplit[ik+1]);
                  //         ref.spotifyAlbumObject = data.body.items[i-1];
                  //        console.log(ref.spotifyAlbumObject);
                  //         break;
                  //         break;
                  //       }
                  // }
                  if (
                    ref.albumname.toLowerCase() ==
                    data.body.items[i].name.toLowerCase()
                  ) {
                    albObj = data.body.items[i];
                    break;
                  }
                }
                // console.log(albObj);
                ref.spotifyAlbumObject = albObj;
                console.log(ref.spotifyAlbumObject);
                ref.album.uri = ref.spotifyAlbumObject.uri;
                // console.log(ref.album);
                ref.albumImg = ref.spotifyAlbumObject.images[1].url;
                var utc = new Date(albObj.release_date).toUTCString();
                utc =
                  utc.split(" ")[1] +
                  " " +
                  utc.split(" ")[2] +
                  " " +
                  utc.split(" ")[3];
                // console.log(utc);
                ref.spotifyAlbumReleaseDate = utc;
                // console.log(utc);
                // console.log(albObj);
                var nums = [];
                spotifyApi.getAlbumTracks(ref.spotifyAlbumObject.id).then(
                  function(data) {
                    // console.log(data.body);
                    for (var t = 0; t < data.body.items.length; t++) {
                      // console.log(data.body.items[t].external_urls.spotify);
                      var seconds = Math.floor(
                        data.body.items[t].duration_ms / 1000
                      );
                      nums.push(seconds);
                      var songObject = {
                        attr: {
                          rank: data.body.items[t].track_number
                        },
                        artist: {
                          href:
                            data.body.items[t].artists[0].external_urls.spotify,
                          id: data.body.items[t].artists[0].id,
                          name: data.body.items[t].artists[0].name,
                          type: data.body.items[t].artists[0].type
                        },
                        type: data.body.items[t].type,
                        id: data.body.items[t].id,
                        url: data.body.items[t].external_urls.spotify,
                        api: "spotify",
                        name: data.body.items[t].name,
                        duration: seconds,
                        uri: data.body.items[t].uri
                      };
                      // console.log(songObject);
                      ref.album.tracks.track.push(songObject);
                      // console.log(ref.album.tracks.track);
                      ref.spotifySongs = ref.album.tracks.track;
                      ref.albumTracks.push(songObject);
                    }
                    const add = (a, b) => a + b;
                    // use reduce to sum our array
                    const sum = nums.reduce(add);
                    ref.spotifyTotalAlbumTime = sum;
                    // console.log(sum);
                  },
                  function(err) {
                    console.log("Something went wrong!", err);
                  }
                );
              },
              function(err) {
                console.error(err);
              }
            );
        },
        function(err) {
          console.error(err);
        }
      );
    },
    retrieveInfo(keys) {
      console.log(keys);
      this.mykeys = keys;
      return this.mykeys;
    },
    showPlaylistForm(event) {
      var str = event.target.innerHTML;
      str = str.toLowerCase();
      // console.log(str);
      if (str.toLowerCase() == "cancel") {
        this.showForm = false;
      } else {
        this.showForm = true;
      }
    },
    createPlaylist() {
      var ref = this;
      console.log(ref.newPlaylistObject);
      var playlistObj = {};
      playlistObj = ref.newPlaylistObject;
      var database = firebase.database();
      console.log(playlistObj.name);
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/playlists")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          console.log(ref.newPlaylistObject.name);
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          // console.log(arr);
          // console.log(arr.length);
          if (arr.length > 0) {
            var playlistExists = false;
            for (var i = 0; i < arr.length; i++) {
              // console.log(arr[i].name);
              // console.log(arr[i].name == ref.newPlaylistObject.name);
              if (arr[i].name == ref.newPlaylistObject.name) {
                playlistExists = true;
              }
            }
            // console.log(playlistExists);
            if (!playlistExists) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/playlists")
                .push();
              newPostRef.set({
                name: ref.newPlaylistObject.name,
                description: ref.newPlaylistObject.description,
                songs: []
              });
              ref.launch_success(
                `Playlist '${ref.newPlaylistObject.name}' created`
              );
              ref.newPlaylistObject.name = "";
              ref.newPlaylistObject.description = "";
            } else {
              // alert("Playist name already exists");
              ref.launch_error(
                `Playlist '${ref.newPlaylistObject.name}' already exists`
              );
            }
          } else {
            var newPostRef = firebase
              .database()
              .ref("userObjects/" + user.uid + "/playlists")
              .push();
            newPostRef.set({
              name: ref.newPlaylistObject.name,
              description: ref.newPlaylistObject.description,
              songs: []
            });
            ref.launch_success(
              `Playlist '${ref.newPlaylistObject.name}' created`
            );
            ref.newPlaylistObject.name = "";
            ref.newPlaylistObject.description = "";
          }
        });

      // });
    },
    addToFavorites(ind) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.songObject = this.album.tracks.track[ind];
      console.log(this.songObject);
      this.songObject.type = "track";
      this.songObject.image_url = this.albumImg;
      ref.itemInFavorites = false;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/favorites")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          snapshot.forEach(function(childNodes) {
            // console.log(childNodes.val());
            arr.push(childNodes.val());
          });

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "track") {
              if (
                arr[i].name == ref.songObject.name &&
                ref.songObject.artist.name == arr[i].artist.name &&
                ref.songObject.attr.rank == arr[i].attr.rank
              ) {
                ref.itemInFavorites = true;
              }
            }
          }

          console.log(ref.itemInFavorites);
          if (!ref.itemInFavorites) {
            var pushObject = {};

            if (
              ref.songObject.api == "spotify" ||
              ref.songObject.api == "lastfm-spotify"
            ) {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/favorites/")
                .push(ref.songObject);
              ref.launch_success(`${ref.songObject.name} added to favorites`);
            } else {
              var newPostRef = firebase
                .database()
                .ref("userObjects/" + user.uid + "/favorites/")
                .push(ref.songObject);
              ref.launch_success(`${ref.songObject.name} added to favorites`);
            }
          } else {
            // alert("already in favorites");
            ref.launch_error(`${ref.songObject.name} already in favorites`);
          }
        });
    },
    addToTopFive(ind) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.songObject = this.album.tracks.track[ind];
      this.songObject.image_url = this.albumImg;
      this.songObject.type = "track";
      console.log(this.songObject);
      ref.itemInTopFive = false;
      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/topfive")
        .once("value")
        .then(function(snapshot) {
          var arr = [];
          console.log(snapshot.numChildren());
          snapshot.forEach(function(childNodes) {
            console.log(childNodes.val());
            arr.push(childNodes.val());
          });
          // console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == "track") {
              if (
                arr[i].name == ref.songObject.name &&
                ref.songObject.artist.name == arr[i].artist.name &&
                ref.songObject.attr.rank == arr[i].attr.rank
              ) {
                ref.itemInTopFive = true;
              }
            }
          }

          if (snapshot.numChildren() < 5) {
            if (!ref.itemInTopFive) {
              var pushObject = {};

              if (
                ref.songObject.api == "spotify" ||
                ref.songObject.api == "lastfm-spotify"
              ) {
                var newPostRef = firebase
                  .database()
                  .ref("userObjects/" + user.uid + "/topfive/")
                  .push(ref.songObject);
                ref.launch_success(`${ref.songObject.name} added to Top Five`);
                ref.topFiveCount++;
              } else {
                var newPostRef = firebase
                  .database()
                  .ref("userObjects/" + user.uid + "/topfive/")
                  .push(ref.songObject);

                ref.topFiveCount++;
                ref.launch_success(`${ref.songObject.name} added to Top Five`);
              }
            } else {
              ref.launch_error(`${ref.songObject.name} already in Top Five`);
            }
          } else {
            ref.launch_error(`Top Five is set`);
          }
        });
    },
    addToPlaylist(ind, playlistIndex) {
      var database = firebase.database();
      var user = firebase.auth().currentUser;
      var ref = this;
      this.songObject = this.album.tracks.track[ind];
      this.songObject.type = "track";
      ref.songObject.image_url = ref.albumImg;
      delete ref.songObject.streamable;
      console.log(this.songObject);
      firebase
        .database()
        .ref("userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {})
        .then(function(snap) {
          var playlistKey = "";
          var songsInPlaylist = [];
          var keys = [];
          snap.forEach(function(childNodes) {
            console.log(childNodes.key);
            ref.mykeys.push(childNodes.key);
            playlistKey = childNodes.key;
          });
          console.log(playlistKey);
          firebase
            .database()
            .ref("userObjects/" + user.uid + "/playlists/" + playlistKey)
            .once("value", function(snapshot) {})
            .then(
              function(snap) {
                snap.forEach(function(item) {
                  var itemVal = item.val();
                  keys.push(itemVal);
                  console.log(keys);
                });
                // console.log(snap.val());
                // console.log(snap.val()[0]);

                snap.forEach(function(childNodes) {
                  console.log(childNodes.val());
                  var songKVObject = {
                    key: childNodes.key,
                    value: childNodes.val()
                  };
                  // if (childNodes.val().songs) {
                  songsInPlaylist.push(childNodes.val().songs);
                  // console.log(songsInPlaylist.length);
                  // }
                  // console.log(ref.mykeys);
                });
                // console.log(songsInPlaylist[0].length);
                // console.log(ref.retrieveInfo(keys)[0]);
                // console.log(songsInPlaylist.length);
                if (songsInPlaylist == null) {
                  console.log("if");
                  firebase
                    .database()
                    .ref("userObjects/" + user.uid + "/playlists/" + "songs")
                    .orderByChild("songs")
                    .equalTo("")
                    .once("value", snapshot => {
                      if (snapshot.exists()) {
                        console.log("exists!");
                        // const userData = snapshot.val();
                      } else {
                        console.log("Does not exist");
                        const data = snap.val() || null;
                        if (data) {
                          const id = Object.keys(data)[0];
                          console.log(id);
                          console.log(ref.songObject);
                          var d = new Date();
                          var n = d.getTime();
                          ref.songObject.time_stamp = n;
                          var newPostRef = firebase
                            .database()
                            .ref("userObjects/" + user.uid + "/playlists/" + id)
                            .push(ref.songObject);

                          ref.launch_success(`Added to `);
                          // console.log(newPostRef.key);
                        }
                      }
                    });
                } else {
                  console.log("else");
                  // console.log(ref.mykeys);

                  console.log(playlistIndex);
                  console.log(ref.mykeys);

                  var newPostRef = firebase
                    .database()
                    .ref(
                      "userObjects/" +
                        user.uid +
                        "/playlists/" +
                        ref.mykeys[playlistIndex] +
                        "/songs"
                    )
                    .push();
                  if (ref.songObject.artist.mbid) {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  } else if (ref.songObject.artist.url) {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  } else {
                    var d = new Date();
                    var n = d.getTime();
                    ref.songObject.time_stamp = n;
                    var newPostRef = firebase
                      .database()
                      .ref(
                        "userObjects/" +
                          user.uid +
                          "/playlists/" +
                          ref.mykeys[playlistIndex] +
                          "/songs"
                      )
                      .push(ref.songObject);
                  }
                  ref.launch_success(
                    `Added to ${ref.playlistsObjects[playlistIndex].name}`
                  );
                }
              },
              function(error) {
                // The Promise was rejected.
                console.error(error);
              }
            );
        });
    },
    getSongLyrics() {
      var ref = this;
      console.log(this.songLyricsHolder);
      this.currentTrack.lyrics = this.songLyricsHolder[this.currentIndex];
    },
    buttonOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "block";
    },
    lyricsButtonOnClick(evt) {
      var lyricsModal = document.getElementById(`myModalLyrics`);
      lyricsModal.style.display = "block";
      var str = evt.target.innerHTML.toLowerCase().toString();
      if (str.includes("lyrics")) {
        this.displayLyrics();
      } else {
        this.displayQueue();
      }
      this.getSongLyrics();
    },
    lyricsSpanOnClick() {
      var lyricsModal = document.getElementById(`myModalLyrics`);
      lyricsModal.style.display = "none";
    },
    spanOnClick(ind) {
      var modal = document.getElementById(`myModal${ind}`);
      modal.style.display = "none";

      // this.hideCheckboxes();
      // this.songObject = {};
    },
    getUsersPlaylists() {
      var database = firebase.database();
      var ref = this;
      var user = firebase.auth().currentUser;

      firebase
        .database()
        .ref("/userObjects/" + user.uid + "/playlists")
        .once("value", function(snapshot) {
          // console.log(snapshot.val());
        })
        .then(
          function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              var obj = {
                name: childSnapshot.val().name,
                description: childSnapshot.val().description
              };
              // console.log(obj);
              ref.playlistsObjects.push(obj);
            });
          },
          function(error) {
            // The Promise was rejected.
            console.error(error);
          }
        );
    }
  },
  created() {
    var ref = this;
    var user = firebase.auth().currentUser;
    document.addEventListener("click", this.onClick);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        ref.authUser = true;
      } else {
      }
    });
    let ckeditor = document.createElement("script");
    ckeditor.setAttribute("src", "https://sdk.scdn.co/spotify-player.js");
    document.head.appendChild(ckeditor);

    // Called when the Spotify Web Playback SDK is ready to use
    window.onSpotifyWebPlaybackSDKReady = () => {
      // Define the Spotify Connect device, getOAuthToken has an actual token
      // hardcoded for the sake of simplicity
      ref.player = new Spotify.Player({
        name: "A Spotify Web SDK Player",
        getOAuthToken: callback => {
          // callback(ref.access_token);
          callback(
            "BQDc8ZqTbS3jJUoPd5GWOfQa8VyezF4EEoN_gEhAJ2bPqaL0USy654oC1Ud1AV1m_i42T2SC5RbNxg0ChbVY86oMvAigywFg6PUk5aMBHC2HX5sodVJZXPv_IhMAHUPrfICn-dLn3R8Cud6KfUOhKRLOzBJ25w9hzT3wnTc39sY2ik7ujcnxA6vXCT9z"
          );
        },
        volume: 0.1
      });

      // Called when connected to the player created beforehand successfully
      ref.player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);

        // play({
        //   playerInstance: player,
        //   spotify_uri: 'spotify:track:0cZMA3EdKJKrKoGQEeMhFJ',
        // });
      });

      // Connect to the player created beforehand, this is equivalent to
      // creating a new device which will be visible for Spotify Connect
      ref.player.connect();
    };
    this.getUsersPlaylists();
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=8b54926771ecc9a7145bbe1e430f1782&artist=${this.name}&album=${this.albumname}&format=json`
      )
      .then(res => {
        console.log(res);
        this.album = res.data.album;
        this.album.type = "album";
        this.album.api = "lastfm";
        this.albumImg = this.album.image[3]["#text"];
        console.log(res.data.album);
        var images = [];
        var albumTracks = [];
        for (var i = 0; i < res.data.album.image.length; i++) {
          // textArray.push(artist.image[0]);
          const test = mapKeys(res.data.album.image[i], (value, key) => {
            if (key === "#text") return "text";
            return key;
          });
          images.push(test);
        }
        // console.log(images);
        delete this.album.image;
        this.album.image = images;
        for (var j = 0; j < res.data.album.tracks.track.length; j++) {
          // for (var k = 0; k < 6; k++) {
          delete res.data.album.tracks.track[j].streamable;
          const test = mapKeys(res.data.album.tracks.track[j], (value, key) => {
            if (key === "@attr") return "attr";
            return key;
          });
          // console.log(test);
          albumTracks[j] = test;
          // delete artist.similar.artist[j].image[k];
          // artist.similar.artist[j].image[k] = similarArtistImages[k];
          // }
        }
        // console.log(albumTracks);
        delete this.album.tracks.track;
        this.album.tracks.track = albumTracks;

        // console.log(this.album.tracks.track);
        // console.log(res.data.album.tracks.track.length);
        if (res.data.album.tracks.track.length <= 0) {
          console.log("no tracks so spotify");
          this.grabSpotifyArtist();
        } else {
          console.log("no tracks so spotify else");
          var ref = this;
          this.access_token = this.getCookie("access_token");
          var spotifyApi = new SpotifyWebApi();
          console.log(this.access_token !== "undefined");
          if (this.access_token !== "undefined") {
            spotifyApi.setAccessToken(this.access_token);
            spotifyApi.searchArtists(this.name).then(
              function(data) {
                console.log(`${data.body.artists.items[0].id}`);
                // Get albums by a certain artist
                spotifyApi
                  .getArtistAlbums(`${data.body.artists.items[0].id}`, {
                    limit: 10
                  })
                  .then(
                    function(data) {
                      // console.log(data.body.items);
                      var albObj = {};
                      // console.log("Artist albums", data.body);
                      for (var i = 0; i < data.body.items.length; i++) {
                        if (
                          ref.albumname.toLowerCase() ==
                          data.body.items[i].name.toLowerCase()
                        ) {
                          albObj = data.body.items[i];
                          ref.album.uri = albObj.uri;
                          ref.existsInSpotify = true;
                        }
                      }

                      console.log(albObj);
                      if (ref.existsInSpotify) {
                        var nums = [];
                        spotifyApi.getAlbumTracks(albObj.id).then(
                          function(data) {
                            ref.album.api = "lastfm-spotify";
                            // console.log(data.body);
                            for (var t = 0; t < data.body.items.length; t++) {
                              // console.log(data.body.items[t].external_urls.spotify);
                              var seconds = Math.floor(
                                data.body.items[t].duration_ms / 1000
                              );
                              // nums.push(seconds);
                              if (
                                ref.album.tracks.track[t] &&
                                ref.album.tracks.track[t].url
                              ) {
                                var songObject = {
                                  attr: {
                                    rank: data.body.items[t].track_number
                                  },
                                  artist: {
                                    href:
                                      data.body.items[t].artists[0]
                                        .external_urls.spotify,
                                    id: data.body.items[t].artists[0].id,
                                    name: data.body.items[t].artists[0].name,
                                    type: data.body.items[t].artists[0].type
                                  },
                                  type: data.body.items[t].type,
                                  id: data.body.items[t].id,
                                  spotify_url:
                                    data.body.items[t].external_urls.spotify,
                                  lastfm_url: ref.album.tracks.track[t].url,
                                  api: "lastfm-spotify",
                                  name: data.body.items[t].name,
                                  duration: seconds,
                                  uri: data.body.items[t].uri
                                };
                                ref.spotifySongs.push(songObject);
                                ref.albumTracks.push(songObject);
                              }
                            }
                            ref.album.tracks.track = ref.spotifySongs;
                            console.log(ref.spotifySongs);
                            console.log(ref.album.tracks.track);
                          },
                          function(err) {
                            console.log("Something went wrong!", err);
                          }
                        );
                      } else {
                        console.log("hit");
                        for (
                          var j = 0;
                          j < res.data.album.tracks.track.length;
                          j++
                        ) {
                          res.data.album.tracks.track[j].api = "lastfm";
                        }
                      }
                    },
                    function(err) {
                      console.error(err);
                    }
                  );
              },
              function(err) {
                console.error(err);
                for (var j = 0; j < res.data.album.tracks.track.length; j++) {
                  res.data.album.tracks.track[j].api = "lastfm";
                }
              }
            );
          } else {
            console.log(ref.album);
            for (var j = 0; j < res.data.album.tracks.track.length; j++) {
              res.data.album.tracks.track[j].api = "lastfm";
            }
          }
        }

        var ref = this;
        //set album in top five
        firebase
          .database()
          .ref("/userObjects/" + user.uid + "/topfive")
          .once("value")
          .then(function(snapshot) {
            var arr = [];
            snapshot.forEach(function(childNodes) {
              // console.log(childNodes.val());
              arr.push(childNodes.val());
            });
            // console.log(arr);
            // console.log(res.data.album);
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].type == "album") {
                console.log(
                  res.data.album.artist == arr[i].artist &&
                    res.data.album.name == arr[i].name
                );
                if (
                  res.data.album.artist == arr[i].artist &&
                  res.data.album.name == arr[i].name
                ) {
                  ref.itemInTopFive = true;
                  ref.itemInTopFiveCopy = true;
                }
              }
            }
          });
      });
    //set in top five counter badge
    firebase
      .database()
      .ref("/userObjects/" + user.uid + "/topfive")
      .once("value")
      .then(function(snapshot) {
        var arr = [];
        snapshot.forEach(function(childNodes) {
          // console.log(childNodes.val());
          arr.push(childNodes.val());
        });
        ref.topFiveCount = snapshot.numChildren();
      });

    ///
    var albArr = [];
    var albumForLyrics = "";
    // `https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${this.name}&page_size=5&apikey=e1e7d690b29b45c4ce5fbea05aef7b50`,
    axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${this.name}&page_size=5&apikey=e1e7d690b29b45c4ce5fbea05aef7b50`
    }).then(function(response) {
      // console.log(response);
      var artist = response.data.message.body.artist_list[0].artist;
      console.log(artist);
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artist.artist_id}&s_release_date=desc&page_size=100&g_album_name=1&apikey=e1e7d690b29b45c4ce5fbea05aef7b50`
        )
        .then(res => {
          console.log(res);
          var albumSplit = ref.albumname.split(" ");
          console.log(ref.albumname);
          for (var i = 0; i < res.data.message.body.album_list.length; i++) {
            console.log(res.data.message.body.album_list[i].album.album_name);
            if (
              ref.albumname.toLowerCase() ==
              res.data.message.body.album_list[i].album.album_name.toLowerCase()
            ) {
              // console.log(res.data.message.body.album_list[i].album);
              albumForLyrics = res.data.message.body.album_list[i].album;
            }
            // var spotifyAlbumSplit = res.data.message.body.album_list[i].album.album_name.split(' ');
            //   for(var ik = 0; ik < albumSplit.length; ik++){
            //     // if(spotifyAlbumSplit[ik]){
            //       console.log(albumSplit[ik]  == spotifyAlbumSplit[ik] && albumSplit[ik+1] == spotifyAlbumSplit[ik+1]);
            //       if(albumSplit[ik]  == spotifyAlbumSplit[ik] && albumSplit[ik+1] == spotifyAlbumSplit[ik+1]){
            //          console.log(albumSplit[ik]);
            //          console.log(albumSplit[ik+1]);
            //          console.log(spotifyAlbumSplit[ik]);
            //          console.log(spotifyAlbumSplit[ik+1]);
            //          console.log(res.data.message.body.album_list[i]);
            //           // break;
            //           // albumForLyrics = res.data.message.body.album_list[i].album;
            //      albArr.push(res.data.message.body.album_list[i].album);
            //      //  console.log(ref.spotifyAlbumObject);
            //           break;
            //         }
            //       // }
            //   }
          }
          // console.log(albArr);
          // albumForLyrics = albArr[0];
          // console.log(albumForLyrics);

          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumForLyrics.album_id}&page=1&apikey=e1e7d690b29b45c4ce5fbea05aef7b50`
            )
            .then(res => {
              console.log(res);
              var tracks = [];
              for (
                var t = 0;
                t < res.data.message.body.track_list.length;
                t++
              ) {
                tracks.push(res.data.message.body.track_list[t].track.track_id);
              }
              // console.log(ref.albumTracks);
              // console.log(tracks);
              var axiosArray = [];
              for (var x = 0; x < ref.albumTracks.length; x++) {
                // console.log(tracks[x]);
                if (tracks[x] != undefined) {
                  axiosArray.push(
                    axios.get(
                      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${tracks[x]}&apikey=e1e7d690b29b45c4ce5fbea05aef7b50`
                    )
                  );
                }
              }
              // console.log(axiosArray)
              // axiosArray.pop();
              axios.all(axiosArray).then(function(results) {
                // console.log(results);
                results.forEach(function(response) {
                  // console.log(response.data.message.body.lyrics.lyrics_body);
                  ref.songLyricsHolder.push(
                    response.data.message.body.lyrics.lyrics_body
                  );
                  // ref.albumTracks.lyrics = response.data.message.body.lyrics.lyrics_body;

                  // mainObject[response.identifier] = response.value;
                });
                // for(var e = 0; e< ref.albumTracks.length;e++){
                //   ref.albumTracks[e].lyrics = ref.songLyricsHolder[e];
                // }

                // console.log(ref.albumTracks);
              });
              // for (var xl = 0; xl <ref.albumTracks.length; xl++) {
              //   // console.log(axiosArray[xl]);
              //          axios
              //       .get(
              //         axiosArray[xl]
              //       )
              //       .then(res => {
              // // console.log(res);
              //        console.log(res.data.message.body.lyrics.lyrics_body);

              // });
              // }
              //         for(var tr=0; tr<ref.albumTracks.length;tr++){
              // const cryptoUrl = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + tracks[tr].toString() +"&apikey=e1e7d690b29b45c4ce5fbea05aef7b50";
              //          console.log(cryptoUrl);
              //          axios
              //       .get(
              //         cryptoUrl
              //       )
              //       .then(res => {
              //         console.log(res);
              //         // console.log(res.data.message.body.lyrics.lyrics_body);
              //         ref.songLyricsHolder.push(res.data.message.body.lyrics.lyrics_body);
              //         for(var tra=0; tra<ref.albumTracks.length;tra++){
              //           //  ref.albumTracks[tr].lyrics =res.data.message.body.lyrics.lyrics_body;
              //            ref.albumTracks[tra].lyrics =ref.songLyricsHolder[tra];
              //             }
              //         console.log(ref.albumTracks);
              //         console.log(ref.songLyricsHolder);
              //       });
              //         }
            });
        });
    });
  },
  updated() {
    var user = firebase.auth().currentUser;
    var ref = this;
    var database = firebase.database();
    // console.log("update hook");
    firebase
      .database()
      .ref("/userObjects/" + user.uid + "/topfive")
      .once("value")
      .then(function(snapshot) {
        var arr = [];
        snapshot.forEach(function(childNodes) {
          // console.log(childNodes.val());
          arr.push(childNodes.val());
        });
        ref.topFiveCount = snapshot.numChildren();
      });
  },
  // mounted() {
  // },
  beforeDestroy() {
    document.removeEventListener("click", this.onClick);
  },
  destroyed() {
    clearInterval(mediaUpdate);
    this.player.disconnect();
  }
};
</script>

<style scoped>
#repeatBox + #repeatBoxLabel {
  content: "\1f501";
  display: flex;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

#repeatBox {
  display: none;
}

#repeatBox + #repeatBoxLabel:before {
  content: "\1f501";
  border: 0.1em solid #000;
  border-radius: 0.2em;
  display: inline-block;
  height: 23px;
  width: 23px;
  /* padding: 0px; */
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-bottom: 0.2em;
  vertical-align: bottom;
  color: transparent;
  transition: 0.2s;
}

#repeatBox + #repeatBoxLabel:active:before {
  transform: scale(0);
}

#repeatBox:checked + #repeatBoxLabel:before {
  /* background-color: MediumSeaGreen;
  border-color: MediumSeaGreen; */
  color: #000;
}

#repeatBox:disabled + #repeatBoxLabel:before {
  transform: scale(1);
  border-color: #aaa;
}

#repeatBox:checked:disabled + #repeatBoxLabel:before {
  content: "\1f501";
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}

.button-error {
  background-color: rgb(202, 60, 60); /* this is a maroon */
}
.button-add {
  background: rgb(28, 184, 65);
}
.dropdown {
  margin-bottom: 10px;
}
.left-contents {
  padding: 0.5em;
}
.tracks-box {
  /* margin-left: 20px; */
  padding-left: 10%;
  padding-right: 20px;
}
.l-box {
  padding: 0.5em;
  /* padding-left: 10px;
  padding-right: 10px; */
}

/* .playlistItem {
  border: #888 solid 2px;
  border-radius: 15px;
}
.playlistItem:hover {
  background-color: rgb(189, 184, 184);
  cursor: pointer;
}
.playlistItem:hover h3 {
  color: #234;
  cursor: pointer;
} */
#menuLink1 {
  vertical-align: middle;
  display: contents;
}
li,
#menuLink1,
a {
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
}
/* .pure-menu-link:hover {
  color: blue;
} */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #f81515;
  float: right;
  font-size: 32px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}

.search-bar {
  border-radius: 5px;
  border: 2px inset #696b76;
  padding: 5px;
}
/* dropdown */
#drop-down {
  float: left;
  margin-right: 20px;
}
.dropdownItem {
  color: #06c;
  cursor: pointer;
}
.dropdownItemRemove {
  color: red;
  cursor: pointer;
}
.dropdownItem:hover {
  color: white;
  background-color: rgb(51, 91, 124);
}

#drop-down ul {
  padding: 0;
  margin: 0;
  /* background: #fff; */
  float: left;
}

#drop-down li {
  float: left;
  display: inline;
  padding: 5px;
  position: relative;
  width: 120px;
  list-style: none;
}

#drop-down ul {
  position: absolute;
  left: 0;
  top: 100%;
  background: #ccc;
  display: none;
}

/* ul ul ul {
  left: 100%;
  top: 0;
  background: #999;
} */

#drop-down li:hover > ul {
  display: block;
}

/* checkboxes */
.my-checkbox {
  height: 25px;
  width: 25px;
  background: #2196f3;
}
.songCheckbox + .songCheckboxLabel {
  display: flex;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
}

.songCheckbox {
  display: none;
}

.songCheckbox + .songCheckboxLabel:before {
  content: "\2714";
  border: 0.1em solid #fff;
  border-radius: 0.2em;
  display: inline-block;
  height: 23px;
  width: 23px;
  /* padding: 0px; */
  padding-left: 0.2em;
  padding-bottom: 0.3em;
  margin-bottom: 0.2em;
  vertical-align: bottom;
  color: transparent;
  transition: 0.2s;
}

.songCheckbox + .songCheckboxLabel:active:before {
  transform: scale(0);
}

.songCheckbox:checked + .songCheckboxLabel:before {
  background-color: MediumSeaGreen;
  border-color: #fff;
  color: #fff;
}

.songCheckbox:disabled + .songCheckboxLabel:before {
  transform: scale(1);
  border-color: #aaa;
}

.songCheckbox:checked:disabled + .songCheckboxLabel:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}
.checkbox-l-box {
  padding: 4px;
}
.dropdwnvisible {
  visibility: hidden;
}
.media-container {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  color: #000;
  text-align: center;
}
.durationLabel {
  color: #000;
}
input[type="range"] {
  /* height: 25px; */
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #2497e3;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #2497e3;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #2497e3;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #2497e3;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type="range"]::-ms-fill-upper {
  background: #2497e3;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type="range"]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #2497e3;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #2497e3;
}
/* /////// */
.drop-down-parent {
  position: relative;
}
#drp {
  display: none;
  position: absolute;
  /* z-index: 400; */
  bottom: 100%;
  background: #2196f3;
}
.currentlyPlaying {
  color: #02d4db;
}
.pure-menu-link {
  color: #02d4db;
}
.pure-menu-link:hover {
  background: rgb(116, 116, 116);
  /* color: #02D4DB; */
}
.pure-menu-children {
  /* background: #696b76; */
}

.pure-menu-children li:hover {
  /* background: rgb(88, 89, 95); */
  color: #02d4db;
}
.current {
  color: rgb(28, 184, 65);
}
.modal-header {
  color: #000;
}
.pause {
  color: #ec3333;
}
/* .content p{
    color: #000;
  } */
#ptag {
  color: #000;
}
.summary-box {
  color: white;
}
</style>
