export type GetUserToken = {
  access_token: string;
  secret: string;
  region: string;
};

// This mocks the http service to the hosting app's server
export class HTTPService {
  private static sharedInstance?: HTTPService;

  static get shared(): HTTPService {
    if (!this.sharedInstance) {
      this.sharedInstance = new HTTPService();
    }
    return this.sharedInstance;
  }

  async getUserToken(): Promise<GetUserToken> {
    // this is where you contact you server to get the GetUserToken
    // Your server should generate the token using the following api
    // https://developers.bringg.com/reference#generate-customer-one-time-codets
    throw new Error('HTTPService.getUserToken not implemented');
  }

  async getActiveTaskId(): Promise<number> {
    // The task id for the active customer should be fetched from your server
    throw new Error('HTTPService.getActiveTaskId not implemented');
  }
}
