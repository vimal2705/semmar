import { Images } from "@config";
import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios"
export const getHome = async ({ params }) => {
  await Utils.delay(1000);

  // for (let i = 0; i < category_array.length; i++) {
  //   console.log(`asd${i}`, category_array[i].name);

  // }
  const location = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_location');
  const location_array = location.data

  // for (let i = 0; i < location_array.length; i++) {
  //   console.log(`location${i}`, location_array[i].name);

  // }
  const recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing');
  const recent_post = recent.data

  // recent_post.forEach(element => {
    
  // });
  console.log('aas',recent_post[0].name);



  const cat = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_category?_embed');
  const category_array = cat.data
  console.log('aas',category_array[0].name);

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
      locations: [
        {
          description: "",
          featured_image: "54",
          image: {
            full: { url: Images.place1 },
            thump: { url: Images.place1 },
          },
          name: location_array[0].name,
          taxonomy: location_array[0].taxonomy,
          term_id:  location_array[0].id,
          url:  location_array[0].link,
          term_taxonomy_id: 21,

        },
        {
          description: "",
          featured_image: "55",
          image: {
            full: { url: Images.place2 },
            thump: { url: Images.place2 },
          },
          name: location_array[1].name,
          taxonomy: location_array[1].taxonomy,
          term_id:  location_array[1].id,
          url:  location_array[1].link,
          term_taxonomy_id: 22,

        },
        {
          description: "",
          featured_image: "56",
          image: {
            full: { url: Images.place3 },
            thump: { url: Images.place3 },
          },
          name: location_array[2].name,
          taxonomy: location_array[2].taxonomy,
          term_id:  location_array[2].id,
          url:  location_array[2].link,
          term_taxonomy_id: 23,
        
        },
        {
          description: "",
          featured_image: "57",
          image: {
            full: { url: Images.place4 },
            thump: { url: Images.place4 },
          },
          name: location_array[3].name,
          taxonomy: location_array[3].taxonomy,
          term_id:  location_array[3].id,
          url:  location_array[3].link,
          term_taxonomy_id: 27,
         
        },
        {
          description: "",
          featured_image: "58",
          image: {
            full: { url: Images.place5 },
            thump: { url: Images.place5 },
          },
          name: location_array[4].name,
          taxonomy: location_array[4].taxonomy,
          term_id:  location_array[4].id,
          url:  location_array[4].link,
          term_taxonomy_id: 28,
         
        },
      ],
      recent_posts:recent_post
    },
  };
};
