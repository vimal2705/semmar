import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import axios from "axios";
export const getWishList = async ({ params }) => {
  await Utils.delay(1000);
  const recent = await axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing?_embed');
  const recent_post = recent.data
  console.log('asd',recent_post.length);
  return {
    success: true,
    data: recent_post.filter((item) => item.wishlist),
  };
};
