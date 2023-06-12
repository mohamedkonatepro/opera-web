import { useRouter } from 'next/router'

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1>
      Commande {id}
    </h1>
  )
}

export default OrderPage
