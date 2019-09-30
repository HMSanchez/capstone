import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import HomePage from '@/components/HomePage'
import AccountPage from '@/account/AccountPage'
import LoginPage from '@/authentication/LoginPage'
import RegisterPage from '@/authentication/RegisterPage'
import SearchPage from '@/search/SearchPage'
import AlbumPage from '@/music/AlbumPage'
import ArtistDetails from '@/artist/ArtistDetails'
import ArtistPage from '@/artist/ArtistPage'
import ArtistAlbums from '@/artist/ArtistAlbums'
import ArtistSingles from '@/artist/ArtistSingles'
import DiscoverPage from '@/discover/DiscoverPage'
import TopArtistsPage from '@/discover/TopArtists'
import DiscoverPlaylists from '@/discover/DiscoverPlaylists'
import TopTracksPage from '@/discover/TopTracks'
import AccountPlaylists from '@/account/AccountPlaylists'
import AccountPlaylistPartial from '@/account/AccountPlaylistPartial'
import AccountFavorites from '@/account/FavoritesPage'
import AccountTopFive from '@/account/TopFivePage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }, {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }, , {
      path: '/artist/:name',
      props: true,
      name: 'ArtistPage',
      component: ArtistPage
    }, {
      path: '/search/:results',
      props: true,
      name: 'SearchPage',
      component: SearchPage,
    }, {
      path: '/artist/:name/details',
      props: true,
      name: 'ArtistDetails',
      component: ArtistDetails

    }, {
      path: '/artist/:name/albums',
      props: true,
      name: 'ArtistAlbums',
      component: ArtistAlbums
    }, {
      path: '/artist/:name/singles',
      props: true,
      name: 'ArtistSingles',
      component: ArtistSingles
    }, {
      path: '/artist/:name/:albumname',
      props: true,
      name: 'AlbumPage',
      component: AlbumPage
    }, {
      path: '/discover',
      props: true,
      name: 'DiscoverPage',
      component: DiscoverPage,
      children: [
        {
          name: 'TopArtists',
          path: '/discover/topartists',
          props: true,
          component: TopArtistsPage,
        },
        {
          name: 'TopTracks',
          path: '/discover/toptracks',
          props: true,
          component: TopTracksPage,
        },
        {
          name: 'DiscoverPlaylistsPage',
          path: '/discover/playlists',
          props: true,
          component: DiscoverPlaylists,
        }
      ]

    }, {
      path: '/account',
      name: 'AccountPage',
      component: AccountPage,
      children: [
        {
          name: 'AccountPlaylists',
          path: '/account/playlists',
          component: AccountPlaylists,
        },
        {
          name: 'AccountFavorites',
          path: '/account/favorites',
          component: AccountFavorites,
        },
        {
          name: 'AccountTopFive',
          path: '/account/topfive',
          component: AccountTopFive,
        }
      ],
      meta: {
        requiresAuth: true
      },
    }, {
      path: '/account/playlists/:playlistid',
      props: true,
      name: 'AccountPlaylistPartialPage',
      component: AccountPlaylistPartial,
      meta: {
        requiresAuth: true
      },
    }
    //   path: 'discover',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }, {
    //   path: 'browse',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }, {
    //   path: '/allAlbums/:id',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }, {
    //   path: '/allSingles/:id',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})

router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  var currentUser = firebase.auth().currentUser;
  // when route requires auth and there's no current user, reidrect to '/login'
  if (requiresAuth && !currentUser) {
    next('/login');
    // when we go to login route and are already logged in, we can skip this page
    // so we redirect to the homepage
  } else if (to.path == '/login' && currentUser) {
    next('/');
    // if none of the above matches, we have a normal navigation that should just go through
    // so we call `next()`
  } else {
    next(); // you called `next('/')` which redirected to the homepage over and over again.
  }
});

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('/register')
//   else next()
// })
export default router