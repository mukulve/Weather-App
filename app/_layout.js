import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          href: "/",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="weather/[slug]"
        options={{
          title: "Weather",
          href: null,
        }}
      />

      <Tabs.Screen
        name="weather/index"
        options={{
          title: "Weather",
          href: null,
        }}
      />
    </Tabs>
  );
}
