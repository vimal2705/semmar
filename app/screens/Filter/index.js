import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { BaseStyle, BaseColor, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Tag,
  RangeSlider,
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";
import { settingSelect } from "@selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as local from "../../api/response";
import { listActions } from "@actions";

export default function Filter({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const setting = useSelector(settingSelect);
  const filter = route.params?.filter;


  const [priceBegin, setPriceBegin] = useState(filter?.minPrice ?? 0);
  const [priceEnd, setPriceEnd] = useState(filter?.maxPrice ?? 100);
  const [selectedCategory, setCategory] = useState(filter?.category ?? []);
  const [selectedFacilities, setFacilities] = useState(filter?.feature ?? []);
  const [businessColor, setBusinessColor] = useState(filter?.color);
  const [location, setLocation] = useState(filter?.location);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loader, setloader] = useState(false)


  /**
   * on Apply filter
   *
   */
  const onApply = () => {

    filter.category = selectedCategory;
    // filter.feature = selectedFacilities;
    // filter.color = businessColor;
    filter.location = location;
    // if (setting?.priceMin != priceBegin || setting?.priceMax != priceEnd) {
    //   filter.minPrice = priceBegin;
    //   filter.maxPrice = priceEnd;
    // }
   
    // console.log('list',filter.category[0].link);
    // dispatch(
    //   listActions.onLoadList(filter, design, () => {
    //     setLoading(false);
    //     setRefreshing(false);
    //     fetch(filter)
    //   })
    // );
    route.params?.onApply?.(filter);
    if (typeof filter.category !== 'undefined' || typeof filter.location !== 'undefined')

{    navigation.navigate("List",{check: true})
}
else{
  navigation.navigate("List")
}

    // navigation.navigate({
    //   name: 'List',
    //   params: { data: filter, test: "post again test" },
    //   merge: true,
    // });
  };

  /**
   * @description Called when filtering option > location
   * @author Passion UI <passionui.com>
   * @date 2020-02-01
   * @param {*} select
   */
  const onNavigateLocation = () => {
    navigation.navigate("PickerScreen", {
      onApply: async (location) => {
        setLocation(location);
      },
      selected: location,
      data: setting?.locations,
    });
  };

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectCategory = (select) => {
    const exist = selectedCategory.some((item) => item.id === select.id);
    if (exist) {
      setCategory(selectedCategory.filter((item) => item.id != select.id));
    } else {
      setCategory(selectedCategory.concat(select));
    }
  };

  /**
   * on select Feature
   * @param {*} select
   */
  // const onSelectFeature = (select) => {
  //   const exist = selectedFacilities.some((item) => item.id === select.id);
  //   if (exist) {
  //     setFacilities(selectedFacilities.filter((item) => item.id != select.id));
  //   } else {
  //     setFacilities(selectedFacilities.concat(select));
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("filtering")}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t("apply")}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => onApply()}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
          }
        >
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text headline semibold>
              {t("category").toUpperCase()}
            </Text>
            <View style={styles.wrapContent}>
              {setting?.categories?.map?.((item) => {
                const selected = selectedCategory.some((i) => i.id === item.id);
                return (
                  <Tag
                    primary={selected}
                    outline={!selected}
                    key={item.id}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                    }}
                    onPress={() => onSelectCategory(item)}
                  >
                    {item.cattitle}
                  </Tag>
                );
              })}
            </View>
            {/* <Text headline semibold style={{ marginTop: 20 }}>
              {t("facilities").toUpperCase()}
            </Text>
            <View style={styles.wrapContent}>
              {setting?.features?.map?.((item) => {
                const selected = selectedFacilities.some(
                  (i) => i.id === item.id
                );
                return (
                  <Tag
                    onPress={() => onSelectFeature(item)}
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
                    key={item.id}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                      borderColor: selected ? colors.primary : colors.accent,
                    }}
                  >
                    {item.title}
                  </Tag>
                );
              })}
            </View> */}
            <TouchableOpacity
              style={styles.locationContent}
              onPress={() => onNavigateLocation()}
            >
              <View>
                <Text headline semibold>
                  {t("location").toUpperCase()}
                </Text>
                {location ? (
                  <Text footnote primaryColor style={{ marginTop: 5 }}>
                    {location.name}
                  </Text>
                ) : (
                  <Text footnote grayColor style={{ marginTop: 5 }}>
                    {t("please_select")}
                  </Text>
                )}
              </View>
              <Icon name="angle-right" size={18} color={BaseColor.grayColor} />
            </TouchableOpacity>
            {/* <Text headline semibold style={{ marginTop: 20 }}>
              {t("price").toUpperCase()}
            </Text>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                ${setting?.priceMin ?? 0}
              </Text>
              <Text caption1 grayColor>
                ${setting?.priceMax ?? 100}
              </Text>
            </View>
            <RangeSlider
              color={colors.border}
              selectionColor={colors.primary}
              onValueChanged={(low, high) => {
                setPriceBegin(low);
                setPriceEnd(high);
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>{t("avg_price")}</Text>
              <Text caption1>
                ${priceBegin} - ${priceEnd}
              </Text>
            </View> */}
          </View>
          <View><TouchableOpacity
          onPress={() =>{
            setCategory([])
            setLocation([])
            console.log('aas',selectedCategory);
          }}
          ><Text>clear</Text></TouchableOpacity></View>
          {/* <Text
            headline
            semibold
            style={{
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            {t("business_color").toUpperCase()}
          </Text> */}
          {/* <FlatList
            contentContainerStyle={{ paddingVertical: 10 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={setting?.color ?? []}
            keyExtractor={(item, index) => item}
            renderItem={({ item, index }) => {
              const checked = item == businessColor;
              return (
                <TouchableOpacity
                  style={[
                    styles.circleIcon,
                    { backgroundColor: item, shadowColor: colors.border },
                  ]}
                  onPress={() => setBusinessColor(item)}
                >
                  {checked && (
                    <Icon name="check" size={16} color={BaseColor.whiteColor} />
                  )}
                </TouchableOpacity>
              );
            }}
          /> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
