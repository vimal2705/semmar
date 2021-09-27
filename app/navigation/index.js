import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { useTheme, BaseSetting } from "@config";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSelector } from "react-redux";
import { languageSelect, designSelect } from "@selectors";

/* Main Stack Navigator */
import Main from "app/navigation/main";
/* Modal Screen only affect iOS */
import Loading from "@screens/Loading";
import Filter from "@screens/Filter";
import PickerScreen from "@screens/PickerScreen";
import SearchHistory from "@screens/SearchHistory";
import PreviewImage from "@screens/PreviewImage";
import SelectDarkOption from "@screens/SelectDarkOption";
import SelectFontOption from "@screens/SelectFontOption";
import AlertScreen from "@screens/Alert";
import ChooseBusiness from "@screens/ChooseBusiness";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import ResetPassword from "@screens/ResetPassword";
import ProductDetail from "@screens/ProductDetail";
import Notification from "@screens/Notification";

const RootStack = createStackNavigator();

export default function Navigator() {
  const language = useSelector(languageSelect);
  const design = useSelector(designSelect);

  const { theme, colors } = useTheme();
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: language ?? BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content", true);
  }, []);

  /**
   * fade animate trasition navigation
   * @param {*} {current, closing}
   */
  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  /**
   * Main follow return SearchHistory design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportSearchHistory = (design) => {
    return SearchHistory;

  };

  /**
   * Main follow return  Product detail design you are selected
   * @param {*} design  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportProductDetail = (design) => {
    return ProductDetail;

  };

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          mode="modal"
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Loading"
        >
          <RootStack.Screen
            name="Loading"
            component={Loading}
            options={{ gestureEnabled: false }}
          />
          <RootStack.Screen name="SignIn" component={SignIn} />
          <RootStack.Screen name="SignUp" component={SignUp} />
          <RootStack.Screen name="ResetPassword" component={ResetPassword} />
          <RootStack.Screen
            name="Alert"
            component={AlertScreen}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              gestureEnabled: false,
            }}
          />
          <RootStack.Screen
            name="ChooseBusiness"
            component={ChooseBusiness}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              gestureEnabled: false,
            }}
          />
          <RootStack.Screen name="Main" component={Main} />
          <RootStack.Screen name="Filter" component={Filter} />
          <RootStack.Screen name="PickerScreen" component={PickerScreen} />
          <RootStack.Screen name="Notification" component={Notification} />
          <RootStack.Screen
            name="SearchHistory"
            component={exportSearchHistory(design)}
          />
          <RootStack.Screen
            name="ProductDetail"
            component={exportProductDetail(design)}
          />
          <RootStack.Screen name="PreviewImage" component={PreviewImage} />
          <RootStack.Screen
            name="SelectDarkOption"
            component={SelectDarkOption}
            gestureEnabled={false}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            }}
          />
          <RootStack.Screen
            name="SelectFontOption"
            component={SelectFontOption}
            gestureEnabled={false}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
