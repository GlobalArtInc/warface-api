interface MembersInterface {
    nickname: string,
    rank_id: string,
    clan_points: string,
    clan_role: "REGULAR" | "OFFICER" | "MASTER"
}

export interface ClanInterface {
    server: string,
    clan: {
        id: string,
        name: string,
        members: MembersInterface
    }
}
