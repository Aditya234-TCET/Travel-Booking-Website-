const express = require('express');
const router = express.Router();

router.post('/generate', (req, res) => {
  const { destination, days = 4, budget = 50000, style = 'Balanced' } = req.body;

  if (!destination) {
    return res.status(400).json({ message: 'Destination is required for AI Trip Generation' });
  }

  const durationNum = parseInt(days) || 4;

  const itineraryDays = [];
  for (let i = 1; i <= durationNum; i++) {
    let title = '';
    let morning = '';
    let afternoon = '';
    let evening = '';
    let cost = Math.round((budget / durationNum) * (0.8 + Math.random() * 0.4));

    if (i === 1) {
      title = `Arrival & Exploring Local Vibes in ${destination}`;
      morning = `Airport pickup & hotel check-in at luxury partner hotel in ${destination}.`;
      afternoon = `Traditional welcome lunch followed by guided city orientation walk.`;
      evening = `Sunset views from famous city lookout & local street food tasting.`;
    } else if (i === durationNum) {
      title = `Souvenir Shopping & Farewell Dinner`;
      morning = `Leisurely breakfast & visit local artisan markets for handcrafted gifts.`;
      afternoon = `Spa treatment or light sightseeing around heritage district.`;
      evening = `Grand farewell dinner cruise with local cultural performance.`;
    } else if (i % 2 === 0) {
      title = `Adventure & Iconic Landmark Tour`;
      morning = `Early morning excursion to top rated nature reserve / historical monument.`;
      afternoon = `Outdoor action sports (Scuba, Hiking, Cable Car Ride).`;
      evening = `Fine dining dinner at a top Michelin-starred or beachfront restaurant.`;
    } else {
      title = `Cultural Immersion & Hidden Gems`;
      morning = `Visit to famous art museum, old town quarter, and sacred temples.`;
      afternoon = `Cooking masterclass with local chef or vineyard tour.`;
      evening = `Chill out at vibrant nightlife hub or rooftop lounge.`;
    }

    itineraryDays.push({
      day: i,
      title,
      morning,
      afternoon,
      evening,
      estimatedCost: cost
    });
  }

  return res.status(200).json({
    destination,
    days: durationNum,
    budget,
    style,
    totalEstimatedCost: itineraryDays.reduce((acc, d) => acc + d.estimatedCost, 0),
    recommendedFlight: `SkyWays Direct to ${destination} (Avg. ₹12,500)`,
    recommendedHotel: `Grand Heritage Resort ${destination} (4.9 ★)`,
    itinerary: itineraryDays
  });
});

module.exports = router;
