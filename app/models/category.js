import ImageModel from "./image";

export default class CategoryModel {
  constructor(json) {
    this.id = json?.id;
    this.title = json?.name;
    this.count = json?.count;
    // this.image = json?.image ? new ImageModel(json?.image) : null;
    // this.icon = json?.icon;
    // this.color = json?.color;
    this.slug = json?.slug;
    this.type = this.exportType(json?.taxonomy);
    this.parent_id = json?.parent ;
    
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
