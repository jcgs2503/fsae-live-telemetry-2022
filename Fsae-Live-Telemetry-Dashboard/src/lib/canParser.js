const data = require("../contexts/config.json");
var hexToBinary = require("hex-to-binary");

function hex2binary(hex) {
	let convertedBin = hexToBinary(hex);
	return convertedBin;
}

function reverseString(str) {
	return str.split("").reverse().join("");
}

export function canParser(id, hexString) {
	let inputData = hex2binary(hexString);
	const node = data.params.filter((e) => e.canId === id)[0];
	const signals = node.signals.map((e) => e);

	const resultName = node.name;
	let signalsOutput = [];
	let result;
	let start;
	signals.map((e) => {
		if (e.isLittleEndian) {
			let count = Math.floor(e.bitLength / 8);
			result = "";
			start = e.startBit + e.bitLength;
			while (count) {
				result = result.concat("", inputData.slice(start - 7, start + 1));
				start -= 8;
				count -= 1;
			}
			const left = e.bitLength % 8;
			result = result.concat("", inputData.slice(start - 7, start - 7 + left));
		} else {
			let count = Math.floor(e.bitLength / 8);
			result = "";
			start = e.startBit;
			while (count) {
				result = result.concat("", inputData.slice(start - 7, start + 1));
				start += 8;
				count -= 1;
			}
			const left = e.bitLength % 8;
			result = result.concat("", inputData.slice(start - 7, start - 7 + left));
		}
		let slicedData = parseInt(result, 2);

		const signalName = e.name;
		const signalFactor = e.factor;
		const offset = e.offset;
		const resultData = slicedData * signalFactor + offset;
		if (e.sourceUnit) {
			signalsOutput.push({
				name: signalName,
				data: resultData,
				sourceUnit: e.sourceUnit,
			});
		} else {
			signalsOutput.push({
				name: signalName,
				data: resultData,
			});
		}
	});
	const output = {
		canId: id,
		name: resultName,
		signals: signalsOutput,
	};
	return output;
}

// console.log(canParser(16, "40800000d17f0000"));
// console.log(canParser(16, "0000006303f20546"));
console.log(canParser(18, "0d27000003de0186"));
// console.log(canParser(17, "d20000d200e600dc"));
