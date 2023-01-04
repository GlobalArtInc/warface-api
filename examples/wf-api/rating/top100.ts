import { Server, WFClient } from "../../../src";

new WFClient().rating.top100(Server.Int).then((res) => {
  console.log(res);
});