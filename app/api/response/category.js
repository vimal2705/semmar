import { Images } from "@config";
import * as Utils from "@utils";
import Axios from "axios"
import { useState } from "react";
export const getCategory = async ({ params }) => {

  await Utils.delay(1000);
  const cat = await Axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_category?_embed');
  const array = cat.data
  const array_name = []
  for (let i = 0; i < array.length; i++) {
    console.log(`asd${i}`, array[i]._embedded.up[0].name);
   array_name.push(array[i].name)
  }
  console.log('123',array_name);
 
  return {
    
    success: true,
    
    data: array
      
    //  {
    //     color: "#a569bd",
    //     description: "",
    //     featured_image: "10",
    //     icon: "fas fa-calendar-alt",

    //     image: {
    //       full: { url: Images.service4 },
    //       thump: { url: Images.service4 },
    //     },
    //     name: array[0].name,
    //     taxonomy: array[0].rtcl_category,
    //     term_id: array[0].id,
    //     term_taxonomy_id: array[0].parent,
    //     url:  array[0].link,
    //     count: array[0].count,
    //   }, 
    //   {
    //     color: "#58d68d",
    //     description: "",
    //     featured_image: "9",
    //     icon: "fas fa-utensils",
    //     image: {
    //       full: { url: Images.service7 },
    //       thump: { url: Images.service7 },
    //     },
    //      name: array[1].name,
    //     taxonomy: array[1].rtcl_category,
    //     term_id: array[1].id,
    //     term_taxonomy_id: array[1].parent,
    //     url:  array[1].link,
    //     count: array[1].count,
    //   },
    //   {
    //     color: "#3c5a99",
    //     description: "",
    //     featured_image: "11",
    //     icon: "fas fa-award",
    //     image: {
    //       full: { url: Images.service5 },
    //       thump: { url: Images.service5 },
    //     },
    //     name: array[2].name,
    //     taxonomy: array[2].rtcl_category,
    //     term_id: array[2].id,
    //     term_taxonomy_id: array[2].parent,
    //     url:  array[2].link,
    //     count: array[2].count,
    //   },
    //   {
    //     color: "#fdc60a",
    //     description: "",
    //     featured_image: "8",
    //     icon: "fas fa-car",
    //     image: {
    //       full: { url: Images.service2 },
    //       thump: { url: Images.service2 },
    //     },
    //     name: array[3].name,
    //     taxonomy: array[3].rtcl_category,
    //     term_id: array[3].id,
    //     term_taxonomy_id: array[3].parent,
    //     url:  array[3].link,
    //     count: array[3].count,
    //   },
    //   {
    //     color: "#e5634d",
    //     description: "",
    //     featured_image: "6",
    //     icon: "fas fa-shopping-basket",
    //     image: {
    //       full: { url: Images.service1 },
    //       thump: { url: Images.service1 },
    //     },
    //     name: array[4].name,
    //     taxonomy: array[4].rtcl_category,
    //     term_id: array[4].id,
    //     term_taxonomy_id: array[4].parent,
    //     url:  array[4].link,
    //     count: array[4].count,
    //   },
    //   {
    //     color: "#f25ec0",
    //     description: "",
    //     featured_image: "7",
    //     icon: "far fa-handshake",
    //     image: {
    //       full: { url: Images.category3 },
    //       thump: { url: Images.category3 },
    //     },
    //     name: array[5].name,
    //     taxonomy: array[5].rtcl_category,
    //     term_id: array[5].id,
    //     term_taxonomy_id: array[5].parent,
    //     url:  array[5].link,
    //     count: array[5].count,
    //   },
    //   {
    //     color: "#5d6d7e",
    //     description: "",
    //     featured_image: "46",
    //     icon: "fas fa-edit",
    //     image: {
    //       full: { url: Images.location4 },
    //       thump: { url: Images.location4 },
    //     },
    //     name: array[6].name,
    //     taxonomy: array[6].rtcl_category,
    //     term_id: array[6].id,
    //     term_taxonomy_id: array[6].parent,
    //     url:  array[6].link,
    //     count: array[6].count,
    //   },
    //   {
    //     color: "#58d68d",
    //     description: "",
    //     featured_image: "28",
    //     icon: "fas fa-heartbeat",
    //     image: {
    //       full: { url: Images.food3 },
    //       thump: { url: Images.food3 },
    //     },
    //     name: array[7].name,
    //     taxonomy: array[7].rtcl_category,
    //     term_id: array[7].id,
    //     term_taxonomy_id: array[7].parent,
    //     url:  array[7].link,
    //     count: array[7].count,
    //   },
    
  };
};
