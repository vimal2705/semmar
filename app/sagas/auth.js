import { all, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "@actions/actionTypes";
import * as api from "@api";
import { UserModel } from "@models";

function* onLogin(action) {
  try {
    const response = yield api.fetchLogin(action.params);
    if (response.success) {
      const user = new UserModel(response.data);
      yield put({ type: actionTypes.LOGIN_SUCCESS, user: user });
      yield put({ type: actionTypes.GET_WISHLIST, design: action.design });
      yield put({ type: actionTypes.FETCH_MESSAGE });
    }
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* onValid(action) {
  try {
    const response = yield api.fetchValid();
    if (response.success) {
      yield put({ type: actionTypes.GET_WISHLIST, design: action.design });
      yield put({ type: actionTypes.GET_USER_INFO });
      yield put({ type: actionTypes.FETCH_MESSAGE });
    } else {
      yield put({ type: actionTypes.LOGOUT });
    }
    action.callback?.(response);
  } catch (error) {
    yield put({ type: actionTypes.LOGOUT });
    action.callback?.(error.response ?? error.message);
  }
}

function* onGetInfo(action) {
  try {
    const response = yield api.getUserInfo();
    if (response.success) {
      const user = new UserModel(response.data);
      yield put({ type: actionTypes.UPDATE_USER, user: user });
    }
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* updateInfo(action) {
  try {
    const response = yield api.updateProfile(action.params);
    if (response.success) {
      yield put({ type: actionTypes.GET_USER_INFO });
    }
    action.callback?.(response);
  } catch (error) {
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLogin() {
  yield takeEvery(actionTypes.LOGIN, onLogin);
}

function* watchValid() {
  yield takeEvery(actionTypes.VALID_TOTEN, onValid);
}

function* watchGetInfo() {
  yield takeEvery(actionTypes.GET_USER_INFO, onGetInfo);
}

function* watchEditProfile() {
  yield takeEvery(actionTypes.ON_UPDATE_PROFILE, updateInfo);
}

export default function* authSagas() {
  yield all([watchLogin(), watchValid(), watchGetInfo(), watchEditProfile()]);
}
