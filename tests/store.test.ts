import chai from "chai";
import { definitions } from "../.temp/types";
import { PetController } from "../api/Controllers/pet.controller";
import { StoreController } from "../api/Controllers/store.controller";

const store = new StoreController();
const pet = new PetController();
describe("store", async () => {
  it("return inventory and updates statuses", async () => {
    const inventory = await store.getInventory();
    chai.expect(inventory).to.not.be.undefined.and.null;

    await pet.addNew(petWtihStatus("available"));

    const inventoryWithAvailable = await store.getInventory();
    chai
      .expect(inventoryWithAvailable.available)
      .to.eql(inventory.available + 1);

    await pet.addNew(petWtihStatus("pending"));
    const inventoryPending = await store.getInventory();
    chai.expect(inventoryPending.pending).to.eql(inventory.pending + 1);

    await pet.addNew(petWtihStatus("sold"));
    const inventoryWithSold = await store.getInventory();
    chai.expect(inventoryWithSold.sold).to.eql(inventory.sold + 1);
  });
});

function petWtihStatus(status: definitions["Pet"]["status"]) {
  return {
    category: {
      id: 0,
      name: "string",
    },
    name: "doggie",
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "string",
      },
    ],
    status,
  };
}
