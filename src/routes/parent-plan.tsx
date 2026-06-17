import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parent-plan')({
  component: ParentPlan,
})

function ParentPlan() {
  return (
    <div style={{ padding: 20 }}>
      <h1>👨‍👩‍👧 Parent Sponsored Meals</h1>

      <div
        style={{
          border: '1px solid #ddd',
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h3>Monthly Healthy Meal Plan</h3>

        <p>30 Meals Per Month</p>
        <p>Nutrition Tracking</p>
        <p>Student Meal Monitoring</p>

        <h2>₹2500 / Month</h2>

        <button>Subscribe Now</button>
      </div>
    </div>
  )
}