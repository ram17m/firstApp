import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../views/Home.js";
import Profile from "../views/Profile.js";
import Single from "../views/Single.js";
import AuthLoading from "../views/AuthLoading.js";
import Login from "../views/Login.js";
import { Icon } from "native-base";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Profile") {
          iconName = "person";
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} />;
      }
    })
  }
);

const StackNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      headerMode: "none"
    }
  },
  Single: {
    screen: Single
  }
});

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(Navigator);

export default AppContainer;
