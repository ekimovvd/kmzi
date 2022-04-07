<template>
  <div>
    <div id="nav">
      <router-link class="link" to="/atbash">Атбаш</router-link>
      <router-link class="link" to="/caesar">Цезарь</router-link>
      <router-link class="link" to="/richelieu">Ришелье</router-link>
      <router-link class="link" to="/gronsfeld">Гронсфельд</router-link>
      <router-link class="link" to="/visener">Виженер</router-link>
      <router-link class="link" to="/playfair">Плейфер</router-link>
      <router-link class="link" to="/frequency">Частотный анализ</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
.link {
  margin-right: 10px;
}
</style>
