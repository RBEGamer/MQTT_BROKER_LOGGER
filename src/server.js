var config = require('./config.json');
var nano = require('nano')(config.couch_db_url);
var mqtt = require('mqtt');
var sha256 = require('sha256');
var mqtt_client = mqtt.connect(config.mqtt_broker_url);

nano.db.create(config.db_name);
var db = nano.db.use(config.db_name);





function IsJsonString(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}


mqtt_client.on('connect', function () {
 

    for (let index = 0; index < config.mqtt_topics.length; index++) {
        const element = config.mqtt_topics[index];
        mqtt_client.subscribe(element);
    }
   
    
});

mqtt_client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    
    var tmp = {
        "topic": topic,
        "payload":IsJsonString(message.toString()),
        "timestamp":Math.round(new Date().getTime()/1000)
    };

    if(db != null){
        db.insert(tmp, sha256(JSON.stringify(tmp)), function (err, body, header) {
            if (err) {
                console.log('[insert] ', err.message);
                return;
            }
        });
    }
});


console.log("LOGGER -- STARTED");