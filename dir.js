const fs = require('fs')
let arr = [];

async function read() {
	let files =  await fs.readdirSync('./portraits');
	for(let i = 0; i < files.length; i++){
		if(!files[i].startsWith('.')){
			arr.push(files[i].slice(0, files[i].length-4))
		}
	}
	fs.writeFileSync('all.txt', arr.join('\n'))
}

read();