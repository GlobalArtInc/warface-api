import { ClanRole } from "../core";

export interface ClanMember {
  nickname: string;
  rank_id: string;
  clan_points: string;
  clan_role: ClanRole;
}

export interface Clan {
  id: string;
  name: string;
  members: ClanMember[];  
}
