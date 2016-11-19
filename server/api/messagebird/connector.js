import rp from 'request-promise';

const MESSAGEBIRD_REST_API_BASE_URI = 'https://rest.messagebird.com/';

export class MessageBirdConnector {
  constructor({ accessKey } = {}) {
    this.accessKey = accessKey;
    this.rp = rp;
  }
  getMessages() {
    const options = {
      json: true,
      headers: {
        Authorization: `AccessKey ${this.accessKey}`,
      },
    };

    return new Promise((resolve, reject) => {
      this.rp({
        uri: `${MESSAGEBIRD_REST_API_BASE_URI}messages`,
        ...options,
      }).then((response) => {
        resolve(response.items);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
export default MessageBirdConnector;
