// const baseURL = "https://coupon-solicits-1.herokuapp.com";
// const baseURL = "https://coupon-backend-12.herokuapp.com";
// USE IP ADDRESS FORM YOUR NETWORK TAB IN LAPTOP
export const baseURL = "http://192.168.54.180:5000";


// const baseURL = "http://localhost:5000";
const accessToken = "54f2785ab5306a340f186cf23cd00556";
const config = {
  login_url: baseURL + "/users/login",
  register_url: baseURL + "/users/register",
  changePassword_url: baseURL + "/users/change_password",
  forgotPassword_url: baseURL + "/users/forgotPassword",
  hotel_url: baseURL + "/users/hotels",
  advert_url: baseURL + "/users/advert",
  advert_suggestion_url: baseURL + "/users/advert/suggestion",
  updateProfile_url: baseURL + "/users/me",
  support_url: baseURL + "/users/support",
  locationApi_url: `http://api.positionstack.com/v1/reverse?access_key=${accessToken}&query=`,
};

export default config;
