import { WFSClient } from '../../../src';

new WFSClient().online.stats().then((res) => {
  console.log(res);
});