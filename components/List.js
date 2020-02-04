import React, { useContext } from "react";

import ListItem from "./ListItem";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIHooks.js";
import { List as BaseList } from "native-base";

const List = props => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  // console.log("rendering a list of data:", data);
  return (
    <BaseList
      dataArray={media}
      renderItem={({ item }) => {
        return (
          <ListItem
            item={item}
            navigation={props.navigation}
            singleMedia={item}
          />
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
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
