interface InterceptorItem {
  resolve: (...args: any) => any;
  reject?: (...args: any) => any;
}

class Interceptor {
  private list: Array<InterceptorItem> = [];

  use(resolve: (...args: any) => any, reject?: (...args: any) => any) {
    this.list.push({
      resolve,
      reject,
    });
  }

  forEach(action: (data: InterceptorItem) => any) {
    this.list.forEach(action);
  }
}

interface Config {
  baseUrl: string;
  timeout: number;
}

interface RequestConfig
  extends Omit<UniNamespace.RequestOptions, "success" | "fail"> {
  baseUrl?: string;
}

class Axios {
  interceptors = {
    request: new Interceptor(),
    respond: new Interceptor(),
  };
  //   request: Interceptor = new Interceptor();
  //   respond: Interceptor = new Interceptor();

  private config: Config = {
    baseUrl: "",
    timeout: 10000,
  };
  constructor(config: Config) {
    this.config = config;
  }

  private buildUrl(config: RequestConfig) {
    let { url, baseUrl = "" } = config;
    if (!url.startsWith("http")) {
      const index = baseUrl.lastIndexOf("/");
      if (index === baseUrl.length - 1) {
        baseUrl = baseUrl.substring(0, index);
      }
      if (!url.startsWith("/")) {
        url = `/${url}`;
      }
      url = `${baseUrl}${url}`;
    }
    return url;
  }

  sendRequest(config: RequestConfig) {
    return new Promise((resolve, reject) => {
      uni.request({
        ...config,
        url: this.buildUrl(config),
        success(result) {
          resolve(result);
        },
        fail(result) {
          reject(result);
        },
      });
    });
  }

  request<T = any>(options: RequestConfig) {
    const chain: Array<InterceptorItem> = [];
    this.interceptors.request.forEach((item) => {
      chain.push(item);
    });
    chain.push({
      resolve: this.sendRequest.bind(this),
    });
    this.interceptors.respond.forEach((item) => {
      chain.push(item);
    });
    const config = {
      ...this.config,
      ...options,
    };

    let p = Promise.resolve(config);
    while (chain.length) {
      const item = chain.shift() as InterceptorItem;
      p = p.then(item.resolve, item?.reject);
    }
    return p as Promise<T>;
  }

  get<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>({
      url,
      data,
      method: "GET",
    });
  }

  post<T = any>(url: string, data?: Record<string, any>) {
    return this.request<T>({
      url,
      data,
      method: "POST",
    });
  }
}

export default Axios;
