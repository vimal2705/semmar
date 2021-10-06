import { Images } from "@config";
import * as Utils from "@utils";
import axios from "axios";

export const user = async ({ params }) => {

  const data = []
  await Utils.delay(1000);
   const result = SyncStorage.get("cookie");
    // setMsg(result);
    // console.log("RESULE COOKIE: ",typeof result);
    var bodyFormData = new FormData();
    bodyFormData.append("insecure", "cool");
    bodyFormData.append("cookie", result);
  
  
    axios({
      url: "http://semmsar.com/api/user/get_currentuserinfo/",
      method: 'POST',
      data: bodyFormData,

    })
      .then(function (response) {
        console.log("response :", response.data);
        console.log('name: ', response.data.user.displayname)
        data.push(response.data)
        // setMsg(JSON.stringify( response.data.user))
       const dataresponse = response.data.user
        console.log('data',dataresponse);
      })
      .catch(function (error) {
        console.log("error from image :");
      })

  return {
    success: true,
    data: {
      display_name: "Paul",
      user_nicename: "paul",
      user_photo: Images.profile2,
      user_url: "passionui.com",
      user_level: "Developer",
      description: data.display_name,
      tag: "passionui",
      rate: 5,
      token: "token",
      user_email: "passionui@gmail.com",
      value: [
        { value: "97.01%", title: "feedback" },
        { value: "999", title: "items" },
        { value: "120k", title: "followers" },
      ],
        },
  };
};
