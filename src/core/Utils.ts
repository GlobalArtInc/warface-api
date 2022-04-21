import {Endpoints} from "./Endpoints";
import {ClientOptions} from "./ClientOptions";

export function getApiUrl(server: "ru" | "eu") {
    if (server === 'ru') {
        return Endpoints.RU_URL
    } else {
        return Endpoints.EU_URL
    }
}
