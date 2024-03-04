import Home from "./components/Home";
import Scoreboard from "./components/Scoreboard";
import Gameboard from "./components/Gameboard";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {

  // Load fonts
   const [loaded] = useFonts({
    NotoSansRegular: require('./assets/fonts/NotoSans-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "Transparent" }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "information" : "information-outline";
            } else if (route.name === "Gameboard") {
              iconName = focused ? "dice-multiple" : "dice-multiple-outline";
            } else if (route.name === "Scoreboard") {
              iconName = focused ? "view-list" : "view-list-outline";
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            //return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#cfa600",
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
