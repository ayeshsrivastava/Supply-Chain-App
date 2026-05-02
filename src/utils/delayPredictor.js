export function predictDelay(distance, weather, carrier) {
  let score = 0

  // Distance impact
  if (distance > 1000) score += 3
  else if (distance > 500) score += 2
  else score += 1

  // Weather impact (NEW OBJECT FORMAT)
  if (weather) {
    if (weather.rain > 0) score += 3
    if (weather.wind > 20) score += 2
    if (weather.temperature > 35) score += 1
  }

  // Carrier impact
  if (carrier === 'India Post') score += 2
  if (carrier === 'DTDC') score += 1

  // Normalize score (0–10)
  score = Math.min(score, 10)

  let riskLevel = 'low'
  let riskLabel = 'Low Risk'

  if (score >= 7) {
    riskLevel = 'high'
    riskLabel = 'High Risk'
  } else if (score >= 4) {
    riskLevel = 'medium'
    riskLabel = 'Medium Risk'
  }

  return {
    score,
    riskLevel,
    riskLabel
  }
}