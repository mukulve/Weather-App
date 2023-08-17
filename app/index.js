import { Text } from "react-native-paper";
import { PaperProvider } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";

import { router } from "expo-router";

export default function Page() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState({});
  const onChangeSearch = (query) => setSearchQuery(query);
  const handleSearchSubmit = () => router.replace(`/weather/${searchQuery}`);

  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    const url =
      "https://free-news.p.rapidapi.com/v1/search?q=World News&lang=en";
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

  return (
    <PaperProvider>
      <ScrollView style={styles.page}>
        <Text variant="displayMedium" style={styles.pageTitle}>
          Weather
        </Text>
        <Searchbar
          style={{ backgroundColor: theme.colors.onPrimary, marginBottom: 20 }}
          placeholder="Search for a city"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={handleSearchSubmit}
        />
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
                    ? item.summary.replace(/(\r\n|\n|\r)/gm, "").slice(0, 100) +
                      "..."
                    : item.summary.replace(/(\r\n|\n|\r)/gm, "")}
                </Text>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  pageTitle: {
    marginBottom: 20,
    marginTop: 20,
  },
});
