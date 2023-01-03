import { WFApi } from "../src";
import { Server } from "../src/enum/common.enum";

new WFApi().getClan('Атомные_медики').then((res) => {
  console.log(res);
});