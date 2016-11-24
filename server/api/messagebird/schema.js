export const schema = [`
type Message {
  id: ID
  href: String
  direction: String
  type: String
  originator: String!
  body: String!
  reference: String
  validity: Int
  gateway: Int
  typeDetails: TypeDetails
  datacoding: String
  mclass: Int
  scheduledDatetime: String
  createdDatetime: String
  recipients: Recipients
}

type TypeDetails {
  udh: String
  keyword: String
  shortcode: Int
  tariff: Int
  member: Boolean
  mid: ID
}

type Recipients {
  totalCount: Int
  totalSentCount: Int
  totalDeliveredCount: Int
  totalDeliveryFailedCount: Int
  items: [Recipient]
}

type Recipient {
  recipient: String
  status: String
  statusDatetime: String
}
`];
export default 'schema';
