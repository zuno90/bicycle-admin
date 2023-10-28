import { createSlice } from "@reduxjs/toolkit";

type TProductState = {
  variantList: number[];
  previewImageList: string[];
};

const initialState: TProductState = {
  variantList: [0],
  previewImageList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitialList: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "variant":
          state.variantList = payload;
          break;
        case "previewImage":
          state.previewImageList = payload;
          break;
        default:
          return state;
      }
    },
    addByIndex: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "variant":
          state.variantList.push(payload);
          break;
        case "previewImage":
          break;
        default:
          return state;
      }
    },
    removeByIndex: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "variant":
          console.log(payload);
          state.variantList = state.variantList
            .filter((index) => index !== payload)
            .sort((a: number, b: number) => a - b);
          break;
        case "previewImage":
          state.previewImageList = state.previewImageList.filter(
            (_, index) => index !== payload
          );
          break;
        default:
          break;
      }
    },
  },
});

export const { setInitialList, addByIndex, removeByIndex } =
  productSlice.actions;
export default productSlice.reducer;
