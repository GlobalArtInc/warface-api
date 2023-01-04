import {
  AchievementProvider as WfaAchievementProvider,
  ClanProvider as WfaClanProvider,
  GameProvider as WfaGameProvider,
  RatingProvider as WfaRatingProvider,
  UserProvider as WfaUserProvider,
} from '../providers/wf-api';
import { 
  WfsOnlineProvider,
  WfsPlayerProvider,
  WfsClanProvider,
} from '../providers/wfs';
import { Endpoint as WfaEndpoint } from "./wf-api";
import { Server } from "./common";

export class WFClient {
  public clan = new WfaClanProvider();
  public user = new WfaUserProvider();
  public game = new WfaGameProvider();
  public achievement = new WfaAchievementProvider();
  public rating = new WfaRatingProvider();

  static getEndpoint(server: Server) {
    return WfaEndpoint[server];
  }
}

export class WFSClient {
  public online = new WfsOnlineProvider();
  public player = new WfsPlayerProvider();
  public clan = new WfsClanProvider();
}
