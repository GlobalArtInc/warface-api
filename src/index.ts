import {ClientOptions} from "./core";
import {ClanProvider, WeaponsProvider} from "./providers";

export default class Client {
    public options: ClientOptions;
    public clan: ClanProvider;
    public weapons: WeaponsProvider;

    constructor(options: ClientOptions) {
        this.options = options;

        this.clan = new ClanProvider(this.options);
        this.weapons = new WeaponsProvider(this.options);
    }
}
