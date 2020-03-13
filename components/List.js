import React, { useContext, useState, useEffect } from "react";
import { List as BaseList, View, Spinner } from "native-base";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { getRestaurantByTag, getUserMedia } from "../hooks/APIHooks.js";
import { NavigationEvents } from "react-navigation";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";

const List = props => {
  const { media, setMedia, myMedia, setMyMedia } = useContext(MediaContext);
  const [loading, setLoading] = useState(true);

  const getMedia = async mode => {
    try {
      let data = [];
      if (mode === "all") {
        data = await getRestaurantByTag();
        setMedia(data);
      } else {
        const token = await AsyncStorage.getItem("userToken");
        data = await getUserMedia(token);
        setMyMedia(data.reverse());
      }
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getMedia(props.mode);
  }, []);

  return (
    <View>
      {loading ? (
        <Spinner />
      ) : (
        <BaseList
          dataArray={props.mode === "all" ? media : myMedia}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <ListItem
                navigation={props.navigation}
                singleMedia={item}
                mode={props.mode}
                getMedia={getMedia}
              />
            );
          }}
        />
      )}
    </View>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  mode: PropTypes.string
};

export default List;
