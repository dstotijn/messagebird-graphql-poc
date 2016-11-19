export class Messages {
  constructor({ connector }) {
    this.connector = connector;
  }
  getMessages() {
    return this.connector.getMessages();
  }
}
export default 'Messages';
