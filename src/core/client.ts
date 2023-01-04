import { AchievementProvider } from "../providers/achievement.provder";
import { ClanProvider } from "../providers/clan.provider";
import { GameProvider } from "../providers/game.provider";
import { RatingProvider } from "../providers/rating.provider";
import { UserProvider } from "../providers/user.provider";
import { Endpoint, Server } from "./common";

export class WFClient {
  public clan = new ClanProvider();
  public user = new UserProvider();
  public game = new GameProvider();
  public achievement = new AchievementProvider();
  public rating = new RatingProvider();

  static getEndpoint(server: Server) {
    return Endpoint[server];
  }
}