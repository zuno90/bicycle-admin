import { createSlice } from "@reduxjs/toolkit";
import { IMessageUser, IUserList } from "../../__types__";
import { clean } from "../common.action";

interface IChatState {
  isLoading: boolean;
  previewImg: string;
  imageFile: File | null;
  userList: IUserList[];
  currentUser: IMessageUser | null;
}

const initialState: IChatState = {
  isLoading: false,
  previewImg: "",
  imageFile: null,
  userList: [],
  currentUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loadSidebar: (state, action) => {
      state.userList = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    handleImageUpload: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "show":
          state.previewImg = payload.preview;
          state.imageFile = payload.file;
          break;
        case "remove":
          state.previewImg = "";
          state.imageFile = null;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => builder.addCase(clean, () => initialState),
});

export const { setLoading, loadSidebar, setCurrentUser, handleImageUpload } =
  chatSlice.actions;
export default chatSlice.reducer;
