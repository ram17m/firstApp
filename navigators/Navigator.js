import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../views/Home.js";
import Profile from "../views/Profile.js";
import Upload from "../views/Upload.js";
import Single from "../views/Single.js";
import Login from "../views/Login.js";
import MyFiles from "../views/MyFiles.js";
import Modify from "../views/Modify.js";
import AuthLoading from "../views/AuthLoading.js";
import { Icon } from "native-base";

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Upload,
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
        } else if (routeName === "Upload") {
          iconName = "cloud-upload";
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
  },
  Logout: {
    screen: Login
  },
  MyFiles: {
    screen: MyFiles
  },
  Modify: {
    screen: Modify
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
