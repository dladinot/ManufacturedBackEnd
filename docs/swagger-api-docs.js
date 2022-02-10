
/**
 *  @swagger
 *  /stats:
 *  get:
 *    description: Returns stats for manufactured GraphQL endpoint
 *    responses:
 *      200:
 *        description: Success
 *        examples:
 *          application/json: 
 *              {
 *                 "messages": 88,
 *                 "queries": 5,
 *                 "responseTimes":    {
 *                    "min": 18068,
 *                    "avg": 88229.94736842105,
 *                    "max": 134014
 *                 },
 *                 "characters":    {
 *                    "min": 19,
 *                    "avg": 98.95454545454545,
 *                    "max": 139
 *                 },
 *                 "words":    {
 *                    "min": 3,
 *                    "avg": 18.670454545454547,
 *                    "max": 29
 *                 },
 *                 "numbers":    {
 *                    "min": 0,
 *                    "avg": 1.3522727272727273,
 *                    "max": 15
 *                 },
 *                 "emojies":    {
 *                    "min": 0,
 *                    "avg": 0.13636363636363635,
 *                    "max": 3
 *                 },
 *                 "verbs":    {
 *                    "min": 0,
 *                    "avg": 3.215909090909091,
 *                    "max": 7
 *                 },
 *                 "nouns":    {
 *                    "min": 1,
 *                    "avg": 5.931818181818182,
 *                    "max": 11
 *                 }
 *              }
 *      500:
 *        description: Error in backend, getChannelStats
 *        examples:
 *          application/json: 
 *              {"error": {
 *                  "status": 500,
 *                  "message": "Error in getChannelStats"
 *              }}
 *      503:
 *        description: Error loading dataset from GraphQL
 *        examples:
 *          application/json: 
 *              {"error": {
 *                  "status": 503,
 *                  "message": "Unexpected error in getChannelDataset"
 *              }}
 * 
 */