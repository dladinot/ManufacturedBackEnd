const app = require('../controllers/appController').app;
const channelStatsController = require('../controllers/channelStatsController');

app.get(
    '/stats',
    channelStatsController.getStats
);

//Health check
app.get('/ping', async (req, res) => { return res.status(200).json({ response: "Pong" }) })

module.exports = app