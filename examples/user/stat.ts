import { WFClient } from "../../src";

new WFClient().user.stat('CK1983').then((res) => {
  console.log(res);
});