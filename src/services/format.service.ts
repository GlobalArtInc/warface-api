import { Server } from "../enum/common.enum";

export class formatService {
  getMatch(el: any, regexp: any) {
    return el.match(regexp)[0].trim();
  }

  format(playerData: any, achievements: any, server: Server) {
    let player = playerData;
    const full_player = parseFullResponse(player['full_response']);
    delete player['full_response'];
  
    return {
        server,
        player,
        full_player,
        achievements
    };
  }

  parseFullResponse(full_response) {
    return full_response.split(/<Sum>/).reduce((acc, el) => {
      if (!el) return acc
  
      const key = getMatch(el, /.*(?=\=)/)
      acc[key] = +getMatch(el, /(?<=\=).*/)
  
      return acc
   }, {});
  }
}

export default new formatService();


export function formatPlayer(playerData: any, achievements: any, server: Server) {
  let player = playerData;
  const full_player = parseFullResponse(player['full_response']);
  delete player['full_response'];

  return {
      server,
      player,
      full_player,
      achievements
  };
}

export function getMatch(el: any, regexp: any) {
  return el.match(regexp)[0].trim();
}

export function parseFullResponse(full_response: any) {
  return full_response.split(/<Sum>/).reduce((acc, el) => {
    if (!el) return acc

    const key = getMatch(el, /.*(?=\=)/)
    acc[key] = +getMatch(el, /(?<=\=).*/)

    return acc
}, {})
}