var WPAPI = require( 'wpapi' );

async function post (req , res ,next){
    if(typeof req.body.count == 'undefined')
        req.body.count = 1
    const blogs =  req.body.blogs.replace(/<[^>]*>?/gm, '').replace("\n" , "").replace(/[\r\n]/gm, ' ').split(" ").filter(function(e){return e});
    const allSites =  req.body.sites.replace(/<[^>]*>?/gm, '').replace("\n" , "").replace(/[\r\n]/gm, ' ').split(" ").filter(function(e){return e}); 
    console.time("TOTAL_TIME_IN_ONE_BLOG");
    for (let index = 1; index <= req.body.limit; index++) {
        for (let b = 0; b < blogs.length; b++) {
            let blog = blogs[b];
            if(blog.trim())
            for (let index2 = 0; index2 < allSites.length; index2++) {
                try {
                    await sleep(process.env.TIME_INTERVAL);
                    const site = allSites[index2];
                    if(site){
                        let name = site+"/?rest_route=/";
                        let updatedData = await rep(req.body.content , req.body.replaceFrom , blog);                  
                        wapiFunc(name , process.env.wp_username , process.env.wp_password , req.body.title , updatedData , blog , b , req);
                    }
                } catch (error) {
                    console.log("CATCH ERRPR" , error);
                    await sleep(process.env.TIME_INTERVAL_WP);
                }       
            }
            await sleep(process.env.TIME_INTERVAL_WP);
        }
        await sleep(process.env.TIME_INTERVAL);
    }
    console.info("All Sites Posted Successfully Please check");
    return true;
    
};

async function rep(str,replaceWhat,replaceTo){
    var re = new RegExp(replaceWhat, 'g');
    return str.replace(re,replaceTo);
}




async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function writeResponse (data){
   
    const fs = require('fs');
    fs.appendFile('./response.txt', data+"\n\n\n", function (err) {
        if (err) {
            // append failed
          } else {
            console.log(data );
          }
    })
    return data;
}


async function readResponse (){

    return new Promise(function(resolve , reject){
        const fs = require('fs');
        fs.readFile('./response.txt', 'utf8', function(err, data) {
            if(err)
            reject(err);
            else
            resolve(data);
        });
    })


}

async function wapiFunc (endpoint , username , password , title , content , blog , count , req){
            try {
                //await sleep(process.env.TIME_INTERVAL);
                var wp = new WPAPI({
                    endpoint: endpoint,
                    username: username,
                    password: password
                });
                let pr = await wp.posts().create({
                    title: title,
                    content: content,
                    status: 'publish'
                })
                await writeResponse("SUCCESS =>  "+ blog+" "+count+"  "+ new Date().toJSON().slice(0,20)+" :) "+ endpoint.replace("/?rest_route=/" , ""))
                return true;
            } catch (error) {
                console.log("FOUND_ERROR_ON -<--------------------------------------------------------------------> " , endpoint);
                console.info("BLOG_NOT_SUBMITED_ON " , endpoint , "BLOG = " , blog);
                console.log("error" , error.message)
                await writeResponse("Rejected! :( "+ blog+" "+count+" "+ new Date().toJSON().slice(0,20)+" :) "+ endpoint.replace("/?rest_route=/" , "")) 
                return false;
            }
}

module.exports = {
    post,
    readResponse
};