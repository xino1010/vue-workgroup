<template>
  <div class="app">
    <v-app id="inspire" dark>
      <v-navigation-drawer
          :clipped="drawer.clipped"
          :fixed="drawer.fixed"
          :permanent="drawer.permanent"
          :mini-variant="drawer.mini"
          v-model="drawer.open"
          app>
        <v-list dense class="pt-0">
          <v-list-tile
              v-if="!drawer.permanent"
              @click="makeDrawerPermanent">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Static Drawer</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="toggleMiniDrawer">
            <v-list-tile-action>
              <v-icon>aspect_ratio</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Mini Drawer</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click=""
              :to="item.path"
          >
            <v-list-tile-action>
              <v-icon :title="item.title">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
          app
          :fixed="toolbar.fixed"
          :clipped-left="toolbar.clippedLeft"
      >
        <v-toolbar-side-icon
            @click.stop="toggleDrawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>Vuetify Drawer Example</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app :fixed="footer.fixed" :clipped-left="footer.clippedLeft">
        <span class="caption mx-3">&copy; 2019, ITI - Free to use and learn from</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from 'vue-property-decorator';

  interface NavigationItem {
    title: string;
    icon: string;
    path: string;
  }

  @Component({})
  export default class App extends Vue {

    public drawer: any = {
      // sets the open status of the drawer
      open: true,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: false,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: true,
      // sets the drawer to the mini variant, showing only icons, of itself (true)
      // or showing the full drawer (false)
      mini: false,
    };
    public toolbar: any = {
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: false,
    };
    public footer: any = {
      // sets the CSS position of the footer
      fixed: true,
      // sets if the footer is full width (true) or gives space to the drawer (false)
      clippedLeft: true,
    };

    public items: NavigationItem[] = [
      {
        title: 'Home',
        icon: 'dashboard',
        path: '/',
      },
      {
        title: 'About',
        icon: 'question_answer',
        path: '/about',
      },
    ];

    // changes the drawer to permanent
    public makeDrawerPermanent(): void {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    }

    // toggles the drawer variant (mini/full)
    public toggleMiniDrawer(): void {
      this.drawer.mini = !this.drawer.mini;
    }

    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    public toggleDrawer(): void {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    }

  }

</script>

<style scoped>

</style>