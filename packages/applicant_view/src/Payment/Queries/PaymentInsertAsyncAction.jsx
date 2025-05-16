import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentInsertMutation = createQueryStrLazy(
`
mutation PaymentInsertMutation($id: UUID, $amount: Float) {
  result: paymentInsert(
    payment: {id: $id, amount: $amount}
  ) {
    ... on InsertError {
      failed
      msg
      input
    }
    ...PaymentLarge
  }
}
`,
    PaymentLargeFragment)


export const PaymentInsertAsyncAction = createAsyncGraphQLAction(PaymentInsertMutation)