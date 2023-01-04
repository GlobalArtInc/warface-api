import axios from "axios";
import { WFClient } from "../core";
import { Server } from "../core/common";

export class RatingProvider {
  async top100(server: Server) {
    const endpoint = WFClient.getEndpoint(server);
    
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${endpoint}/rating/top100`);

        return resolve(response.data);
      } catch(err) {
        return reject(err.response.data);
      }
    });
  }
}