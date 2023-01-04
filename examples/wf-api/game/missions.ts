import { WFClient } from "../../../src";

new WFClient().game.missions().then((res) => {
    console.log(res);
});
