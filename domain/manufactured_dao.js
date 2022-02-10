const { request, gql } = require('graphql-request')
const endpoint = process.env.GRAPHQL_ENDPOINT
const requestHeaders = {
    authorization: process.env.AUTH
} 

const manufacturedDao = {
    getChannelDataset: async (pointer) => {
        let query = gql`
        query Channel($channelId: ID!, $input: ChannelMessagesInput) {
            channel(channelId: $channelId) {
              messages(input: $input) {
                nodes {
                  text
                  createdAt
                }
                pageInfo {
                  hasNextPage
                  startCursor
                  endCursor
                }
              }
            }
          }
        ` 
        let variables = {
            "channelId": "cky902c9f317160fml1bja26yy",
            "input": {
              "page": {
                "first": 20,
                "last": null,
                "offset": null,
                "after": pointer
              }
            }
          } 
     
        try {
            return await request(endpoint, query, variables, requestHeaders);

        } catch (error) {
            console.error(JSON.stringify(error, undefined, 2))
            return { error: { message: "Unexpected error in getChannelDataset ", status: 503 } };
        }
    },    
};

module.exports = manufacturedDao;