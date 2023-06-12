import { useRouter } from 'next/router'

const AppointmentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1>
      RDV {id}
    </h1>
  )
}

export default AppointmentPage
