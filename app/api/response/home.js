import { Images } from "@config";
import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios"
export const getHome = async ({ params }) => {
  await Utils.delay(1000);

  // for (let i = 0; i < category_array.length; i++) {
  //   console.log(`asd${i}`, category_array[i].name);

  // }
  const location = await Axios.get('http://semmsar.com/wp-json/_rtcl/_rtcl_location');
  const location_array = location.data


  const recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing?_embed');
  const recent_post = recent.data
 

  // recent_post.forEach(element => {
    
  // });




  const cat = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_category?_embed');
  const category_array = cat.data


  return {
    success: true,
    data: {
      sliders: [
        Images.event1,
        Images.automotive1,
        Images.food1,
        Images.trip1,
        Images.realEstate2,
      ],
      categories:category_array,
      locations: location_array,
      recent_posts:recent_post
    },
  };
};
