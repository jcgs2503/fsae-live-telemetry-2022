const dbcToJson = require("@viriciti/dbc-to-json");
const fs = require("fs");

const dbcstring = fs.readFileSync("./can-configuration/config.dbc", "UTF-8");
const json = dbcToJson(dbcstring);
fs.writeFileSync("./config.json", JSON.stringify(json));
