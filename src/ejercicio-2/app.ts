import * as fs from 'fs';
import {spawn} from 'child_process';

export class App {
  constructor() {}

  infoLines(fichero: string) {
    if (fs.existsSync(`src/ejercicio-2/${fichero}.txt`) == true) {
      const wc = spawn('wc', [`src/ejercicio-2/${fichero}.txt`]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        console.log(`File helloworld.txt has ${wcOutputAsArray[1]} lines`);
        console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
        console.log(`File helloworld.txt has ${wcOutputAsArray[3]} characters`);
      });
    } else {
      console.log(`No existe el ${fichero}.txt a analizar`);
    }
  }
}
