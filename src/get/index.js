import React from "react";
import {useGet} from "restful-react";

const MyComponent = () => {
    const { data: randomDogImage } = useGet({
        path: "https://dog.ceo/api/breeds/image/random"
    });

    return (
        <img
            alt="Here's a good boye!"
            src={randomDogImage && randomDogImage.message}
        />
    );
};

export default MyComponent;
