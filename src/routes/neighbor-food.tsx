import { createFileRoute } from '@tanstack/react-router'
import { neighborKitchens } from '@/lib/data'

export const Route = createFileRoute('/neighbor-food')({
  component: NeighborFood,
})

function NeighborFood() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Neighbor Food</h1>
      <p>Order homemade food from nearby homes.</p>

      {neighborKitchens.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 15,
            borderRadius: 10,
          }}
        >
          <h3>{item.name}</h3>
          <p>{item.food}</p>
          <p>₹{item.price}</p>
          <p>⭐ {item.rating}</p>
          <p>📍 {item.distance}</p>

          {item.verified && (
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              🛡️ AI Verified
            </p>
          )}

          <button>Order Now</button>
        </div>
      ))}
    </div>
  )
}