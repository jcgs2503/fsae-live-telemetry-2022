const data = require("../contexts/config.json");
var hexToBinary = require("hex-to-binary");

export function canParser(id, hexstring, timestamp) {
	const node = data.params.filter((e) => e.canId === id)[0];
	if (node) {
		const rawSignals = node.signals.map((e) => e);
		let signals = [];
		const resultName = node.name;
		const bitData = hexToBinary(hexstring);
		let signalsOutput = [];

		signals = rawSignals.filter(
			(e) => e.name != "Engine_Running" && e.name != "Engine_Cranking"
		);
		let ecr = rawSignals.filter(
			(e) => e.name == "Engine_Running" || e.name == "Engine_Cranking"
		);
		signals = [...signals, ...ecr];

		signals.map((e) => {
			let startByteNum = Math.floor(e.startBit / 8);
			let endByteNum = Math.floor((startByteNum * 8 - 1 + e.bitLength) / 8);
			let bitOutput = "";
			if (e.isLittleEndian) {
				if (e.bitLength % 8 == 0) {
					while (endByteNum >= startByteNum) {
						if (endByteNum >= 8) {
							endByteNum -= 1;
						} else {
							bitOutput =
								bitOutput + bitData.slice(endByteNum * 8, endByteNum * 8 + 8);
							endByteNum -= 1;
						}
					}
				} else {
					let endBit = startByteNum * 8 + 8;
					endBit -= e.startBit % 8;
					let startBit = endBit - e.bitLength;
					bitOutput = bitOutput + bitData.slice(startBit, endBit);
				}
			} else {
				if (e.bitLength % 8 == 0) {
					while (startByteNum <= endByteNum) {
						bitOutput =
							bitOutput + bitData.slice(startByteNum * 8, startByteNum * 8 + 8);
						startByteNum += 1;
					}
				} else {
					let endBit = startByteNum * 8 + 8;
					endBit -= e.startBit % 8;
					let startBit = endBit - e.bitLength;
					bitOutput = bitOutput + bitData.slice(startBit, endBit);
				}
			}

			let decimalOutput;
			if (e.isSigned) {
				decimalOutput = SignedDecoder(bitOutput);
			} else {
				decimalOutput = parseInt(bitOutput, 2);
			}
			const signalName = e.name;
			const signalFactor = e.factor;
			const offset = e.offset;
			let resultData = decimalOutput * signalFactor + offset;

			if (e.name == "Engine_Running") {
				resultData =
					signalsOutput.filter((e) => e.name == "nmot")[0].data > 0 ? 1 : 0;
			}

			if (e.name == "Engine_Cranking") {
				resultData =
					signalsOutput.filter((e) => e.name == "nmot")[0].data >= 0 &&
					signalsOutput.filter((e) => e.name == "nmot")[0].data <= 1000
						? 1
						: 0;
			}
			if (e.sourceUnit) {
				signalsOutput.push({
					name: signalName,
					data: resultData,
					sourceUnit: e.sourceUnit,
					timestamp: timestamp,
				});
			} else {
				signalsOutput.push({
					name: signalName,
					data: resultData,
					timestamp: timestamp,
				});
			}
		});
		const output = {
			canId: id,
			name: resultName,
			signals: signalsOutput,
		};

		return output;
	} else {
		const output = {
			canId: id,
			name: "",
			signals: [],
		};
		return;
	}
}

function SignedDecoder(binary) {
	if (binary[0] == 0) {
		return parseInt(binary, 2);
	} else {
		let pos = binary.slice(1);
		pos = parseInt(pos, 2);
		let pow = binary.length - 1;
		let neg = Math.pow(2, pow);
		return pos - neg;
	}
}

// console.log(canParser(32, "ef7f00001e800f8c", 0));
// console.log(SignedDecoder(01101111));
