const data = require("../contexts/config.json");

function canParser(id, hexString) {
	const node = data.params.filter((e) => e.canId === id)[0];
	const signals = node.signals.map((e) => e);
	signals.map((e) => {
		if (e.isLittleEndian) {
		} else {
			console.log("test");
		}
	});
}

canParser(1956, "");
