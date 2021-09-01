import { JsonRequest } from "http-req-builder";
import { definitions, operations } from "../../.temp/types";
export class StoreController {
  async getInventory() {
    return (
      await new JsonRequest()
        .url("http://localhost/v2/store/inventory")
        .send<operations["getInventory"]["responses"]["200"]["schema"]>()
    ).body;
  }
}
