import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminLoggedIn: localStorage.getItem('isAdmin') || false,
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const user = {
        userName: action.payload.userName,
        userLastName: action.payload.userLastName,
        userRol: action.payload.userRol,
        userEmail: action.payload.userEmail,
        favExperiences: action.payload.favExperiences
      };
      state.user = JSON.stringify(user);
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', state.user);
      if (action.payload.userRol === 'ADMIN'){
        state.isAdminLoggedIn = true;
        localStorage.setItem('isAdmin', state.isAdminLoggedIn);
      } 
      
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdminLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin')
    },
    updateFavExperiences: (state, action) => {
      const user = JSON.parse(state.user)
      user.favExperiences = action.payload.favExperiences
      state.user = JSON.stringify(user)
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
});

export const { login, logout, updateFavExperiences } = authSlice.actions;
export const user = (state) => state.auth.user;
export const token = (state) => state.auth.token;
export const isAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
export default authSlice.reducer;



