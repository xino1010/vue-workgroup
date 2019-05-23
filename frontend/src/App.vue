<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation">
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-center">
          <router-link tag="li" active-class="active" to="/" exact>
            <a>Home</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/about">
            <a>About</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <div class="jumbotron">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  @media (min-width: 768px) {
    .navbar-nav.navbar-center {
      position: absolute;
      left: 50%;
      transform: translatex(-50%);
    }
  }
</style>