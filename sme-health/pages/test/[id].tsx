import { useRouter } from 'next/router'

export default function TestId() {
  const router = useRouter()
  const { id } = router.query
    return (
      <div>
          TEST {id}
      </div>
    )
  }
  