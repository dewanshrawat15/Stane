var twit = require('twitter');
var config = require('./config.js');
var base = new twit(config);
var params = {
    q: "", // enter usernames like @elonmusk, @narendramodi or hash tags like #hack, #hacker
    count: 12,
}
base.get('search/tweets', params, function(err, data, response){
    if(!err){
        for(let i = 0; i < data.statuses.length; i++){
            let id = {id: data.statuses[i].id_str}
            base.post('statuses/retweet', id, function(err, response){
                if(err){
                    console.log(err[0].message);
                }
                else{
                    let username = response.user.screen_name;
                    let tweetid = response.id_str;
                    console.log('Retweeted: ', `https://twitter.com/${username}/status/${tweetid}`)
                }
            });
        }
    }
    else{
        console.log(err);
    }
})