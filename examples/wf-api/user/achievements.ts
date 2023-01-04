import { Server, WFClient } from "../../../src";

new WFClient().user.achievements('МедикХххх', Server.Ru).then((res) => {
  console.log(res);
});