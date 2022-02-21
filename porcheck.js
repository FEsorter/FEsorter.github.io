const fs = require('fs')
const https = require('https')

let units = JSON.parse(fs.readFileSync('./scripts/all.json'))



async function portraitCheck(){
	let files =  await fs.readdirSync('./portraits');
	let keys = Object.keys(units)

	for (let i = 0; i < keys.length; i++){
		if(!files.includes(`${keys[i]}.png`)){
			console.log(keys[i])
		}
	}
}


async function reversePortraitCheck(){
	let files =  await fs.readdirSync('./portraits');
	for (let i = 0; i < files.length; i++){
		if(!units.hasOwnProperty(files[i].substring(0, files[i].length-4))){
			console.log(files[i])
		}
	}

}

portraitCheck()
reversePortraitCheck();
