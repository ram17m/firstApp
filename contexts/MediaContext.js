import React, { useState } from "react";
import PropTypes from "prop-types";

const MediaContext = React.createContext([{}, () => {}]);

// const response = await fetch('https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json');
// const mediaArray = await response.json();

const mediaArray = [];

const MediaProvider = props => {
  const [media, setMedia] = useState(mediaArray);
  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {props.children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node
};

export { MediaContext, MediaProvider };
