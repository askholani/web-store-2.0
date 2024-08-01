// DataComponent.js
import { useLoaderData } from 'react-router-dom'

export function DataComponentCoba() {
  const data = useLoaderData()
  console.log('data', data)

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
