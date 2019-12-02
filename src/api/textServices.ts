import axios from 'axios';
import routerForword from '@/url/text';


const textServices = {
    getMenu() {
        const url = routerForword.getMenu;
        return axios.get(url);
    },
    getUserInfo() {
        const url = routerForword.getUserInfo;
        return axios.get(url);
    }
}

export default textServices;