import React, { useState } from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseStyle, useTheme } from "@config";
import { Header, SafeAreaView, Icon, Text, Button, TextInput, } from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { authActions } from "@actions";
import { designSelect } from "@selectors";

export default function SignIn({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const design = useSelector(designSelect);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState({ id: true, password: true });

  /**
   * call when action onLogin
   */
  const onLogin = () => {
    if (id == "" || password == "") {
      setSuccess({
        ...success,
        id: false,
        password: false,
      });
      return;
    }
    const params = {
      username: id,
      password,
    };
    setLoading(true);
    dispatch(
      authActions.onLogin(params, design, (response) => {
        console.log('response:  ' , response)
        if (response?.success) {
          navigation.goBack();
          setTimeout(() => {
            route.params?.success?.();
          }, 1000);
          return;
        }
        Alert.alert({ title: t("sign_in"), message: t(response?.message) });
        setLoading(false);
      })
    );
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={{ flex: 1 }}>

      <Header title={t("sign_in")}
        renderLeft={() => { return (<Icon name="times" size={20} color={colors.primary} enableRTL={true} />); }}
        onPressLeft={() => { navigation.goBack(); }}
      />

      <SafeAreaView style={BaseStyle.safeAreaView} edges={["right", "left"]}>
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} keyboardVerticalOffset={offsetKeyboard} style={{ flex: 1 }}        >
          <View style={styles.contain}>
            <TextInput
              onChangeText={setId}
              onFocus={() => { setSuccess({ ...success, id: true, }); }}
              placeholder={t("input_id")}
              success={success.id}
              value={id}
            />

            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={setPassword}
              onFocus={() => { setSuccess({ ...success, password: true, }); }}
              placeholder={t("input_password")}
              secureTextEntry={true}
              success={success.password} value={password}
            />

            <Button style={{ marginTop: 20 }} full loading={loading} onPress={onLogin}>{t("sign_in")}</Button>

            <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
              <Text body1 grayColor style={{ marginTop: 25 }}>{t("forgot_your_password")}</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
