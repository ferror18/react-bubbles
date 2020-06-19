import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { ColorForm } from "./ColorForm";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('colors')
      .then((response) => {
        setColorList(response.data)
        
      })
      .catch((error) => console.log(`There is an error: ${error.response}`))
  },[])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <ColorForm setColorList={setColorList}/>
    </>
  );
};

export default BubblePage;
