import { Images } from "@config";
import * as Utils from "@utils";
import { BaseCollection } from "./collection";
import Axios from "axios"
export const getHome = async ({ params }) => {
  await Utils.delay(1000);
  const cat = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_category');
  const category_array = cat.data
  console.log(category_array.length);
  // for (let i = 0; i < category_array.length; i++) {
  //   console.log(`asd${i}`, category_array[i].name);

  // }
  const location = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_location');
  const location_array = location.data
  console.log('asd',location_array.length);
  // for (let i = 0; i < location_array.length; i++) {
  //   console.log(`location${i}`, location_array[i].name);

  // }
  const recent = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing');
  const recent_post = recent.data
  console.log('asd',recent_post.length);
  const arr =[]
  for (let i = 0; i < recent_post.length; i++) {
   arr.push(recent_post[i])

  }
  console.log('listing',arr);

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
      recent_posts:
      [
        {
          ID: arr[1].id ,
          post_title: arr[1].slug,
          author: {
            display_name: "Paul",
            user_nicename: "paul",
            user_photo: Images.avata3,
            user_url: "passionui.com",
            user_level: "Developer",
            description: "Better and better",
            tag: "passionui",
            rate: 5,
            user_email: "passionui@gmail.com",
            value: [
              { value: "97.01%", title: "feedback" },
              { value: "999", title: "items" },
              { value: "120k", title: "followers" },
            ],
          },
          image: {
            full: { url: Images.gallery2 },
            thump: { url: Images.gallery2 },
          },
          category: {
            color: "#a569bd",
            description: "",
            featured_image: "10",
            icon: "fas fa-calendar-alt",
            image: {
              full: { url: Images.service4 },
              thump: { url: Images.service4 },
            },
            name: recent_post[0].slug,
            taxonomy: "listar_category",
            term_id: 5,
            term_taxonomy_id: 5,
            url: "http://listar.passionui.com/listar-category/events/",
          },
          post_excerpt:"recent_post[0].content.render",
           
          post_date: "01-11-2020",
          date_establish: "01-01-2020",
          rating_avg: 3.1,
          rating_count: 100,
          status: "Open",
          wishlist: true,
          post_status: "publish",
          address: "02 West Street",
          phone: "171-615-0225",
          guid: "http://listar.passionui.com/listar/flatley-torp-and-gleichner/",
          latitude: recent_post[0].latitude,
          longitude:recent_post[0].longitude,
          fax: "830-839-7510",
          email: "nmulhollandq0@berkeley.edu",
          website: "https://yellowpages.com",
       
          features: [
            {
              term_id: 12,
              name: "Credit Cards",
              slug: "credit-cards",
              term_group: 0,
              term_taxonomy_id: 12,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 65,
              filter: "raw",
              featured_image: "",
              icon: "far fa-credit-card",
              color: "#a569bd",
            },
            {
              term_id: 13,
              name: "Delivery",
              slug: "delivery",
              term_group: 0,
              term_taxonomy_id: 13,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 148,
              filter: "raw",
              featured_image: "",
              icon: "fas fa-bicycle",
              color: "#e5634d",
            },
            {
              term_id: 15,
              name: "Dogs Allowed",
              slug: "dogs-allowed",
              term_group: 0,
              term_taxonomy_id: 15,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 218,
              filter: "raw",
              featured_image: "",
              icon: "fas fa-paw",
              color: "#e5634d",
            },
            {
              term_id: 16,
              name: "Free Parking",
              slug: "free-parking",
              term_group: 0,
              term_taxonomy_id: 16,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 301,
              filter: "raw",
              featured_image: "",
              icon: "fas fa-parking",
              color: "#e5634d",
            },
            {
              term_id: 17,
              name: "Free Wifi",
              slug: "free-wifi",
              term_group: 0,
              term_taxonomy_id: 17,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 375,
              filter: "raw",
              featured_image: "",
              icon: "fas fa-wifi",
              color: "#e5634d",
            },
            {
              term_id: 14,
              name: "Good for Kids",
              slug: "good-for-kids",
              term_group: 0,
              term_taxonomy_id: 14,
              taxonomy: "listar_feature",
              description: "",
              parent: 0,
              count: 441,
              filter: "raw",
              featured_image: "",
              icon: "fas fa-users",
              color: "#e5634d",
            },
          ],
          galleries: [
            {
              full: { url: Images.gallery2 },
              thump: { url: Images.gallery2 },
            },
            {
              full: { url: Images.food1 },
              thump: { url: Images.food1 },
            },
            {
              full: { url: Images.location1 },
              thump: { url: Images.location1 },
            },
            {
              full: { url: Images.automotive2 },
              thump: { url: Images.automotive2 },
            },
            {
              full: { url: Images.post1 },
              thump: { url: Images.post1 },
            },
            {
              full: { url: Images.category3 },
              thump: { url: Images.category3 },
            },
            {
              full: { url: Images.location4 },
              thump: { url: Images.location4 },
            },
            {
              full: { url: Images.location5 },
              thump: { url: Images.location5 },
            },
          ],
         
          price_max: 79,
          price_min: 39,
        }],
    },
  };
};
