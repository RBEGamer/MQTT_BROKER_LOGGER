# MQTT2DB LOGGER






## SETUP
* Download this repo
* run `npm install` in the `src` directory
* open the `config.json` file and setup the database and the broker settings

## CONFIG.json
The config of the logger is very simple. Here are the required fields to modifiy:

* `couch_db_url` this is the URL to your couch db instance (`http://127.0.0.1:5984`)
* `db_name` this is the databasename where the logged topics will be saved. The Database will be created if not exist
* `mqtt_broker_url` the url to the mqtt broker. The url must include the protocol (`mqtt://`, `mqtts://`, `ws://`, `wss://`)
* `mqtt_topics` this is an json array which contains the topics to log. You can log all topics with `["#"]` or specified topics with `["sensor1", "sensor2"]`





## RUN

After editing the `config.json` file, you can run the logger. Generate some mqtt messages and check the Database and the console output.




## TODO
* Add db user/pw
* Add mqtt auth
