import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import { BaseColor, useTheme, BaseStyle } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  Tag,
  Image,
  ListItem,
} from "@components";
import { useTranslation } from "react-i18next";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Utils from "@utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from "rn-placeholder";
import { productActions, wishListActions } from "@actions";
import { userSelect, wishlistSelect, designSelect } from "@selectors";
import styles from "./styles";
import axios from "axios";
export default function ProductDetail({ navigation, route }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const design = useSelector(designSelect);
  const item = route.params?.item;
  const user = useSelector(userSelect);
  const deltaY = new Animated.Value(0);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(null);
  const [product, setProduct] = useState(null);
  const [collapseHour, setCollapseHour] = useState(false);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);

  const [productImage, setproductImage] = useState('')
  const [gallary, setgallary] = useState()
  const [relatedproduct, setrelatedproduct] = useState([])

  useEffect(() => {
    loadData();
  }, []);

  /**
   * on loaddata
   *
   */
  const loadData = () => {
    dispatch(
      productActions.onLoadProduct(item.id, design, (item) => {
        setLoading(false);
        setProduct(item);
        setLike(isFavorite(item));
        image(item)
        fetch(item)
        
        
      })
    );
  };

  const fetch = async (item) => {
    const array = await axios.get(item.related);
    const fetcarray = array.data
    console.log('asslen',fetcarray.length)
    const relatedarray = []
for (let i = 0; i < fetcarray.length; i++) {
       

relatedarray.push(fetcarray[i])

// console.log(`ass${i}`,fetcarray[i])
}
setrelatedproduct(relatedarray)

  }

  console.log('asd',relatedproduct)

  
const  image = async (item)  => {
  const image = await axios.get(item.image);
        const imgarray = image.data
        const array = []
      setproductImage(imgarray[0].media_details.sizes.medium_large.source_url)
      for (let i = 0; i < imgarray.length; i++) {
       console.log('EMDEB',imgarray[0].media_details.sizes.medium_large.source_url);
        array.push(imgarray[i].media_details.sizes.medium_large.source_url)
      }
      setgallary(array)
}
  /**
   * check wishlist state
   * only UI kit
   */
  const isFavorite = (item) => {
    return wishlist.list?.some((i) => i.id == item.id);
  };

  /**
   * like action
   * @param {*} like
   */
  const onLike = (like) => {
    if (user) {
      setLike(null);
      dispatch(wishListActions.onUpdate(item));
      setLike(like);
    } else {
      navigation.navigate({
        name: "SignIn",
        params: {
          success: () => {
            dispatch(wishListActions.onUpdate(item));
            setLike(like);
          },
        },
      });
    }
  };

  /**
   * on Review action
   */
  const onReview = () => {
    if (user) {
      navigation.navigate({
        name: "Review",
      });
    } else {
      navigation.navigate({
        name: "SignIn",
        params: {
          success: () => {
            navigation.navigate({
              name: "Review",
            });
          },
        },
      });
    }
  };

  /**
   * go product detail
   * @param {*} item
   */
  const onProductDetail = (item) => {
    navigation.replace("ProductDetail", { item: item });
  };

  /**
   * Open action
   * @param {*} item
   */
  const onOpen = (type, title, link) => {
    Alert.alert({
      title: title,
      message: `${t("do_you_want_open")} ${title} ?`,
      action: [
        {
          text: t("cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: t("done"),
          onPress: () => {
            switch (type) {
              case "web":
                Linking.openURL(link);
                break;
              case "phone":
                Linking.openURL("tel://" + link);
                break;
              case "email":
                Linking.openURL("mailto:" + link);
                break;
              case "address":
                Linking.openURL(link);
                break;
            }
          },
        },
      ],
    });
  };

  /**
   * collapse open time
   */


  /**
   * render wishlist status
   *
   */
  const renderLike = () => {
    return (
      <TouchableOpacity onPress={() => onLike(!like)}>
        {like ? (
          <Icon name="heart" color={colors.primaryLight} solid size={18} />
        ) : (
          <Icon name="heart" color={colors.primaryLight} size={18} />
        )}
      </TouchableOpacity>
    );
  };
  /**
   * render Banner
   * @returns
   */
  const renderBanner = () => {
    if (loading) {
      return (
        <Placeholder Animation={Progressive}>
          <Animated.View
            style={[
              styles.imgBanner,
              {
                height: deltaY.interpolate({
                  inputRange: [
                    0,
                    Utils.scaleWithPixel(140),
                    Utils.scaleWithPixel(140),
                  ],
                  outputRange: [heightImageBanner, heightHeader, heightHeader],
                }),
              },
            ]}
          >
            <PlaceholderMedia style={{ width: "100%", height: "100%" }} />
          </Animated.View>
        </Placeholder>
      );
    }

    return (
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      >
        <Image
          source={{uri:productImage}}
          style={{ width: "100%", height: "100%" }}
        />
        <Animated.View
          style={{
            position: "absolute",
            bottom: 15,
            left: 20,
            flexDirection: "row",
            opacity: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [1, 0, 0],
            }),
          }}
        >
          <Image source={product?.author?.image} style={styles.userIcon} />
          <View>
            <Text headline semibold whiteColor>
              {product?.author?.name}
            </Text>
            <Text footnote whiteColor>
              {product?.author?.email}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

  /**
   * render Content View
   * @returns
   */
  const renderContent = () => {
    if (loading) {
      return (
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: deltaY },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}
        >
          <View style={{ height: 255 - heightHeader }} />
          <Placeholder Animation={Progressive}>
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 20,
              }}
            >
              <PlaceholderLine style={{ width: "50%", marginTop: 10 }} />
              <PlaceholderLine style={{ width: "70%" }} />
              <PlaceholderLine style={{ width: "40%" }} />
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                  <PlaceholderLine style={{ width: "40%" }} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                  <PlaceholderLine style={{ width: "40%" }} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                  <PlaceholderLine style={{ width: "40%" }} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                  <PlaceholderLine style={{ width: "40%" }} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{ marginLeft: 10, flex: 1, paddingTop: 10 }}>
                  <PlaceholderLine style={{ width: "40%" }} />
                </View>
              </View>
              <PlaceholderLine
                style={{ width: "100%", height: 250, marginTop: 20 }}
              />
            </View>
          </Placeholder>
        </ScrollView>
      );
    }
    return (
      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: deltaY },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        onContentSizeChange={() => {
          setHeightHeader(Utils.heightHeader());
        }}
        scrollEventThrottle={8}
      >
        <View style={{ height: 255 - heightHeader }} />
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <View style={styles.lineSpace}>
            <Text title1 semibold style={{ paddingRight: 15 }}>
              {product?.title}
            </Text>
            {renderLike()}
          </View>
          <View style={styles.lineSpace}>
            <View>
              <Text caption1 grayColor>
                {product?.category?.title}
              </Text>
              <TouchableOpacity style={styles.rateLine} onPress={onReview}>
                <Tag rateSmall style={{ marginRight: 5 }} onPress={onReview}>
                  {product?.rate}
                </Tag>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={product?.rate}
                  fullStarColor={BaseColor.yellowColor}
                  on
                />
                <Text footnote grayColor style={{ marginLeft: 5 }}>
                  ({product?.numRate})
                </Text>
              </TouchableOpacity>
            </View>
            <Tag status>{product?.status}</Tag>
          </View>
         
          <TouchableOpacity

            style={styles.line}
            onPress={() => {
              const location = `${product?.location?.latitude},${product?.location?.longitude}`;
              const url = Platform.select({
                ios: `maps:${location}`,
                android: `geo:${location}?center=${location}&q=${location}&z=16`,
              });
              onOpen("address", t("address"), url);
            }}
          >
            <View
              style={[styles.contentIcon, { backgroundColor: colors.border }]}
            >
              <Icon
                name="map-marker-alt"
                size={16}
                color={BaseColor.whiteColor}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text caption2 grayColor>
                {t("address")}
              </Text>
              <Text footnote semibold style={{ marginTop: 5 }}>
                {product?.address}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              onOpen("phone", t("tel"), product?.phone);
            }}
          >
            <View
              style={[styles.contentIcon, { backgroundColor: colors.border }]}
            >
              <Icon name="mobile-alt" size={16} color={BaseColor.whiteColor} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text caption2 grayColor>
                {t("tel")}
              </Text>
              <Text footnote semibold style={{ marginTop: 5 }}>
                {product?.phone}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              onOpen("envelope", t("envelope"), product?.email);
            }}
          >
            <View
              style={[styles.contentIcon, { backgroundColor: colors.border }]}
            >
              <Icon name="envelope" size={16} color={BaseColor.whiteColor} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text caption2 grayColor>
                {t("email")}
              </Text>
              <Text footnote semibold style={{ marginTop: 5 }}>
                {product?.email}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              onOpen("web", t("website"), product?.website);
            }}
          >
            <View
              style={[styles.contentIcon, { backgroundColor: colors.border }]}
            >
              <Icon name="globe" size={16} color={BaseColor.whiteColor} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text caption2 grayColor>
                {t("website")}
              </Text>
              <Text footnote semibold style={{ marginTop: 5 }}>
                {product?.website}
              </Text>
            </View>
          </TouchableOpacity>
         
        
        </View>
        <View
          style={[styles.contentDescription, { borderColor: colors.border }]}
        >
          <Text body2 style={{ lineHeight: 20 }}>
            {product?.description}
          </Text>
          <View
            style={{
              paddingVertical: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text caption1 grayColor>
                {t("date_established")}
              </Text>
              <Text headline style={{ marginTop: 5 }}>
                {product?.dateEstablish.substring(0, 10)}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text caption1 grayColor>
                {t("price_range")}
              </Text>
              
              <Text headline style={{ marginTop: 5 }}>
                {` ${product?.priceMax ?? "-"}$`}
              </Text>
            </View>
          </View>
          {product?.location?.latitude != 0 ? 
          <View
            style={{
              height: 180,
              paddingVertical: 20,
            }}
          >
           
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: parseFloat(product?.location?.latitude ?? 0.0),
                longitude: parseFloat(product?.location?.longitude ?? 0.0),
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(product?.location?.latitude ?? 0.0),
                  longitude: parseFloat(product?.location?.longitude ?? 0.0),
                }}
              />
            </MapView>
           
          </View>
          :null}
        </View>
        {/* <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            paddingBottom: 5,
            paddingTop: 15,
          }}
        >
          {t("facilities")}
        </Text>
        
        <View style={[styles.wrapContent, { borderColor: colors.border }]}>
          {product?.features?.map?.((item) => {
            return (
              <Tag
                key={item.id.toString()}
                icon={
                  <Icon
                    name={Utils.iconConvert(item.icon)}
                    size={12}
                    color={colors.accent}
                    solid
                    style={{ marginRight: 5 }}
                  />
                }
                chip
                style={{
                  marginTop: 8,
                  marginRight: 8,
                }}
              >
                {item.title}
              </Tag>
            );
          })}
        </View> */}
      
        <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          {t("featured")}
        </Text>
        {relatedproduct.length != 0 ?
        <FlatList
          contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={relatedproduct}
          keyExtractor={(item, index) => `featured ${index}`}
          renderItem={({ item, index }) => (
            <ListItem
              grid
              image={typeof  item._embedded['wp:featuredmedia'] === "undefined" ?"" :item._embedded['wp:featuredmedia']["0"].media_details.sizes.thumbnail.source_url}
              title={item.title.rendered}
              // subtitle={item.title}
              location={item.address}
              phone={item.phone}
              rate={item._rtcl_average_rating}
              status={item.status}
              rateStatus={item._rtcl_average_rating}
              numReviews={item._rtcl_review_count}
              favorite={isFavorite(item)}
              onPress={() => onProductDetail(item)}
              onPressTag={onReview}
              style={{
                marginLeft: 15,
                width: Dimensions.get("window").width / 2,
              }}
            />
          )}
        />:null}
        <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          {t("related")}
        </Text>
        <View style={{ paddingHorizontal: 20 }}>
          {relatedproduct.map?.((item) => {
            return (
              <ListItem
                key={item.id.toString()}
                small
                image={typeof  item._embedded['wp:featuredmedia'] === "undefined" ?"" :item._embedded['wp:featuredmedia']["0"].media_details.sizes.thumbnail.source_url}
                title={item.title.rendered}
                // subtitle={item.category?.title}
                rate={item._rtcl_average_rating}
                style={{ marginBottom: 15 }}
                onPress={() => onProductDetail(item)}
                onPressTag={onReview}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderBanner()}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
          );
        }}
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate("PreviewImage", {
            gallery: gallary,
          });
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}
