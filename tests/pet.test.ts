import chai from "chai";
import { PetController } from "../api/Controllers/pet.controller";
import { definitions } from "../.temp/types";
chai.use(require("chai-shallow-deep-equal"));
const pet = new PetController();

describe("User can", () => {
  it("recieve pet by id", async () => {
    const body = await pet.getById(3);
    chai.expect(body.id).to.be.eq(3, "Is not equal");
  });

  it("can be received by status", async () => {
    let body = await pet.findByStatus("available");
    chai.expect(body.length).to.be.greaterThan(0, "Body doesnot be empty");

    body = await pet.findByStatus("sold");
    chai.expect(body.length).to.be.greaterThan(0, "Body doesnot be empty");

    body = await pet.findByStatus("pending");
    chai.expect(body.length).to.be.greaterThan(0, "Body doesnot be empty");

    // let queryParams = new URLSearchParams({ status: ["pending", "available"] });
    // console.log(queryParams.toString());

    // response = await got("http://localhost:8080/api/v3/pet/findByStatus/", {
    //   searchParams: queryParams
    // });
    // body = JSON.parse(response.body);
    // chai.expect(body.length).to.be.greaterThan(0);

    // chai.expect(body.some((pet: any) => pet.status == "pending")).to.be.true;

    // chai.expect(body.some((pet: any) => pet.status == "available")).to.be.true;
    // chai.expect(body.some((pet: any) => pet.status == "sold")).to.be.false;
  });

  it("can be received by tags", async () => {
    let body = await pet.findByTags("tag1");
    chai.expect(body.length).to.be.greaterThan(0);

    chai.expect(
      body.every((pet) => pet.tags?.some((tag) => tag.name == "tag1"))
    ).to.be.true;
  });

  it("can be added,updated and deleted", async () => {
    const petToCreate: Omit<definitions["Pet"], "id"> = {
      category: {
        id: 0,
        name: "dog",
      },
      name: "doggie",
      photoUrls: [
        "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/03/Killua-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
      ],
      tags: [
        {
          id: 0,
          name: "dog",
        },
      ],
      status: "available",
    };

    const addedPet = await pet.addNew(petToCreate); //pet returned by server(with id)
    chai
      .expect({ ...petToCreate, id: addedPet.id })
      .deep.equal(
        addedPet,
        "Expected created pet must be equal to responsed pet"
      );

    const foundedPet = await pet.getById(addedPet.id); //pet founded by ID
    chai
      .expect(addedPet)
      .deep.equal(
        foundedPet,
        "Expected founded pet must be equal to created pet"
      );

    const newPet: definitions["Pet"] = {
      id: addedPet.id,
      category: {
        id: 0,
        name: "cat",
      },
      name: "cat",
      photoUrls: [
        "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/03/Killua-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
      ],
      tags: [
        {
          id: 0,
          name: "cat",
        },
      ],
      status: "pending",
    };
    const UpdatedPet = await pet.Update(newPet); //pet UPDATE WITH PUT REQUEST
    chai
      .expect(newPet)
      .deep.equal(
        UpdatedPet,
        "Expected founded pet must be equal to created pet"
      );

    await pet.delete(addedPet.id);
  });
});
