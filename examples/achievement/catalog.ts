import { WFClient } from "../../src";

new WFClient().achievement.catalog().then((res) => {
  console.log(res);
});