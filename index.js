const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const obfuscateOptions = {
	compact: false,
	controlFlowFlattening: true,
	controlFlowFlatteningThreshold: 1,
	numbersToExpressions: true,
	simplify: true,
	stringArrayShuffle: true,
	splitStrings: true,
	stringArrayThreshold: 1,
	sourceMap: true,
};

// shuffle and overwrite the file
const obfuscateAFile = (filePath) => {
	const obfuscatedContent = fs.readFileSync(filePath, "utf8");
	const obfuscationResult = JavaScriptObfuscator.obfuscate(obfuscatedContent, obfuscateOptions);
	fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), "utf8");
};

// Function to traverse the directory and obfuscate the files.js
const obfuscateADirectory = async (dirPath) => {
	try {
		const files = fs.readdirSync(dirPath);
		files.forEach((file) => {
			if (exceptListName.includes(file)) return console.log("RETURN", file);
			const filePath = path.join(dirPath, file);
			const stats = fs.statSync(filePath);
			if (stats.isDirectory()) {
				obfuscateADirectory(filePath);
			} else if (stats.isFile() && file.endsWith(".js")) {
				try {
					console.log(file, stats.isDirectory(), stats.isFile());
					obfuscateAFile(filePath);
				} catch (error) {
					console.error(`Error decrypting file ${filePath}:`, error);
				}
			}
		});
	} catch (error) {
		console.error(error);
	}
};

async function startObfuscate(src, dest) {
	try {
		dest = dest ? dest : src + versionName;

		await fs.mkdirSync(dest, { recursive: true });
		await fs.cpSync(src, dest, { recursive: true, force: true });
		await obfuscateADirectory(dest);
	} catch (error) {
		console.error("Error copping occurred:", error);
	}
}

// Path to the directory containing your project
// const sourceDirectory = "C:\\Users\\BOSS\\Documents\\Node_Encrypt";
const sourceDirectory = "C:/Users/BOSS/Documents/Node_Encrypt/ahihi";
const exceptListName = ["node_modules"];
const versionName = "_Release_" + "1.0.0";

startObfuscate(sourceDirectory);
