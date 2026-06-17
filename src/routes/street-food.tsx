import { createFileRoute } from '@tanstack/react-router'
import { streetVendors } from '@/lib/data'

export const Route = createFileRoute('/street-food')({
  component: StreetFood,
})

function StreetFood() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🌮 Street Food</h1>

      {streetVendors.map((vendor) => (
        <div
          key={vendor.id}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 15,
            borderRadius: 10,
          }}
        >
          <h3>{vendor.name}</h3>
          <p>{vendor.item}</p>
          <p>⭐ {vendor.rating}</p>
          <p>🧼 Hygiene: {vendor.hygiene}</p>
          <button>Order Now</button>
        </div>
      ))}
    </div>
  )
}