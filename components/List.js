import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIHooks.js";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  return (
    <View style={{ marginTop: 19 }}>
      <FlatList
        data={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <ListItem
              item={item}
              navigation={props.navigation}
              singleMedia={item}
            />
          );
        }}
      />
    </View>
  );
};

export default List;

// <TouchableOpacity>
//   <View style={styles.container}>
//     <Image
//       style={styles.image}
//       source={{uri: item.thumbnails.w160}}
//     />
//     <View style={styles.details}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//     </View>
//   </View>
// </TouchableOpacity>
