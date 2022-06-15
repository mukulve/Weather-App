<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    select(city) {
      localStorage.setItem("city", city);
      this.$router.push({ path: "/Weather" });
    },
    search() {
      var city = document.getElementById("searchfield").value;
      if (city == "") {
        alert("Please enter a city / location");
        return;
      } else {
        localStorage.setItem("city", city);
        this.$router.push({ path: "/Weather" });
      }
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="main">
    <div class="searchcontainer">
      <h1>Search For Weather Across The Globe</h1>
      <div class="searchform">
        <button @click="search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input id="searchfield" placeholder="Search" />
      </div>
    </div>
    <div class="recentlocations">
      <h2>Popular Locations</h2>
      <div class="recentlocationgrid">
        <div @click="select('Brampton')" class="recentlocationitem">
          <h4>Brampton</h4>
        </div>
        <div @click="select('Toronto')" class="recentlocationitem">
          <h4>Toronto</h4>
        </div>
        <div @click="select('Montreal')" class="recentlocationitem">
          <h4>Montreal</h4>
        </div>
        <div @click="select('Vancouver')" class="recentlocationitem">
          <h4>Vancouver</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

.searchcontainer {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.searchform {
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

input,
button {
  border: none;
  outline: none;
  background: var(--primary);
  padding: 0.7rem 1rem;
  width: 25rem;
  color: var(--text);
  border-radius: 0px 5px 5px 0px;
}

button {
  background: var(--button);
  width: 5rem;
  color: var(--bg);
  border-radius: 5px 0px 0px 5px;
}

.recentlocationgrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
}

.recentlocationitem {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 5px;
  background-color: var(--primary);
}

@media screen and (max-width: 650px) {
  .recentlocationgrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}

@media screen and (max-width: 410px) {
  .recentlocationitem {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 5px;
    background-color: var(--primary);
  }
}
</style>
