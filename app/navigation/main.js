import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BaseColor, useTheme, useFont } from "@config";
import { useTranslation } from "react-i18next";
import { Icon } from "@components";
import { userSelect, designSelect } from "@selectors";
import { useSelector } from "react-redux";

/* Bottom Screen */
import Home from "@screens/Home";
import Wishlist from "@screens/Wishlist";
import Profile from "@screens/Profile";
import Messenger from "@screens/Messenger";

/* Stack Screen */
import ThemeSetting from "@screens/ThemeSetting";
import Setting from "@screens/Setting";
import Category from "@screens/Category";
import List from "@screens/List";
import Review from "@screens/Review";
import Feedback from "@screens/Feedback";
import Walkthrough from "@screens/Walkthrough";
import ChangePassword from "@screens/ChangePassword";
import ProfileEdit from "@screens/ProfileEdit";
import ChangeLanguage from "@screens/ChangeLanguage";
import ProductDetail from "@screens/ProductDetail";
import ContactUs from "@screens/ContactUs";
import Messages from "@screens/Messages";
import AboutUs from "@screens/AboutUs";

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {
  const design = useSelector(designSelect);
  /**
   * Main follow return  Product detail design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportProductDetail = () => {
    return ProductDetail;

  };

  /**
   * Main follow return  Product detail design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportList = () => {
    return List;
  };

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="BottomTabNavigator"    >
      <MainStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="Category" component={Category} />
      <MainStack.Screen name="List" component={exportList(design)} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="Review" component={Review} />
      <MainStack.Screen name="Feedback" component={Feedback} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ProductDetail" component={ProductDetail}
      />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen name="Messages" component={Messages} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const font = useFont();
  const user = useSelector(userSelect);
  const design = useSelector(designSelect);

  /**
   * Main follow return  Home Screen design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportHome = () => {
    return Home;
  };

  /**
   * Main follow return  WishList Screen design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportWishlist = () => {
    if (!user) {
      return Walkthrough;
    }
    return Wishlist;
  };

  return (
    <BottomTab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, }}
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.primary,
        inactiveTintColor: BaseColor.grayColor,
        style: { borderTopWidth: 1 },
        labelStyle: { fontSize: 12, fontFamily: font, paddingBottom: 4, },
      }}
    >
      <BottomTab.Screen name="Home" component={exportHome(design)}
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => { return <Icon color={color} name="home" size={20} solid />; },
        }}
      />

      <BottomTab.Screen name="Wishlist" component={exportWishlist(design)}
        options={{
          title: t("wishlist"),
          tabBarIcon: ({ color }) => { return <Icon color={color} name="bookmark" size={20} solid />; },
        }}
      />

      <BottomTab.Screen name="Category" component={Category}
        options={{
          title: t("category"),
          tabBarIcon: ({ color }) => { return <Icon color={color} name="clipboard-list" size={20} solid />; },
        }}
      />

      <BottomTab.Screen name="Messenger" component={user ? Messenger : Walkthrough}
        options={{
          title: t("messenger"),
          tabBarIcon: ({ color }) => { return <Icon color={color} name="envelope" size={20} solid />; },
        }}
      />
      <BottomTab.Screen name="Profile" component={user ? Profile : Walkthrough} options={{ title: t("account"), tabBarIcon: ({ color }) => { return <Icon solid color={color} name="user-circle" size={20} />; }, }} />
    </BottomTab.Navigator>
  );
}
