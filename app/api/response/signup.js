import * as Utils from "@utils";
import axios from "axios";
import syncStorage from "sync-storage";
export const signUp = async ({ params }) => {
  await Utils.delay(1000);

  const log = await axios.post(
    `http://semmsar.com/api/get_nonce/?controller=user&method=register`
  );
  const array = log.data;
  console.log('nonce',array);
syncStorage.set('noncevalue',array.nonce)
const nonce = syncStorage.get('noncevalue')
   var bodyFormData = new FormData();
    bodyFormData.append("insecure", "cool");
  

  const dataresponse = []
    axios({
      url: `http://semmsar.com/api/user/register?username=${params.username}&email=${params.email}&nonce=${nonce}&display_name=${params.username}&notify=both&user_pass=${params.password}&insecure=cool`,
      method: 'POST',
      data: bodyFormData,

    })
      .then(function (response) {
        console.log("response :", response.data);
        
        
        // setMsg(JSON.stringify( response.data.user))
    // dataresponse = response.data.user
    dataresponse.push(response.data)
        console.log('data',dataresponse);
      })
      .catch(function (error) {
        console.log("error from image :",error);
   

      })

    console.log('dataaa',dataresponse);
    
  return {
    success: true,
    message: "register_success",
  };

};
