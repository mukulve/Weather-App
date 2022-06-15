<script setup>
import News from "../components/News.vue";
import Footer from "../components/Footer.vue";
</script>
<script>
export default {
  data() {
    return {
      city: "",
      weather: "",
      icon: "",
      error: "",
      description: "",
      humidity: "",
      pressure: "",
      visibility: "",
      feels_like: "",
      wind: "",
      wind_deg: "",
    };
  },
  created() {
    window.addEventListener("resize", this.showmobilesearch);
  },
  destroyed() {
    window.removeEventListener("resize", this.showmobilesearch);
  },
  methods: {
    fetchWeather() {
      var city = localStorage.getItem("city");
      if (city == "") {
        alert("Please enter a city / location");
        return;
      }
      console.log(city);
      var apikey = "e0e3444373edc947e404e6d2b89050b6";

      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          apikey
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const { temp } = response.main;
          let temp_celcius = temp - 273.15;
          const { feels_like } = response.main;
          let feels_like_celcius = feels_like - 273.15;
          const { humidity } = response.main;
          const { pressure } = response.main;
          const { description } = response.weather[0];
          const { icon } = response.weather[0];
          const { name } = response;
          const { visibility } = response;
          const { speed } = response.wind;
          const { deg } = response.wind;
          this.city = name;
          this.weather = temp_celcius.toFixed(0) + "°C";
          this.description = description;
          this.icon = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
          this.humidity = humidity + "%";
          this.pressure = pressure + "hPa";
          this.visibility = visibility + "m";
          this.feels_like = feels_like_celcius.toFixed(0) + "°C";
          this.wind = speed + " m/s";
          this.wind_deg = deg + "°";
        })
        .catch((err) => console.error(err));
    },
    searchdesktop() {
      var desktopcity = document.getElementById("searchfield").value;
      if (desktopcity == "") {
        alert("Please enter a city / location");
        return;
      } else {
        localStorage.setItem("city", desktopcity);
        this.$router.push({ path: "/Weather" });
        location.reload();
      }
    },

    searchmobile() {
      var mobilecity = document.getElementById("mobilesearchfield").value;
      if (mobilecity == "") {
        alert("Please enter a city / location");
        return;
      } else {
        localStorage.setItem("city", mobilecity);
        this.$router.push({ path: "/Weather" });
        location.reload();
      }
    },
    showmobilesearch(e) {
      if (window.innerWidth > 660) {
        document.querySelectorAll(".mobilesearch")[0].style.display = "none";
      }
    },

    showmobilesearch1() {
      //check if display none is set
      if (
        document.querySelectorAll(".mobilesearch")[0].style.display == "none"
      ) {
        document.querySelectorAll(".mobilesearch")[0].style.display = "flex";
      } else {
        document.querySelectorAll(".mobilesearch")[0].style.display = "none";
      }
    },
  },
  mounted() {
    this.fetchWeather();
  },
};
</script>

<template>
  <div class="nav">
    <router-link to="/">
      <a><i class="fa-solid fa-sun"></i> Weather</a></router-link
    >
    <div class="searchform">
      <div class="desktop">
        <button @click="searchdesktop">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input id="searchfield" placeholder="Search" />
      </div>
      <div class="mobile">
        <a @click="showmobilesearch1"><i class="fa-solid fa-bars"></i></a>
      </div>
    </div>
  </div>
  <div id="mobilesearch" class="mobilesearch" style="display: none">
    <button @click="searchmobile">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    <input id="mobilesearchfield" placeholder="Search" />
  </div>
  <div class="weathergrid">
    <div class="weathergriditem">
      <a>Current Weather In {{ city }}</a>
    </div>
    <div class="weathergriditem"></div>
    <div class="weathergriditemflexrow">
      <img :src="icon" alt="" />
      <div class="flexcolumn">
        <h1>{{ weather }}</h1>
        <h3>Feels Like : {{ feels_like }}</h3>
      </div>
    </div>
    <div class="weathergriditemflexcolumn">
      <a>Humidity : {{ humidity }}</a>
      <a>Pressure : {{ pressure }}</a>
      <a>Visibility : {{ visibility }}</a>
      <a>Wind : {{ wind }} at {{ wind_deg }}</a>
    </div>
    <div class="weathergriditem">
      <a>{{ description }}</a>
    </div>
  </div>
  <News />
</template>

<style scoped>
.weathergrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
  margin-left: var(--padding);
  margin-right: var(--padding);
  margin-top: 2rem;
  background-color: var(--primary);
  border-radius: 5px;
}

.weathergrid div {
  margin-top: 0.5rem;
  line-height: 1.5;
}

.weathergriditem a {
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  text-transform: capitalize;
}

.weathergriditemflexrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.weathergriditemflexrow h1 {
  font-size: 5rem;
  margin: 0;
  padding: 0;
}

.weathergriditemflexrow h3 {
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
}

.weathergriditemflexrow img {
  width: 15rem;
  height: 15rem;
}

.weathergriditemflexcolumn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  height: 100%;
  justify-content: space-evenly;
}

.weathergriditemflexcolumn a {
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  padding-left: var(--padding);
  padding-right: var(--padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav i {
  color: var(--orange);
}

.nav a {
  text-decoration: none;
  color: var(--text);
}

.searchform {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mobile {
  display: none;
}

.mobilesearch {
  z-index: 4;
  display: none;
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

@media screen and (max-width: 1250px) {
  .weathergrid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
  .weathergriditemflexcolumn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    justify-items: center;
  }
  .weathergriditem {
    text-align: center;
  }
}

@media screen and (max-width: 660px) {
  .weathergriditemflexcolumn {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    justify-items: center;
  }
  .weathergriditemflexrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .mobile {
    display: block;
  }
  .desktop {
    display: none;
  }
  .mobilesearch {
    z-index: 4;
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding);
  }

  .mobilesearch input {
    width: 75%;
    max-width: 400px;
  }
  .mobilesearch button {
    width: 25%;
    max-width: 200px;
  }
}

@media screen and (max-width: 350px) {
  .weathergriditemflexrow img {
    width: 12rem;
    height: 12rem;
  }
  .weathergriditemflexcolumn a {
    font-size: 1.3rem;
    margin: 0;
    padding: 0;
  }
}
</style>
