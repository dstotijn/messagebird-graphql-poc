export const schema = [`
type Message {
  id: String!
  href: String!
  direction: String!
  type: String!
  originator: String!
  body: String!
  reference: String
  validity: Int
  gateway: Int
  datacoding: String
  mclass: Int
}
`];

export const resolvers = {
};
