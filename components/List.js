import React from "react";
import { View, FlatList } from "react-native";
import ListItem from "./ListItem";

const List = props => {
  return (
    <View style={{ marginTop: 19 }}>
      <FlatList
        data={props.mediaArray}
        renderItem={({ item }) => {
          return <ListItem item={item} />;
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
