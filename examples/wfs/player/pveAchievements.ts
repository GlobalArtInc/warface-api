import { WFSClient } from '../../../src';

new WFSClient().player.pveAchievements('МедикХххх').then((res) => {
  console.log(res);
});