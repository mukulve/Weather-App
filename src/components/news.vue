<script>
export default {
  data() {
    return {
      title: "",
      media: "",
      published_date: "",
      clean_url: "",
    };
  },
  methods: {
    fetchNews() {
      if (
        document.querySelectorAll(".newsgriditem")[0].innerText.length === 0
      ) {
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
            "X-RapidAPI-Host": "free-news.p.rapidapi.com",
          },
        };

        var searchterm = "";

        if (
          localStorage.getItem("city") == "" ||
          localStorage.getItem("city") == null ||
          localStorage.getItem("city") == undefined
        ) {
          searchterm = "Weather";
        } else {
          searchterm = localStorage.getItem("city");
        }

        fetch(
          "https://free-news.p.rapidapi.com/v1/search?q=" +
            searchterm +
            "&lang=en",
          options
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            for (let i = 0; i < 11; i++) {
              const { title } = response.articles[i];
              const { media } = response.articles[i];
              const { published_date } = response.articles[i];
              const { clean_url } = response.articles[i];

              var divs = document.querySelectorAll(".newsgriditem");
              const para = document.createElement("p");
              const img = document.createElement("img");
              img.src = media;
              img.style.height = "100px";
              img.style.aspectRatio = "16/9";
              img.style.borderRadius = "5px";
              para.style.fontSize = "1rem";
              para.style.lineHeight = "1.2rem";
              para.innerText = title.toLowerCase();
              divs[i].appendChild(para);
              divs[i].appendChild(img);
            }
          })
          .catch((err) => console.error(err));
      } else {
        console.log("news already fetched");
      }
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<template>
  <div class="news">
    <h2>News Near You</h2>
    <div class="newsgrid">
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
      <div class="newsgriditem"></div>
    </div>
  </div>
</template>

<style scoped>
.news h2 {
  margin-top: 1rem;
}

.news {
  padding-left: var(--padding);
  padding-right: var(--padding);
}
.newsgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.newsgriditem {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 5px;
  background-color: var(--primary);
  text-transform: capitalize;
  display: flex;
  gap: 1rem;
  flex-direction: row-reverse;
}

@media screen and (max-width: 1200px) {
  .newsgrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .newsgriditem {
    justify-content: space-between;
    text-align: right;
  }
}

@media screen and (max-width: 600px) {
  .newsgriditem {
    display: flex;
    flex-direction: column;
    flex-direction: column-reverse;
    text-align: center;
  }
}
</style>
