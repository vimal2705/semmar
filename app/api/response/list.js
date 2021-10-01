import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios";
export const getList = async (params) => {
  console.log('aasssa',params.url);

  // alert(typeof params)
  await Utils.delay(1000);

var recent_post = ''
  if (typeof params.url === 'undefined') {
   var recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing?_embed');
     recent_post = recent.data
  }
else{
  var recent = await Axios.get(params.url);
  recent_post = recent.data
  console.log('asdss',recent_post.length);
}


  //  for (let i = 0; i < recent_post.length; i++) {
  //   console.log(`location${i}`, location_array[i].name);

  // }
  console.log("RECENT POST: ",recent_post);
  if (typeof params.url === 'undefined') {
    return {
    
      success: true,
      data: recent_post,
    };
  } 
  return {
    
    success: true,
    data: recent_post,
  };

};
