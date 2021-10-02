import ImageModel from "./image";

export default class CategoryModel {
  constructor(json) {
    this.id = json?.id;
    this.cattitle = typeof  json?._embedded === 'undefined' ? '' :json?._embedded.up[0].name;
    this.title = json?.name;
    this.img= json?.img_url;
    this.count = json?.count;
    // this.image = json?.image ? new ImageModel(json?.image) : null;
    this.icon = typeof json?._embedded === 'undefined' ? '' :json?._embedded.up[0]._rtcl_icon ;
    this.color = json?.color;
    this.slug = json?.slug;
    this.type = this.exportType(json?.taxonomy);
    this.parent_id = json?.parent ;
    this.link =typeof json?._embedded === 'undefined' ? '' :json?._embedded.up[0]._links['wp:post_type']["0"].href;
    
  }

  exportType(type) {
    switch (type) {
      case "listar_feature":
        return "feature";
      case "listar_location":
        return "location";
      default:
        return "category";
    }
  }
}
