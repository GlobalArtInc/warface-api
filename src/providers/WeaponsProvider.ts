import {ClientOptions, getApiUrl} from "../core";
import axios from "axios";

export class WeaponsProvider {
    constructor(
        public options: ClientOptions
    ) {
    }
    public async list() {
        try {
            const server = this.options.servers[0],
                apiUrl = getApiUrl(server),
                {data} = await axios.get(`${apiUrl}/weapon/catalog`)
            return Promise.resolve({server, data})
        } catch (err: any) {
            const {data} = err.response
            return Promise.reject(data)
        }
    }
}
