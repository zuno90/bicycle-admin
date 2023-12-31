import { createSlice } from "@reduxjs/toolkit";
import { clean } from "../common.action";

type TProductState = {
  variantList: number[];
  detailVariantList: number[];
  previewImageList: string[];
};

const initialState: TProductState = {
  variantList: [0],
  detailVariantList: [],
  previewImageList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitialList: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "detailVariant":
          state.detailVariantList = payload;
          break;
        case "previewImage":
          state.previewImageList = payload;
          break;
        default:
          break;
      }
    },
    addByIndex: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "variant":
          state.variantList.push(payload);
          break;
        case "detailVariant":
          state.detailVariantList.push(payload);
          break;
        default:
          break;
      }
    },
    removeByIndex: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "variant":
          state.variantList = state.variantList
            .filter((index) => index !== payload)
            .sort((a: number, b: number) => a - b);
          break;
        case "detailVariant":
          state.detailVariantList = state.detailVariantList
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
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export const { setInitialList, addByIndex, removeByIndex } =
  productSlice.actions;
export default productSlice.reducer;
