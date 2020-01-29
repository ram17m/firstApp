import React, { useState, useEffect } from "react";
import { MediaProvider } from "./contexts/MediaContext";
import Navigator from "./navigators/Navigator";
import * as Expo from "expo";
import * as Font from "expo-font";

const App = () => {
  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setFontReady(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log("Waiting for fonts...");
    return <Expo.AppLoading />;
  }

  return (
    <MediaProvider>
      <Navigator></Navigator>
    </MediaProvider>
  );
};

export default App;

// <View style={styles.container}>
//   <Text>Open up App.js to start working on your app!</Text>
// </View>

// <View style={{marginTop: 19}}>
//   <FlatList
//     data={mediaArray}
//     renderItem={({item}) => {
//       return (
//         <TouchableOpacity>
//           <View style={styles.container}>
//             <Image
//               style={styles.image}
//               source={{uri: item.thumbnails.w160}}
//             />
//             <View style={styles.details}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       );
//     }}
//   />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor: '#fff',
//     marginTop: 5,
//     paddingTop: 10,
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#f9c2ff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   details: {
//     width: '45%',
//     flex: 1,
//     flexDirection: 'column',
//     padding: 10,
//   },
//   image: {
//     width: '20%',
//     height: 200,
//     flex: 1,
//     flexDirection: 'row',
//     margin: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 11,
//   },
// });

// const mediaArray = [
//   {
//     'key': '0',
//     'title': 'Title 1',
//     'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
//     'thumbnails': {
//       w160: 'http://placekitten.com/160/161',
//     },
//     'filename': 'http://placekitten.com/2048/1920',
//   },
//   {
//     'key': '1',
//     'title': 'Title 2',
//     'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
//     'thumbnails': {
//       w160: 'http://placekitten.com/160/162',
//     },
//     'filename': 'http://placekitten.com/2041/1922',
//   },
//   {
//     'key': '2',
//     'title': 'Title 3',
//     'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
//     'thumbnails': {
//       w160: 'http://placekitten.com/160/163',
//     },
//     'filename': 'http://placekitten.com/2039/1920',
//   },
// ];
