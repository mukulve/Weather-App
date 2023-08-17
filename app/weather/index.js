import { Text } from "react-native-paper";
import { PaperProvider } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";

export default function Page() {
  return (
    <PaperProvider>
      <ScrollView style={styles.page}>
        <Text variant="displaySmall" style={styles.pageTitle}>
          No City Or Location Provided
        </Text>
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
