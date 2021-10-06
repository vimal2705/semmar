export default class UserModel {
  constructor(json) {
    this.id = json?.id;
    this.name = json?.username;
    this.nickname = json?.nicename;
    this.image = typeof json?.user_photo === 'undefined ' ? 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png':json?.user_photo;
    this.link = json?.user_url;
    this.level = json?.user_level;
    this.description = json?.description;
    this.tag = json?.tag;
    this.rate = json?.rate;
    this.token = json?.token;
    this.email = json?.email;
    this.value = json?.value;
  }
}
