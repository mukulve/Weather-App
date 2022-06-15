<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<template>
  <div class="nav">
    <router-link to="/">
      <a><i class="fa-solid fa-sun"></i> Weather</a></router-link
    >
  </div>
</template>

<style scoped>
.nav {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  padding-left: var(--padding);
  padding-right: var(--padding);
}
.nav i {
  color: var(--orange);
}

.nav a {
  text-decoration: none;
  color: var(--text);
}
</style>
