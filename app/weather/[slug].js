import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Surface } from "react-native-paper";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [news, setNews] = useState({});
  const theme = useTheme();
  const { slug } = useLocalSearchParams();

  function kelvinToCelsius(temp) {
    return Math.floor(temp - 273.15);
  }

  function convertToTime(time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${hours}:${minutes}`;
    return formattedDate;
  }

  useEffect(() => {
    getWeather();
    getNews();
  }, [slug]);

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${slug}&appid=e0e3444373edc947e404e6d2b89050b6`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setWeather(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function getNews() {
    const url = `https://free-news.p.rapidapi.com/v1/search?q=${slug}&lang=en`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "26ed9a7238msh42eb30a06cd1235p174ef8jsnae84630d35a5",
        "X-RapidAPI-Host": "free-news.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setNews(result);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <ScrollView style={styles.page}>
        <ActivityIndicator animating={true} size={"large"} />
      </ScrollView>
    );
  }

  if (!loading) {
    return (
      <PaperProvider>
        <ScrollView style={styles.page}>
          <Text variant="headlineLarge" style={styles.pageTitle}>
            {slug}
          </Text>
          <Text variant="displayLarge" style={{ textAlign: "center" }}>
            {kelvinToCelsius(weather.main.temp)}°C
          </Text>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            {weather.weather[0].description}
          </Text>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            H:{kelvinToCelsius(weather.main.temp_max)}°C{"\t"}L:
            {kelvinToCelsius(weather.main.temp_min)}°C
          </Text>
          <View style={styles.grid}>
            <Surface elevation={0} style={styles.container}>
              <Text variant="headlineSmall">Feels Like</Text>
              <Text variant="headlineLarge">
                {kelvinToCelsius(weather.main.feels_like)}°C
              </Text>
            </Surface>
            <Surface elevation={0} style={styles.container}>
              <Text variant="headlineSmall">Sunrise</Text>
              <Text variant="headlineLarge">
                {convertToTime(weather.sys.sunrise)}
              </Text>
            </Surface>
            <Surface elevation={0} style={styles.container}>
              <Text variant="headlineSmall">Sunset</Text>
              <Text variant="headlineLarge">
                {convertToTime(weather.sys.sunset)}
              </Text>
            </Surface>
            <Surface elevation={0} style={styles.container}>
              <Text variant="headlineSmall">Wind</Text>
              <Text variant="headlineLarge">
                {Math.floor(weather.wind.speed)} m/sec
              </Text>
            </Surface>
            <Surface elevation={0} style={styles.container}>
              <Text variant="headlineSmall">Visibility</Text>
              <Text variant="headlineLarge">
                {Math.floor(weather.visibility / 1000)} Km
              </Text>
            </Surface>
          </View>
          {news.articles &&
            news.articles.map((item, index) => (
              <Card
                style={{
                  backgroundColor: theme.colors.onPrimary,
                  marginBottom: 20,
                }}
              >
                <Card.Cover source={{ uri: item.media }} />
                <Card.Title title={item.title} />
                <Card.Content>
                  <Text variant="bodyMedium">
                    {item.summary.length > 100
                      ? item.summary
                          .replace(/(\r\n|\n|\r)/gm, "")
                          .slice(0, 100) + "..."
                      : item.summary.replace(/(\r\n|\n|\r)/gm, "")}
                  </Text>
                </Card.Content>
              </Card>
            ))}
        </ScrollView>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  pageTitle: {
    marginBottom: 0,
    marginTop: 20,
    textAlign: "center",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  container: {
    width: "50%",
    padding: 15,
  },
});
