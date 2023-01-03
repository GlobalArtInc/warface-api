import { WFApi } from "../src";
import { Server } from "../src/enum/common.enum";

new WFApi().getTop100(Server.Int).then((res) => {
  console.log(res);
});