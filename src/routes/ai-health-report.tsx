import { createFileRoute } from '@tanstack/react-router'
import { aiReports } from '@/lib/data'

export const Route = createFileRoute('/ai-health-report')({
  component: AIHealthReport,
})

function AIHealthReport() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🤖 AI Health Report</h1>

      {aiReports.map((report) => (
        <div
          key={report.id}
          style={{
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 15,
            borderRadius: 10,
          }}
        >
          <h3>{report.food}</h3>
          <p>Health Score: {report.healthScore}/100</p>
          <p>Oil Usage: {report.oilUsage}</p>
          <p>Hygiene: {report.hygiene}</p>
          <p style={{ color: 'green' }}>🛡️ AI Verified</p>
        </div>
      ))}
    </div>
  )
}