import axios from 'axios';
import qs from 'qs';
import router from '../router';
import EventKeys from '../common/event-keys/eventKeys';
import rxEvent from 'pubsub-js';
import { ResponseCode } from '@/common/enums/response-code';


/**
 * 请求相应拦截
 */

axios.interceptors.response.use((res: any) => {
    return res.data;
}, (error: any) => {
    if (error.response.status === 400) {
        rxEvent.publish(EventKeys.PARMAS_ERROR_MESSAGE, true);
    }
    if(error.response.status === 500) {
        rxEvent.publish(EventKeys.SERVICES_ERROR_MESSAGE, true);
    }
    if (error.response.status === 404) {
        // 资源未找到(请求路径错误)
        rxEvent.publish(EventKeys.REQUEST_ERROR_WAY, true);
        // router.push({
        //     path: '*'
        // })
    }
});

/**
 * 请求参数的拦截
 *
 */
axios.interceptors.request.use((config: any) => {
    const { data, method } = config;
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        //  在 node.js的服务中是使用的/在java的服务中不需要，此项目本人启用的是spring boot;
        // 2019-11-28改用node
        config.data = qs.stringify(data);
        // console.log(config.data, '========================');
    }
    return config;
})
