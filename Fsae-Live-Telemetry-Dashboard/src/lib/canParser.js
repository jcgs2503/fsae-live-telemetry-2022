const data = require("../contexts/config.json");
var hexToBinary = require("hex-to-binary");

function hex2binary(hex) {
	let convertedBin = hexToBinary(hex);
	return convertedBin;
}

function reverseString(str) {
	return str.split("").reverse().join("");
}
export function canParser(id, hexString, filter = true) {
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
		let resultData = slicedData * signalFactor + offset;
		const min = e.min;
		const max = e.max;
		if (resultData > max || resultData < min) {
			resultData = null;
		}
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
