const ManufacturedDto = require('../domain/manufactured_dto');
const emojis = require('../utils/emojiPattern.js');
const WordPOS = require('wordpos'),wordpos = new WordPOS();

const services = {
    getChannelStats: async function () {
        const manufacturedDto = new ManufacturedDto();
        let pointer;
        let messagesNum = 0;
        let queriesNum = 0;
        let responseTimes = [];
        let stringMessagesCharacters = [];
        let messageWords = [];
        let numArray = [];
        let emojiArray = [];
        let verbsArray = [];
        let nounsArray = [];
        let splitNodeArray = {};
        try {
            let response = await manufacturedDto.getChannelDataset(pointer);
            if (response?.error){
                return response;
            }
            else{
                ++queriesNum;
                messagesNum = messagesNum + response.channel.messages.nodes.length;
                splitNodeArray = splitArrays(response.channel.messages.nodes);
                responseTimes = responseTimes.concat(calculateDateDiff(splitNodeArray.datesArray));
                stringMessagesCharacters = stringMessagesCharacters.concat(calculateCharacterAmount(splitNodeArray.stringsArray));
                messageWords = messageWords.concat(calculateWordsAmount(splitNodeArray.stringsArray));
                numArray = numArray.concat(calculateNumAmount(splitNodeArray.stringsArray));
                emojiArray = emojiArray.concat(calculateEmojisAmount(splitNodeArray.stringsArray)) ;
                verbsArray = verbsArray.concat(await calculateVerbsAmount(splitNodeArray.stringsArray));
                nounsArray = nounsArray.concat(await calculateNounsAmount(splitNodeArray.stringsArray));

                while(response.channel.messages.pageInfo.hasNextPage){
                    response = await manufacturedDto.getChannelDataset(response.channel.messages.pageInfo.endCursor);
                    ++queriesNum;
                    messagesNum = messagesNum + response.channel.messages.nodes.length;
                    splitNodeArray = splitArrays(response.channel.messages.nodes);
                    stringMessagesCharacters = stringMessagesCharacters.concat(calculateCharacterAmount(splitNodeArray.stringsArray));
                    messageWords = messageWords.concat(calculateWordsAmount(splitNodeArray.stringsArray));
                    numArray = numArray.concat(calculateNumAmount(splitNodeArray.stringsArray));
                    emojiArray = emojiArray.concat(calculateEmojisAmount(splitNodeArray.stringsArray)) ;
                    verbsArray = verbsArray.concat(await calculateVerbsAmount(splitNodeArray.stringsArray));
                    nounsArray = nounsArray.concat(await calculateNounsAmount(splitNodeArray.stringsArray));
                }

                return{
                    messages : messagesNum,
                    queries : queriesNum,
                    responseTimes: getArrayStats(responseTimes),
                    characters : getArrayStats(stringMessagesCharacters),
                    words : getArrayStats(messageWords),
                    numbers : getArrayStats(numArray),
                    emojies : getArrayStats(emojiArray),
                    verbs : getArrayStats(verbsArray),
                    nouns : getArrayStats(nounsArray)
                }       
            }            

        } catch (error) {
            console.log(error)
            return { error: { status: 500, message: "Error in getChannelStats" } }
        }    
    
    }    

}

module.exports = services;


//function that splits Nodes array into dates and strings by separated
function splitArrays(arrayOfNodes) {
    let arrayOfDates = [];
    let arrayOfMessages= [];

    for (let messageNode of arrayOfNodes) {
        arrayOfDates.push(new Date(messageNode.createdAt));    
    }

    for (let messageNode of arrayOfNodes) {
        arrayOfMessages.push(messageNode.text);    
    }

    return {
        datesArray: arrayOfDates,
        stringsArray: arrayOfMessages, 
    }
    
}
//function that calculates dates diff between two adjacent dates inside a dates array
function calculateDateDiff(datesArray) {
    return datesArray.slice(1).map(function(item, index) { return Math.abs(item - datesArray[index]) });
  }

//function that returns an array with the characters lengths of each string in an array
function calculateCharacterAmount(stringsArray) {
    return stringsArray.map(function(item) { return item.length });
  }

//function that returns an array with the amount of words found on each string in an array
function calculateWordsAmount(stringsArray) {
    return stringsArray.map(function(item) { return item.split(' ').length });
  }

//function that returns an array with the amount of numbers found on each string in an array
function calculateNumAmount(stringsArray) {
    return stringsArray.map(function(item) { 
        element = item.match(/\d+/g) ? item.match(/\d+/g) : [];
        return element.join('').length;

    });
  }  

//function that returns an array with the amount of emojis found on each string in an array
function calculateEmojisAmount(stringsArray) {
    return stringsArray.map(function(item) { 
         let emojiPattern = emojis;
         return ((item || '').match(emojiPattern) || []).length;
    });
  }   
  
//function that returns an array with the amount of verbs found, not grammatically correct
async function calculateVerbsAmount(stringsArray) {
    const verbPromises = stringsArray.map(function(item) { 
        return wordpos.getVerbs(item)
    });

    const verbsArray = Promise.all(verbPromises);
    return (await verbsArray).map(function(item){
        return item.length;
    })
  }    


//function that returns an array with the amount of nouns found, not grammatically correct
async function calculateNounsAmount(stringsArray) {
    const verbPromises = stringsArray.map(function(item) { 
        return wordpos.getNouns(item)
    });

    const verbsArray = Promise.all(verbPromises);
    return (await verbsArray).map(function(item){
        return item.length;
    })
  }    

//function that returns stats calculation for an array
function getArrayStats(array) {
    return Object.assign({  
                min: Math.min(...array), 
                avg: array.reduce((a,b) => a + b, 0) / array.length,
                max : Math.max(...array)
        } 
    )
}

