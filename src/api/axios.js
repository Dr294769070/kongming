import axios from "axios";
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

export default {
    API_INTERFACE(params) {
        const method = params.method;
        if (method == "get") {
            return new Promise((reslove) => {
                axios.get(params.url, {
                    params: params.data
                }).then(res => {
                    reslove(res)
                });
            });
        }
    },
};
