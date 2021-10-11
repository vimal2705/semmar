import { all, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "@actions/actionTypes";
import * as api from "@api";
import { ProductModel } from "@models";

function* loadList(action) {
  try {
    const params = {};
    let response;


    response = yield api.getListProduct(params);
    response.data = response.data.map?.((item) => {
      return new ProductModel(item);
    });



    yield put({
      type: actionTypes.SAVE_LIST,
      list: response.data,
    });
    action.callback?.(response);
  } catch (error) {
    // console.log("loadList", error);
    action.callback?.(error.response ?? error.message);
  }
}

function* watchLoadList() {
  yield takeEvery(actionTypes.LOAD_LIST, loadList);
}

export default function* authSagas() {
  yield all([watchLoadList()]);
}
