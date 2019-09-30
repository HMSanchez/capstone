<template>
      <div>
    <a href="#" v-on:click.prevent="showDropDown=!showDropDown">
      <div>Catness</div>
      <img src="..." alt="avatar">
      <i :class="{ 'fa-caret-up': showDropDown, 'fa-caret-down': !showDropDown }" class="fa" aria-hidden="true"></i>
    </a>
    <div v-if="showDropDown">
      <ul class="menu list pl0 pa0 ma0">
        <li v-for="(link,ind) in links" class="list" :key="ind">
          <a href="#" class="dd-link pointer hover-bg-moon-gray">{{link.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import AlbumPage from '@/music/AlbumPage'

export default {
  name: "Dropdown",
  data() {
    return {
      showDropDown: true,
      links: [
        {
          name: "Account"
        },
        {
          name: "Profile"
        },
        {
          name: "Logout"
        }
      ]
    };
  },
}
</script>