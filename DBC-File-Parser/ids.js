const dbc = require("./config.json");
const fs = require("fs");
const ids = dbc["params"].map((e) => `0x${e["canId"].toString(16)}`);
fs.writeFileSync("./ids.json", JSON.stringify(ids));
