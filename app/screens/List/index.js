import React, { useState, useRef, useEffect } from "react";
import { FlatList, RefreshControl, View, Animated,Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { BaseStyle, BaseColor, useTheme } from "@config";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import {
  Header,
  SafeAreaView,
  Icon,
  ListItem,
  FilterSort,
  Text,
} from "@components";
import styles from "./styles";
import * as Utils from "@utils";
import { useTranslation } from "react-i18next";


import { useDispatch, useSelector } from "react-redux";
import {
  listSelect,
  settingSelect,
  userSelect,
  wishlistSelect,
  designSelect,
} from "@selectors";
import { listActions } from "@actions";
import { NavigationContainer, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function List({ navigation, route ,props}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const list = useSelector(listSelect);
  const design = useSelector(designSelect);
  const setting = useSelector(settingSelect);
  const user = useSelector(userSelect);
  const isFocused = useIsFocused();

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    40
  );

  const sliderRef = useRef(null);
  const [filter, setFilter] = useState(route.params?.data);
  const [active, setActive] = useState(0);
  const [viewportWidth] = useState(Utils.getWidthDevice());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modeView, setModeView] = useState(setting.mode);
  const [mapView, setMapView] = useState(false);
  const [product, setProduct] = useState([]);
  const [filterloader, setfilterloader] = useState(route.params?.loader)
  const [region, setRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });
// console.log('isitright',route.params?.loader);
// if (route.params?.loader) {
//   setLoading(true)

// }
console.log('check',route.params?.check);
// useFocusEffect(
//   React.useCallback(() => {
//     // console.log("LOG SIM test: " + JSON.stringify(route.params?.test));
//     // Do something when the screen is focused
//    if (typeof route.params?.check !== 'undefined') {
//    console.log('check true',route.params?.check);

//     }
//     return () => {
//       console.log('Screen was unfocused');
//       // Do something when the screen is unfocused
//       // Useful for cleanup functions
//     };
//   }, [route.params?.check])
// );
console.log(['maut',filter])
  useEffect(() => {
    console.log('isitright12 : '+filterloader);
    loadData(filter);
      // if (route.params?.loader) {
      //     setLoading(true)
      //     alert('isitright56: '+filterloader);
      // }
    if ( route.param?.check === 'undefined' )
    {
      console.log('true',route.param?.check);
    }
    else{
      console.log('fale');
    }
      // // const unsubscribe = navigation.addListener('focus', () => {
        
      // //   // console.log("FILTER LOADER: "+route.params?.loader);
      // //   console.log("FILTER LOADER: "+filterloader);
      // //   // The screen is focused
      // //   // Call any action
      // // });
  
      // // Return the function to unsubscribe from the event so it gets removed on unmount
      // return unsubscribe;
  }, [navigation]);
  // filter,route.params?.loader
  const fetch = async (item) => {

    console.log('all',item)
    if (typeof item.category === 'undefined' && typeof item.location === 'undefined'  ) {
      if(typeof item.location_id === 'undefined')
      {

        const array = await axios.get(item.link + "&_embed");
        const fetcarray = array.data;
        //  console.log('asslen',item.category)
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
    
    
        }
    
        setProduct(relatedarray);
        setLoading(false)
      }
      else{
         const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location_id}&_embed`);
        const fetcarray = array.data;
        //  console.log('asslen',item.category)
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
    
    
        }
    
        setProduct(relatedarray);
        setLoading(false)
      }
         
  }else if(item.category.length === 0 &&  item.location.length === 0 ){

    if(typeof item.location_id === 'undefined')
    {

      const array = await axios.get(item.link + "&_embed");
      const fetcarray = array.data;
      //  console.log('asslen',item.category)
      const relatedarray = [];
      for (let i = 0; i < fetcarray.length; i++) {
        // console.log(`fetcarray${i}`,fetcarray )
        relatedarray.push(fetcarray[i]);
  
  
      }
  
      setProduct(relatedarray);
      setLoading(false)
    }
    else{
       const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location_id}&_embed`);
      const fetcarray = array.data;
      //  console.log('asslen',item.category)
      const relatedarray = [];
      for (let i = 0; i < fetcarray.length; i++) {
        // console.log(`fetcarray${i}`,fetcarray )
        relatedarray.push(fetcarray[i]);
  
  
      }
  
      setProduct(relatedarray);
      setLoading(false)
    }
  }
  else if(typeof item.location === 'undefined' || item.location.length === 0){
    const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_category=${item.category[0].parent_id}&_embed`);
        // const array = await axios.get(item.link + "&_embed");
        // console.log('cat',item);
        const fetcarray = array.data;
        // console.log('cat',item.category[0].parent_id);
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
      
          // console.log(`ass${i}`,fetcarray[i])
        }
      
        setProduct(relatedarray);
        setLoading(false)
      
  }else if(typeof item.category === 'undefined' || item.category.length === 0 ){
  const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location.term_id}&_embed`);
        // const array = await axios.get(item.link + "&_embed");
        // console.log('cat',item.location.term_id);
        const link = `http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location.term_id}&_embed`
        // console.log('cat',link);
        const fetcarray = array.data;
        
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
      
          // console.log(`ass${i}`,fetcarray[i])
        }
      
        setProduct(relatedarray)
        setLoading(false)
      }
        else if(typeof item.category !== 'undefined' && typeof item.location !== 'undefined' )
    {
      const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location.term_id}&rtcl_category=${item.category[0].parent_id}&_embed`);
      // const array = await axios.get(item.link + "&_embed");
      const fetcarray = array.data;
    
      const relatedarray = [];
      for (let i = 0; i < fetcarray.length; i++) {
        // console.log(`fetcarray${i}`,fetcarray )
        relatedarray.push(fetcarray[i]);
    
        // console.log(`ass${i}`,fetcarray[i])
      }
    
      setProduct(relatedarray);
      setLoading(false)
    
      // alert(route.param?.data);
    }
   else 
    {
      
      if(typeof item.location_id === 'undefined')
      {
  
        const array = await axios.get(item.link + "&_embed");
        const fetcarray = array.data;
        //  console.log('asslen',item.category)
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
    
    
        }
    
        setProduct(relatedarray);
        setLoading(false)
      }
      else{
         const array = await axios.get(`http://semmsar.com/wp-json/wp/v2/rtcl_listing/?rtcl_location=${item.location_id}&_embed`);
        const fetcarray = array.data;
        //  console.log('asslen',item.category)
        const relatedarray = [];
        for (let i = 0; i < fetcarray.length; i++) {
          // console.log(`fetcarray${i}`,fetcarray )
          relatedarray.push(fetcarray[i]);
    
    
        }
    
        setProduct(relatedarray);
        setLoading(false)
      }
      
      }
       
  } 

  /**
   * on Load data
   *
   */
  const loadData = (filter) => {
    setLoading(true)
    dispatch(
      listActions.onLoadList(filter, design, () => {
        setLoading(false);
        setRefreshing(false);

        fetch(filter);
      })
    );
  };

  /**
   * on refresh list
   *
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  /**
   * export viewport
   * @param {*} percentage
   * @returns
   */
  const getViewPort = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  };

  /**
   * call when on change sort
   */
  const onChangeSort = (sort) => {
    if (sort) {
      filter.sort = sort;
      setFilter(filter);
      console.log('asasa',filter.sort.lang_key);
    if(filter.sort.langKey == 'comment_count_desc')
    {
      onRefresh()
           product.sort((a, b) => (a.status<b.status) ? 1 : -1)
       setProduct(product)
    }
    else if(filter.sort.langKey === 'post_date_asc'){
      onRefresh()
      product.sort((a, b) => ((new Date(a.date).getTime() / 1000))> ((new Date(b.date).getTime() / 1000)) ? 1 : -1)
     setProduct(product)
    }
    else if(filter.sort.langKey === 'post_date_desc'){
      onRefresh()
      product.sort((a, b) => ((new Date(a.date).getTime() / 1000))< ((new Date(b.date).getTime() / 1000)) ? 1 : -1)
     setProduct(product)
    }
    else{
     
      loadData(filter)
    }
}
  };

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate("Filter", {
      filter,
      onApply: (filter) => {
        setFilter(filter);
        loadData(filter);
    
      },
    });
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case "block":
        setModeView("grid");
        break;
      case "grid":
        setModeView("list");
        break;
      case "list":
        setModeView("block");
        break;
      default:
        setModeView("block");
        break;
    }
  };

  /**
   * onChange view style
   *
   */
  const onChangeMapView = () => {
   
    Utils.enableExperimental();
    if (!mapView) {
      setRegion({
        latitude:  parseFloat(product[0].latitude),
        longitude: parseFloat(product[0].longitude),
        latitudeDelta: 0.009,
        longitudeDelta: 0.004,
      });
    }
    setMapView(!mapView);
  };

  /**
   * on Select location map view
   * @param {*} location
   * @returns
   */
  const onSelectLocation = (location) => {
    for (let index = 0; index < product.length; index++) {
      const element = product[index];
      if (
        element.latitude == location.latitude &&
        element.longitude == location.longitude
      ) {
        sliderRef.current.snapToItem(index);
        return;
      }
    }
  };

  /**
   * on Review action
   */
  const onProductDetail = (item) => {
    navigation.navigate("ProductDetail", {
      item: item,
    });
  };

  /**
   * on Review action
   */
  const onReview = (item) => {
    if (user) {
      navigation.navigate("Review");
    } else {
      navigation.navigate({
        name: "SignIn",
        params: {
          success: () => {
            navigation.navigate("Review");
          },
        },
      });
    }
  };

  /**
   * check wishlist state
   * UI kit
   */
  const isFavorite = (item) => {
    return wishlist.list?.some((i) => i.id == item.id);
  };

  /**
   * @description Render loading view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderLoading = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });
    switch (modeView) {
      case "block":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={"block"}
              keyExtractor={(item, index) => `block${index}`}
              renderItem={({ item, index }) => (
                <ListItem block loading={true} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
              
            </Animated.View>
            <View>
           
              </View>
          </View>
        );
      case "grid":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={"gird"}
              keyExtractor={(item, index) => `gird ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  grid
                  loading={true}
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case "list":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={"list"}
              keyExtractor={(item, index) => `list ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  list
                  loading={true}
                  style={{
                    marginBottom: 15,
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              key={"block"}
              keyExtractor={(item, index) => `block${index}`}
              renderItem={({ item, index }) => (
                <ListItem block loading={true} />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: "clamp",
    });
    switch (modeView) {
      case "block":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={product}
              key={"block"}
              keyExtractor={(item, index) => `block ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  block
                  image={
                    typeof item._embedded["wp:featuredmedia"] === "undefined"
                      ? "https://i.ibb.co/8jYYhnW/image-2021-10-11-T06-08-58-109-Z.png"
                      : item._embedded["wp:featuredmedia"]["0"].media_details
                          .sizes["rtcl-gallery"].source_url
                  }
                  title={item.title.rendered}
                  subtitle={item.category?.title}
                  location={item.address}
                  phone={item.phone}
                  rate={item._rtcl_average_rating}
                  status={item.status}
                  numReviews={item._rtcl_review_count}
                  favorite={isFavorite(item)}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      case "grid":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={product}
              key={"gird"}
              keyExtractor={(item, index) => `gird ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  grid
                  image={
                    typeof item._embedded["wp:featuredmedia"] === "undefined"
                      ? "https://i.ibb.co/8jYYhnW/image-2021-10-11-T06-08-58-109-Z.png"
                      : item._embedded["wp:featuredmedia"]["0"].media_details
                          .sizes.thumbnail.source_url
                  }
                  title={item.title.rendered}
                  subtitle={item.category?.title}
                  location={item.address}
                  phone={item.phone}
                  rate={item._rtcl_average_rating}
                  status={item.views}
                  numReviews={item.numRate}
                  favorite={isFavorite(item)}
                  style={{
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case "list":
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={product}
              key={"list"}
              keyExtractor={(item, index) => `list ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  list
                  image={
                    typeof item._embedded["wp:featuredmedia"] === "undefined"
                      ? "https://i.ibb.co/8jYYhnW/image-2021-10-11-T06-08-58-109-Z.png"
                      : item._embedded["wp:featuredmedia"]["0"].media_details
                          .sizes.thumbnail.source_url
                  }
                  title={item.title.rendered}
                  subtitle={item.category?.title}
                  location={item.address}
                  phone={item.phone}
                  rate={item._rtcl_average_rating}
                  status={item.status}
                  numReviews={item._rtcl_review_count}
                  favorite={isFavorite(item)}
                  style={{
                    marginBottom: 15,
                  }}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={product}
              key={"block"}
              keyExtractor={(item, index) => `block ${index}`}
              renderItem={({ item, index }) => (
                <ListItem
                  block
                  image={
                    typeof item._embedded["wp:featuredmedia"] === "undefined"
                      ? "https://i.ibb.co/8jYYhnW/image-2021-10-11-T06-08-58-109-Z.png"
                      : item._embedded["wp:featuredmedia"]["0"].media_details
                          .sizes["rtcl-gallery"].source_url
                  }
                  title={item.title.rendered}
                  subtitle={item.subtitle}
                  location={item.address}
                  phone={item.phone}
                  rate={item._rtcl_average_rating}
                  status={item.status}
                  numReviews={item._rtcl_review_count}
                  favorite={isFavorite(item)}
                  onPress={() => onProductDetail(item)}
                  onPressTag={() => onReview(item)}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}
            >
              <FilterSort
                sortSelected={filter?.sort}
                modeView={modeView}
                sortOption={setting?.sortOption}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }
  };

  /**
   * render MapView
   * @returns
   */
  const renderMapView = () => {
    return (
      <View style={{ flex: 1 }}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
          {product.map?.((item, index) => {
            return (
              <Marker
                onPress={(e) => onSelectLocation(e.nativeEvent.coordinate)}
                key={item.id}
                coordinate={{
                  latitude:  parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
              >
                <View
                  style={[
                    styles.iconLocation,
                    {
                      backgroundColor:
                        index == active ? colors.primary : BaseColor.whiteColor,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Icon
                    name="star"
                    size={16}
                    color={
                      index == active ? BaseColor.whiteColor : colors.primary
                    }
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View style={{ position: "absolute", bottom: 0, overflow: "visible" }}>
          <Carousel
            ref={sliderRef}
            data={product ?? []}
            renderItem={({ item, index }) => (
              <ListItem
                small
                image={
                  typeof item._embedded["wp:featuredmedia"] === "undefined"
                    ? "https://i.ibb.co/8jYYhnW/image-2021-10-11-T06-08-58-109-Z.png"
                    : item._embedded["wp:featuredmedia"]["0"].media_details
                        .sizes.thumbnail.source_url
                }
                title={item.title.rendered}
                subtitle={item.category?.title}
                rate={item._rtcl_average_rating}
                favorite={isFavorite(item)}
                style={{
                  margin: 3,
                  padding: 10,
                  backgroundColor: colors.card,
                  borderRadius: 8,
                  shadowColor: colors.border,
                  shadowOffset: {
                    width: 3,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={() => onProductDetail(item)}
                onPressTag={() => onReview(item)}
              />
            )}
            sliderWidth={viewportWidth}
            itemWidth={getViewPort(75) + getViewPort(2) * 2}
            firstItem={1}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.85}
            contentContainerCustomStyle={{ paddingVertical: 10 }}
            loop={true}
            loopClonesPerSide={2}
            autoplay={false}
            onSnapToItem={(index) => {
              setActive(index);
              setRegion({
                latitudeDelta: 0.009,
                longitudeDelta: 0.004,
                latitude: parseFloat(product[index]?.latitude),
                longitude:parseFloat( product[index]?.longitude),
              });
            }}
          />
        </View>
      </View>
    );
  };

  /**
   * render Content view
   */
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }
    if (product.length == 0) {
      return (
        <View style={styles.centerView}>
          <View style={{ alignItems: "center" }}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{ marginBottom: 4 }}
            />
            <Text>{t("data_not_found")}</Text>
          </View>
        </View>
      );
    }
    if (mapView) return renderMapView();
    return renderList();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("place")}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        
        }}
        renderRight={() => {
          return (
            <Icon
              name={mapView ? "align-right" : "map"}
              size={20}
              color={colors.primary}
            />
          );
        }}
        renderRightSecond={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressRightSecond={() => {
          navigation.navigate("SearchHistory");
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          onChangeMapView();
        }}
      />
 
      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
    
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}
