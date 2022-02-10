const channelStatsService = require('../services/ChannelStatsService.js');

const controller = {
    getStats: async (req, res) => {       
      const response = await channelStatsService.getChannelStats();

      if (response?.error) {
          return res.status(response.error.status).json(response)
      }
      return res.json(response)
          
          
    }

};

module.exports = controller;