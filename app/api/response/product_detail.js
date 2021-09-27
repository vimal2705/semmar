import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios";
export const getProductDetail = async ({ params }) => {
  await Utils.delay(1000);
  const recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing');
  const recent_post = recent.data
  console.log('asdaa',recent_post.length);
  for (let i = 0; i < recent_post.length; i++) {
    console.log(`location${i}`, recent_post[i].id);

  }
  return {
    success: true,
    data: recent_post.find((item) => item.id == params.id),
  };
};
