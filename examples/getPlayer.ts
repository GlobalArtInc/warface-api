import { WFApi } from "../src";

new WFApi().getPlayer('МедикХххх').then((res) => {
  console.log(res);
});