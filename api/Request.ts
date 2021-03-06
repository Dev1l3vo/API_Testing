import type { Options, Method, CancelableRequest } from "got";//it is my http req builder
import got from "got";

export class JsonRequest {
  protected options: any = {
    responseType: "json",
  };

  public url(url: string | URL) {
    this.options.url = url;
    return this;
  }

  public method(method: Method) {
    this.options.method = method;
    return this;
  }

  public searchParams(searchParams: Options["searchParams"]): this {
    this.options.searchParams = searchParams;
    return this;
  }

  public body(body: any): this {
    this.options.json = body;
    return this;
  }

  public send<T = any>() {
    return got<T>(this.options);
  }
}
