import qs from 'qs';
import Api from './Api';
import { VPN_API_URL } from '../config';

// https://bit.adguard.com/projects/ADGUARD/repos/adguard-vpn-backend-service/browse
class VpnApi extends Api {
    GET_ENDPOINTS = { path: 'endpoints', method: 'GET' };

    GET_VPN_CREDENTIALS = { path: 'proxy_credentials', method: 'POST' };

    GET_CURRENT_LOCATION = { path: 'geo_location', method: 'GET' };

    getEndpoints() {
        const { path, method } = this.GET_ENDPOINTS;

        return this.makeRequest(path, method);
    }

    getVpnCredentials(appId, vpnToken) {
        const { path, method } = this.GET_VPN_CREDENTIALS;
        const data = {
            app_id: appId,
            token: vpnToken,
        };
        const config = {
            data: qs.stringify(data),
        };
        return this.makeRequest(path, method, config);
    }

    getCurrentLocation() {
        const { path, method } = this.GET_CURRENT_LOCATION;
        return this.makeRequest(path, method);
    }
}

const vpnApi = new VpnApi(VPN_API_URL);

export default vpnApi;
