import got from "got";
import { URLSearchParams } from "url";
import { definitions, operations } from "../../.temp/types";
import { JsonRequest } from "http-req-builder";
import { loadApiSchemas, validate } from "../validator";
export class PetController {
  async getById(id: Number | string | undefined) {
    if (id === undefined) {
      throw new Error("id cannot be undefined");
    }
    const body = (
      await new JsonRequest()
        .url(`http://localhost/v2/pet/${id}`)
        .send<definitions["Pet"]>()
    ).body;
    const apiSpec = await loadApiSchemas();
    const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema'];
    validate(schema, body);
    return body;
  }

  async findByTags(tags: string | string[]) {
    return (
      await new JsonRequest()
        .url("http://localhost/v2/pet/findByTags")
        .searchParams(new URLSearchParams({ tags }))
        .send<Array<definitions["Pet"]>>()
    ).body;
  }

  async findByStatus(status: string | string[]) {
    return (
      await new JsonRequest()
        .url("http://localhost/v2/pet/findByStatus")
        .searchParams(new URLSearchParams({ status }))
        .send<Array<definitions["Pet"]>>()
    ).body; //it is create object with field status:and have value of status parametrs
  }

  async addNew(pet: Omit<definitions["Pet"], "id">) {
    return (
      await new JsonRequest()
        .url("http://localhost/v2/pet")
        .method("POST")
        .body(pet)
        .send<definitions["Pet"]>()
    ).body;
  }

  async Update(pet: definitions["Pet"]) {
    return (
      await new JsonRequest()
        .url("http://localhost/v2/pet")
        .method("PUT")
        .body(pet)
        .send<definitions["Pet"]>()
    ).body;
  }

  async delete(id: number | string | undefined) {
    if (id === undefined) {
      throw new Error("id cannot be undefined");
    }
    return (
      await new JsonRequest()
        .url(`http://localhost/v2/pet/${id}`)
        .method("DELETE")
        .send<definitions["ApiResponse"]>()
    ).body;
  }
}
