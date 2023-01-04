import { WFSClient } from '../../../src';

new WFSClient().clan.members('атомные_медики').then((res) => {
  console.log(res);
});