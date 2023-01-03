import { WFApi } from "../src";
import { Server } from "../src/enum/common.enum";

new WFApi().getWeapons(Server.Int).then((res) => {
  console.log(res);
});