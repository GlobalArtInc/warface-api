import { WFApi } from "../src";
import { Server } from "../src/enum/common.enum";

new WFApi().getAchievements('МедикХххх', Server.Ru).then((res) => {
  console.log(res);
});