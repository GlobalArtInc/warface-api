import axios from "axios";
import { Endpoint, Server } from "./enum/common.enum";
import { Clan } from "./interfaces/clan.interface";
import { Achievement } from "./interfaces/player.interface";
import { Player } from "./interfaces/player.interface";
import { Top } from "./interfaces/top.interface";
import { Weapon } from "./interfaces/weapons.interface";
import clanService from "./services/clan.service";
import playerService from "./services/player.service";
import topService from "./services/top.service";
import weaponsService from "./services/weapons.service";

export class WFApi {
  static getApiUrl(server: Server) {
    return Endpoint[server];
  }

  async getAchievements(name: string, server: Server): Promise<Achievement[]> {
    return playerService.getAchievements(name, server);
  }

  async getTop100(server: Server): Promise<Top> {
    return topService.getTop(server);
  }

  async getPlayer(name: string, server: Server | null = null): Promise<Player> {
    return playerService.getPlayer(name, server)
  }

  async getClan(name: string, server: Server | null = null): Promise<Clan> {
    return clanService.getClan(name, server);
  }

  async getWeapons(server: Server): Promise<Weapon[]> {
    return weaponsService.getWeapons(server);
  }
}