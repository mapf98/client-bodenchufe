import { API_URL } from "./config";

export default {
  getTranslate(lang: any)  {
    return API_URL.post(`/language/${lang}`);
  },
};
