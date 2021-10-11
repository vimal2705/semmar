import { all, put, takeEvery, delay } from "redux-saga/effects";
import * as actionTypes from "@actions/actionTypes";
import * as api from "@api";
import { ProductModel, PaginationModel } from "@models";

function* loadWishList(action) {
  try {
    let response;
    response = yield api.getWishList(action.params);
    if (response.success) {
      const list = response.data.map?.((item) => {
        return new ProductModel(item);
      });
      yield put({ type: actionTypes.SAVE_WISHLIST, list, });
    }
    action.callback?.(response);
  } catch (error) {
    // console.log("loadWishList", error);
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLoad() {
  yield takeEvery(actionTypes.GET_WISHLIST, loadWishList);
}

export default function* authSagas() {
  yield all([watchLoad()]);
}
