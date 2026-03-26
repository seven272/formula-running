    import { createSlice } from '@reduxjs/toolkit';

    const toastSlice = createSlice({
      name: 'toast',
      initialState: {
        message: null,
        type: 'success', // 'success', 'error', 'info', etc.
      },
      reducers: {
        showToast: (state, action) => { 
          state.message = action.payload.message;
          state.type = action.payload.type || 'success';
        },
        clearToast: (state) => {
          state.message = null;
          state.type = 'success';
        },
      },
    });

    export const { showToast, clearToast } = toastSlice.actions;
    export default toastSlice.reducer;