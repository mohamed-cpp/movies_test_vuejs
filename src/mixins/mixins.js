/* eslint-disable prettier/prettier */
// import Cookies from "js-cookie";
// const UserCookieName = "user";
import { isLogged } from "@/utils/auth";

export default {
  methods: {

    isLogged() {
      return isLogged();
    },
  },
}
