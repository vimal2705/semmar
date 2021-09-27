import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios";
export const getList = async ({ params }) => {
  await Utils.delay(1000);
  const recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing');
  const recent_post = recent.data
  console.log('asdss',recent_post.length);
  //  for (let i = 0; i < recent_post.length; i++) {
  //   console.log(`location${i}`, location_array[i].name);

  // }
  
  return {
    success: true,
    data: recent_post,
  };
};
