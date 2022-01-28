const data = require("../contexts/config.json");

var ConvertBase = function (num) {
	return {
		from : function (baseFrom) {
			return {
				to : function (baseTo) {
					return parseInt(num, baseFrom).toString(baseTo);
				}
			};
		}
	};
};

function hex2binary(hex){
	let modifiedHex = `1${hex}`
	let convertedBin = ConvertBase(modifiedHex).from(16).to(2);
	let slicedBin = convertedBin.slice(1,-1)
	return slicedBin

}

function canParser(id, hexString) {
	let inputData = hex2binary(hexString)
	const node = data.params.filter((e) => e.canId === id)[0];
	const signals = node.signals.map((e) => e);

	const resultName = node.name
	let signalsOutput = []
	signals.map((e) => {
		if (e.isLittleEndian) {
		} else {
<<<<<<< HEAD
			let result = inputData.slice(e.startBit, e.startBit + e.bitLength)
			// problems
			let slicedData = parseInt(result, 2)
			if(e.isSigned){
				slicedData = ~~parseInt(result, 2)
			}
			
			const signalName = e.name
			const signalFactor = e.factor
			const offset = e.offset
			const resultData = slicedData*signalFactor+offset
			if(e.sourceUnit){
				signalsOutput.push({
					name:signalName,
					data:resultData,
					sourceUnit:e.sourceUnit
				})
			}else{
				signalsOutput.push({
					name:signalName,
					data:resultData,
				})
			}

=======
>>>>>>> b423addea9c17c34be2615893b3b178b2900eabb
		}
	});
	const output = {
		canId:id,
		name:resultName,
		signals:signalsOutput
	}
	return output
}

// console.log(canParser(16, "40800000d17f0000"));
// console.log(canParser(16, "0000006303f20546"));
// console.log(canParser(18,"0d27000003de0186"))



