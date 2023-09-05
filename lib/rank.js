export function orderPrizesByWeightedVotes (userVotes, prizeMapping) {
  // Create an object to store the total weighted votes for each prize
  const prizeVotes = {}

  // Iterate over each user and their vote weight
  for (const [username, weight] of userVotes.entries()) {
    const prize = prizeMapping[username]
    if (prize) {
      // Add the weighted vote to the total for the corresponding prize
      prizeVotes[prize] = (prizeVotes[prize] || 0) + weight
    }
  }

  // Convert the object into an array of [prize, totalWeight] pairs
  const prizeTotalPairs = Object.entries(prizeVotes)

  // Sort the pairs by total weighted votes in descending order
  prizeTotalPairs.sort((a, b) => b[1] - a[1])

  // Extract only the prize names from the sorted pairs
  const sortedPrizes = prizeTotalPairs.map(pair => pair[0])

  return sortedPrizes
}
