import { WFClient } from "../../../src";

new WFClient().clan.members('атомные_медики').then((res) => {
    console.log(res);
});