<template>
  <div id="nav">
    <router-link class="link" to="/atbash">Атбаш</router-link>
    <router-link class="link" to="/caesar">Цезарь</router-link>
    <router-link class="link" to="/richelieu">Ришелье</router-link>
    <router-link class="link" to="/gronsfeld">Гронсфельд</router-link>
  </div>
  <router-view />
</template>

<style>
.link {
  margin-right: 10px;
}
</style>
