/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/pet/{petId}/uploadImage": {
    post: operations["uploadFile"];
  };
  "/pet": {
    put: operations["updatePet"];
    post: operations["addPet"];
  };
  "/pet/findByStatus": {
    /** Multiple status values can be provided with comma separated strings */
    get: operations["findPetsByStatus"];
  };
  "/pet/findByTags": {
    /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
    get: operations["findPetsByTags"];
  };
  "/pet/{petId}": {
    /** Returns a single pet */
    get: operations["getPetById"];
    post: operations["updatePetWithForm"];
    delete: operations["deletePet"];
  };
  "/store/order": {
    post: operations["placeOrder"];
  };
  "/store/order/{orderId}": {
    /** For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions */
    get: operations["getOrderById"];
    /** For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors */
    delete: operations["deleteOrder"];
  };
  "/store/inventory": {
    /** Returns a map of status codes to quantities */
    get: operations["getInventory"];
  };
  "/user/createWithArray": {
    post: operations["createUsersWithArrayInput"];
  };
  "/user/createWithList": {
    post: operations["createUsersWithListInput"];
  };
  "/user/{username}": {
    get: operations["getUserByName"];
    /** This can only be done by the logged in user. */
    put: operations["updateUser"];
    /** This can only be done by the logged in user. */
    delete: operations["deleteUser"];
  };
  "/user/login": {
    get: operations["loginUser"];
  };
  "/user/logout": {
    get: operations["logoutUser"];
  };
  "/user": {
    /** This can only be done by the logged in user. */
    post: operations["createUser"];
  };
}

export interface definitions {
  ApiResponse: {
    code?: number;
    type?: string;
    message?: string;
  };
  Category: {
    id?: number;
    name?: string;
  };
  Pet: {
    id?: number;
    category?: definitions["Category"];
    name: string;
    photoUrls: string[];
    tags?: definitions["Tag"][];
    /** pet status in the store */
    status?: "available" | "pending" | "sold";
  };
  Tag: {
    id?: number;
    name?: string;
  };
  Order: {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: "placed" | "approved" | "delivered";
    complete?: boolean;
  };
  User: {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };
}

export interface operations {
  uploadFile: {
    parameters: {
      path: {
        /** ID of pet to update */
        petId: number;
      };
      formData: {
        /** Additional data to pass to server */
        additionalMetadata?: string;
        /** file to upload */
        file?: { [key: string]: unknown };
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["ApiResponse"];
      };
    };
  };
  updatePet: {
    parameters: {
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions["Pet"];
      };
    };
    responses: {
      /** Invalid ID supplied */
      400: unknown;
      /** Pet not found */
      404: unknown;
      /** Validation exception */
      405: unknown;
    };
  };
  addPet: {
    parameters: {
      body: {
        /** Pet object that needs to be added to the store */
        body: definitions["Pet"];
      };
    };
    responses: {
      /** Invalid input */
      405: unknown;
    };
  };
  /** Multiple status values can be provided with comma separated strings */
  findPetsByStatus: {
    parameters: {
      query: {
        /** Status values that need to be considered for filter */
        status: ("available" | "pending" | "sold")[];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"][];
      };
      /** Invalid status value */
      400: unknown;
    };
  };
  /** Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
  findPetsByTags: {
    parameters: {
      query: {
        /** Tags to filter by */
        tags: string[];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"][];
      };
      /** Invalid tag value */
      400: unknown;
    };
  };
  /** Returns a single pet */
  getPetById: {
    parameters: {
      path: {
        /** ID of pet to return */
        petId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Pet"];
      };
      /** Invalid ID supplied */
      400: unknown;
      /** Pet not found */
      404: unknown;
    };
  };
  updatePetWithForm: {
    parameters: {
      path: {
        /** ID of pet that needs to be updated */
        petId: number;
      };
      formData: {
        /** Updated name of the pet */
        name?: string;
        /** Updated status of the pet */
        status?: string;
      };
    };
    responses: {
      /** Invalid input */
      405: unknown;
    };
  };
  deletePet: {
    parameters: {
      header: {
        api_key?: string;
      };
      path: {
        /** Pet id to delete */
        petId: number;
      };
    };
    responses: {
      /** Invalid ID supplied */
      400: unknown;
      /** Pet not found */
      404: unknown;
    };
  };
  placeOrder: {
    parameters: {
      body: {
        /** order placed for purchasing the pet */
        body: definitions["Order"];
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Order"];
      };
      /** Invalid Order */
      400: unknown;
    };
  };
  /** For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions */
  getOrderById: {
    parameters: {
      path: {
        /** ID of pet that needs to be fetched */
        orderId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["Order"];
      };
      /** Invalid ID supplied */
      400: unknown;
      /** Order not found */
      404: unknown;
    };
  };
  /** For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors */
  deleteOrder: {
    parameters: {
      path: {
        /** ID of the order that needs to be deleted */
        orderId: number;
      };
    };
    responses: {
      /** Invalid ID supplied */
      400: unknown;
      /** Order not found */
      404: unknown;
    };
  };
  /** Returns a map of status codes to quantities */
  getInventory: {
    parameters: {};
    responses: {
      /** successful operation */
      200: {
        schema: { [key: string]: number };
      };
    };
  };
  createUsersWithArrayInput: {
    parameters: {
      body: {
        /** List of user object */
        body: definitions["User"][];
      };
    };
    responses: {
      /** successful operation */
      default: unknown;
    };
  };
  createUsersWithListInput: {
    parameters: {
      body: {
        /** List of user object */
        body: definitions["User"][];
      };
    };
    responses: {
      /** successful operation */
      default: unknown;
    };
  };
  getUserByName: {
    parameters: {
      path: {
        /** The name that needs to be fetched. Use user1 for testing. */
        username: string;
      };
    };
    responses: {
      /** successful operation */
      200: {
        schema: definitions["User"];
      };
      /** Invalid username supplied */
      400: unknown;
      /** User not found */
      404: unknown;
    };
  };
  /** This can only be done by the logged in user. */
  updateUser: {
    parameters: {
      path: {
        /** name that need to be updated */
        username: string;
      };
      body: {
        /** Updated user object */
        body: definitions["User"];
      };
    };
    responses: {
      /** Invalid user supplied */
      400: unknown;
      /** User not found */
      404: unknown;
    };
  };
  /** This can only be done by the logged in user. */
  deleteUser: {
    parameters: {
      path: {
        /** The name that needs to be deleted */
        username: string;
      };
    };
    responses: {
      /** Invalid username supplied */
      400: unknown;
      /** User not found */
      404: unknown;
    };
  };
  loginUser: {
    parameters: {
      query: {
        /** The user name for login */
        username: string;
        /** The password for login in clear text */
        password: string;
      };
    };
    responses: {
      /** successful operation */
      200: {
        headers: {};
        schema: string;
      };
      /** Invalid username/password supplied */
      400: unknown;
    };
  };
  logoutUser: {
    parameters: {};
    responses: {
      /** successful operation */
      default: unknown;
    };
  };
  /** This can only be done by the logged in user. */
  createUser: {
    parameters: {
      body: {
        /** Created user object */
        body: definitions["User"];
      };
    };
    responses: {
      /** successful operation */
      default: unknown;
    };
  };
}

export interface external {}