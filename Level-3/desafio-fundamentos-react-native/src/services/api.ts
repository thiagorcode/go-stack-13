import axios from 'axios';

const ANDROID_USB = 'http://192.168.1.105:3333';
const ANDROID_VIRTUAL = 'http://10.0.2.2:3333';

const api = axios.create({
  baseURL: ANDROID_VIRTUAL,
});

export default api;
