import React from "react";
import {useGet} from "restful-react";

const MyComponent = () => {
  const {data: imageUrl} = useGet({
    // Inferred from RestfulProvider in index.js
    path: "breeds/image/random",
    resolve: (image) => image && image.message
  });

  return imageUrl && <img alt="Here's a good boye!" src={imageUrl} />
};


export default MyComponent;
