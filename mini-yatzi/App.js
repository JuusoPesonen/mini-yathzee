import Home from "./Components/Home";
import Scoreboard from "./Components/Scoreboard";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Gameboard from "./Components/Gameboard";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "Transparent" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Gameboard") {
              iconName = focused ? "gamepad" : "gamepad";
            } else if (route.name === "Scoreboard") {
              iconName = focused ? "pencil" : "pencil";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#957700",
          tabBarInactiveTintColor: "#000000",
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ tabBarStyle: { display: "none" } }} />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
