import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { PaymentLargeFragment } from "./PaymentFragments";

const PaymentUpdateMutation = createQueryStrLazy(
`
mutation PaymentUpdateMutation($id: UUID!, $amount: Float, $lastchange: DateTime!) {
  result: paymentUpdate(
    payment: {id: $id, amount: $amount, lastchange: $lastchange}
  ) {
    ... on PaymentGQLModelUpdateError {
      failed
      msg
      input
      Entity {
        ...PaymentLarge
      }      
    }
    ...PaymentLarge
  }
}
`, PaymentLargeFragment)

export const PaymentUpdateAsyncAction = createAsyncGraphQLAction(PaymentUpdateMutation)