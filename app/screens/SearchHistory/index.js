import React, { useState,useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { BaseStyle, BaseColor, useTheme } from "@config";
import {
  Header,
  SafeAreaView,
  TextInput,
  Icon,
  Text,
  ListItem,
} from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { ProductModel } from "@models";
import { BaseCollection } from "../../api/response/collection";
import { useSelector } from "react-redux";
import { wishlistSelect } from "@selectors";
import axios from "axios"
let timeout;

export default function SearchHistory({ navigation }) {
  

  const { colors } = useTheme();
  const { t } = useTranslation();
  const wishlist = useSelector(wishlistSelect);
  const search = collection
  const [history, setHistory] = useState(search);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [collection, setcollection] = useState([])

  useEffect(() => {
  searchproduct()
  }, [])

  /**
   * check wishlist state
   * only UI kit
   */

  const searchproduct = async() => {
    const recent = await axios.get('http://semmsar.com/wp-json/wp/v2/rtcl_listing?_embed');
    const recent_post = recent.data
    setcollection(recent_post)
    
   
  }
  const isFavorite = (item) => {
    return wishlist.list?.some((i) => i.id == item.id);
  };

  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = (keyword) => {
    setKeyword(keyword);
    if (keyword != "") {
      setLoading(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setResult(
          search.filter((item) => {
            return item.title.rendered.toUpperCase().includes(keyword.toUpperCase());
          })
        );
        setLoading(false);
        setShowResult(true);
      }, 1000);
    } else {
      setShowResult(false);
    }
  };

  /**
   * on load detail and save history
   * @param {*} item
   */
  const onDetail = (item) => {
    navigation.navigate("ProductDetail", {
      item: item,
    });
  };

  /**
   * on clear
   */
  const onClear = () => {
    setHistory([]);
  };

  /**
   * render content
   *
   */
  const renderContent = () => {
    if (showResult) {
      return (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={result}
          keyExtractor={(item, index) => `history ${index}`}
          renderItem={({ item, index }) => (
            <ListItem
              small
              image={item.image?.full}
              title={item.title.rendered}
              subtitle={item.category?.title}
              location={item.address}
              phone={item.phone}
              rate={item.rate}
              status={item.status}
              numReviews={item.numRate}
              favorite={isFavorite(item)}
              style={{
                marginBottom: 15,
              }}
              onPress={() => onDetail(item)}
            />
          )}
        />
      );
    }

    return (
      <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
        <View style={styles.rowTitle}>
          <Text headline>{t("search_history").toUpperCase()}</Text>
          <TouchableOpacity onPress={onClear}>
            <Text caption1 accentColor>
              {t("clear")}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {history?.map?.((item, index) => (
            <TouchableOpacity
              style={[styles.itemHistory, { backgroundColor: colors.card }]}
              onPress={() => onDetail(item)}
              key={`search ${index}`}
            >
              <Text caption2>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("search")}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <TextInput
              placeholder={t("search")}
              value={keyword}
              onSubmitEditing={() => {
                onSearch(keyword);
              }}
              onChangeText={onSearch}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    onSearch("");
                  }}
                  style={styles.btnClearSearch}
                >
                  <Icon name="times" size={18} color={BaseColor.grayColor} />
                </TouchableOpacity>
              }
            />
          </View>
          {renderContent()}
        </View>
      </SafeAreaView>
    </View>
  );
}
