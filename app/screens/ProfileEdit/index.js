import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { BaseStyle, useTheme } from "@config";
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from "@components";
import styles from "./styles";
import { userSelect } from "@selectors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { authActions } from "@actions";
import axios from "axios";
import syncStorage from "sync-storage";

export default function ProfileEdit({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [Msg, setMsg] = useState('')
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [website, setWebsite] = useState(user.link);
  const [information, setInformation] = useState(user.description);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    website: true,
    information: true,
  });

  /**
   * on Update Profile
   *
   */
  const cookie = syncStorage.get('result')

  const onUpdate = async() => {
    console.log('asas',cookie);

    var bodyFormData = new FormData();
    bodyFormData.append("insecure", "cool");

    if (name == "" || email == "" || website == "" || information == "") {
    
      setSuccess({
        ...success,
        name: name != "" ? true : false,
        email: email != "" ? true : false,
        website: website != "" ? true : false,
        information: information != "" ? true : false,
      });
      return;
    }
   await axios({
      url: `http://semmsar.com/api/user/xprofile_update/?cookie=${cookie}&username=${name}&display_name=${name}&insecure=cool`,
      method: 'POST',
      data: bodyFormData,

    })
      .then(function (response) {
        setLoading(true);
        console.log("response :", response.data);
        
        
       if (response.data.status === 'error') {
        Alert.alert({
          title: t("edit_profile"),
          message:response.data.error,
        });
       }
       else{
        Alert.alert({
          title: t("edit_profile"),
          message:response.data,
        });
      }
  
      setLoading(false);
      })
      .catch(function (error) {
        console.log("error from image :",error);
       
      })
    // const params = {
    //   name,
    //   email,
    //   url: website,
    //   description: information,
    // };
    // setLoading(true);
    // dispatch(
    //   authActions.onEditProfile(params, (response) => {
    //     Alert.alert({
         
    //       title: t("edit_profile"),
    //         message:Msg,
         
    //       // type: "success",
    //       // title: t("edit_profile"),
    //       // message: t("update_success"),
    //       // action: [{ onPress: () => navigation.goBack() }],
    //     });
    //     setLoading(false);
    //   })
    // );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t("edit_profile")}
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
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "padding"}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.contain}>
            <Image source={user.image} style={styles.thumb} />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t("name")}
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setName(text)}
              placeholder={t("input_name")}
              value={name}
              success={success.name}
              onFocus={() => {
                setSuccess({
                  ...success,
                  username: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t("email")}
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              placeholder={t("input_email")}
              value={email}
              success={success.email}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t("website")}
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setWebsite(text)}
              placeholder={t("input_email")}
              value={website}
              success={success.website}
              onFocus={() => {
                setSuccess({
                  ...success,
                  website: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t("information")}
              </Text>
            </View>
            <TextInput
              onChangeText={(text) => setInformation(text)}
              placeholder={t("input_information")}
              value={information}
              success={success.information}
              onFocus={() => {
                setSuccess({
                  ...success,
                  information: true,
                });
              }}
            />
          </ScrollView>
          <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
            <Button loading={loading} full onPress={onUpdate}>
              {t("confirm")}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
