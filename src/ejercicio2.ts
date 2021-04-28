import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

export class App {
  constructor() {}

  infoFileSinPipes(fichero: string, lineas: string, palabras: string, caracteres: string) {
    if (fs.existsSync(`${fichero}.txt`) == true) {
      const wc = spawn('wc', [`${fichero}.txt`]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        const numLineas = parseInt(wcOutputAsArray[1], 10) + 1;
        if (lineas == `yes`) {
          console.log(`File ${fichero}.txt has ${numLineas} lines`);
        }
        if (palabras == `yes`) {
          console.log(`File ${fichero}.txt has ${wcOutputAsArray[2]} words`);
        }
        if (caracteres == `yes`) {
          console.log(`File ${fichero}.txt has ${wcOutputAsArray[3]} characters`);
        }
      });
    } else {
      console.log(`No existe el ${fichero}.txt a analizar`);
    }
  }

  infoFileConPipes(fichero: string, lineas: string, palabras: string, caracteres: string) {
    if (fs.existsSync(`${fichero}.txt`) == true) {
      const wc = spawn('wc', [`${fichero}.txt`]);
      wc.stdout.pipe(process.stdout);
    } else {
      console.log(`No existe el ${fichero}.txt a analizar`);
    }
  }
}

const prueba: App = new App();

yargs.command({
  command: 'infoFile',
  describe: 'Information of lines, word and characteres',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
    lineas: {
      describe: 'Lineas del fichero ',
      demandOption: true,
      type: 'string',
    },
    palabras: {
      describe: 'Palabras del fichero',
      demandOption: true,
      type: 'string',
    },
    caracteres: {
      describe: 'Caracteres del fichero',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' && typeof argv.lineas === 'string' && typeof argv.palabras === 'string' && typeof argv.caracteres === 'string') {
      prueba.infoFileConPipes(argv.name, argv.lineas, argv.palabras, argv.caracteres);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.argv;

