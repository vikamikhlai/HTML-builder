const readline = require('node:readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const fs = require('fs');
const path = require('path');
let data = '';

function writeInput(input) {
  if (input === 'exit') {
    console.log('Bye!');
    rl.close();
  } else {
    if (input) data += input  + '\n';
    fs.writeFile(path.join(__dirname, 'text.txt'), data, 'utf-8',
      (err) => {
        if (err) throw err;
      }
    );
  }
}
writeInput();
rl.question('Write some text\n', writeInput);
rl.on('line', writeInput);
rl.on('SIGINT', () => {
  console.log('Bye!');
  rl.close();
});

