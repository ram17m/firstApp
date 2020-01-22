import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../views/Home.js";
import Profile from "../views/Profile.js";
import Single from "../views/Single.js";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "Home"
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Profile"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

const Navigator = createStackNavigator({
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

const AppContainer = createAppContainer(Navigator);

export default AppContainer;
