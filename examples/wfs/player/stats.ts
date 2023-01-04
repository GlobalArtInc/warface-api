import { WFSClient } from '../../../src';

new WFSClient().player.stats('МедикХххх').then((res) => {
  console.log(res);
});