import {ClientOptions, getApiUrl} from "../core";
import axios from "axios";
import {StatsErrorInterface} from "../interfaces";

export class ClanProvider {
    constructor(
        public options: ClientOptions
    ) {
    }

    public async get(name: string): Promise<any> {
        for (const server of this.options.servers) {
            try {
                const apiUrl = getApiUrl(server);
                const {data} = await axios.get(encodeURI(`${apiUrl}/clan/members?clan=${name}`))
                return Promise.resolve({server, clan: data})
            } catch (err: any) {
                const data: StatsErrorInterface = err.response.data

                if (data.message === "Ошибка: invalid response status") {
                    return Promise.reject("maintenance");
                } else if (this.options.servers[this.options.servers.length - 1] === server && data.message === 'Клан не найден') {
                    return Promise.reject("not_found");
                }
            }
        }
    }
}
