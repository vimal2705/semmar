import ImageModel from "./image";
import CategoryModel from "./category";
import LocationModel from "./location";
import UserModel from "./user";
import OpenTimeModel from "./open_time";

export default class ProductModel {
  constructor(json) {
    
    this.id = json?.id?.toString();
    this.title = json?.title.rendered;
    // this.author = json?.author ? new UserModel(json?.author) : null;
    // this.image = json?.image ? new ImageModel(json?.image) : null;
    // this.category = json?.category ? new CategoryModel(json?.category) : null;
    this.createDate = json?.date;
    this.dateEstablish = json?.date;
    this.rate = json?._rtcl_average_rating;
    this.numRate = json?._rtcl_review_count;
    this.rateText = json?.post_status;
    this.status = json?.status;
    this.subtitle = typeof json._embedded["wp:term"]  === 'undefined'? 'helo' : json._embedded["wp:term"][0][0].name
    this.favorite = json?.wishlist;
    this.address = json?.address;
    this.phone = json?.phone;
    this.fax = json?._links.self[0].href;
    this.email = json?.email;
    this.website = json?.website;
    this.description = json?.content.rendered;
    this.image =  json?._links['wp:attachment']['0'].href;
    this.feature = json?.featured;
     this.priceMax = json?.price;   
    this.link = json?.link;
    this.view = json?._views
this.featured = json?.featured
 this.imagemedia = typeof json?._embedded["wp:featuredmedia"] === 'undefined'? 'undefined' : json?._embedded["wp:featuredmedia"]['0']["media_details"]["sizes"]["thumbnail"]["source_url"]
    // this.openTime = json?.opening_hour?.map?.((item) => {
    //   return new OpenTimeModel(item);
    // });
    // this.gallery = json?.galleries?.map?.((item) => {
    //   return new ImageModel(item);
    // });
    // this.features = json?.features?.map?.((item) => {
    //   return new CategoryModel(item);
    // });
    this.related = json?._embedded['wp:term']["0"]["0"]._links['wp:post_type']["0"].href+"&_embed"
    // this.lastest = json?.lastest?.map?.((item) => {
    //   return new ProductModel(item);
    // });
    this.location = new LocationModel({
      name: json?.post_title,
      latitude: json?.latitude,
      longitude: json?.longitude,
    });
  }
}
