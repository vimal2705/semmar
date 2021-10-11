import { Images } from "@config";
import * as Utils from "@utils";
import axios from "axios";
import { Alert } from "react-native";
import SyncStorage from "sync-storage";





export const login = async ({ params }) => {
  await Utils.delay(1000);

  const log = await axios.post(
    `http://semmsar.com/api/user/generate_auth_cookie/?insecure=cool&username=${params.username}&password=${params.password}`
  );
  const array = log.data;
   
 var dataresponse = null

  console.log("asssas", array.cookie);

  if (typeof array.cookie !== "undefined") {
    SyncStorage.set("cookie", array.cookie);
    const result = SyncStorage.get("cookie");
    // setMsg(result);
    // console.log("RESULE COOKIE: ",typeof result);
    var bodyFormData = new FormData();
    bodyFormData.append("insecure", "cool");
    bodyFormData.append("cookie", result);
  
  
  await  axios({
      url: "http://semmsar.com/api/user/get_currentuserinfo/",
      method: 'POST',
      data: bodyFormData,

    })
      .then(function (response) {
        console.log("response :", response.data);
        console.log('name: ', response.data.user.displayname)
        SyncStorage.set("response",  response.data);
        // setMsg(JSON.stringify( response.data.user))
     dataresponse = response.data.user
        console.log('data',dataresponse);
     
      })
      .catch(function (error) {
        console.log("error from image :");
      })


      return {
        success: true,
        data: {
          username: dataresponse.displayname ,
          nicename: dataresponse.nicename,
          user_photo: array.avatar,
          user_url: "",
          user_level: "Developer",
          description: dataresponse.description,
          tag: "passionui",
          rate: 5,
          token: "token",
          email: dataresponse.email,
          value: [
            { value: "97.01%", title: "feedback" },
            { value: "999", title: "items" },
            { value: "120k", title: "followers" },
          ],
        },
      };
  }

  return {
    success: false,
    message: "confirm_password_not_corrent",
  };
};
