import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

/**
 * Clase cuyo objteivo es ser una APP que proporcione la información sobre el numero de lineas, palabras o caracteres de un fichero
 */
export class App2 {
  /**
   * Constructor vacío de la clase
   */
  constructor() {}

  /**
   * Funcion para obtener la información del fichero sin usar el método Pipe
   * @param fichero nombre del fichero
   * @param lineas string que en caso de ser "yes" te muestra el numero de lineas
   * @param palabras string que en caso de ser "yes" te muestra el numero de palabras
   * @param caracteres string que en caso de ser "yes" te muestra el numero de palabras
   * La funcion no retorna nada ya que lo muestra por pantalla;
   */
  infoFileSinPipes(fichero: string, lineas: string, palabras: string, caracteres: string) {
    if (fs.existsSync(`${fichero}`) == true) {
      const wc = spawn('wc', [`${fichero}`]);
      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        const numLineas = parseInt(wcOutputAsArray[1], 10) + 1;
        console.log(`File ${fichero} has:`);
        if (lineas == `yes`) {
          console.log(`${numLineas} lines`);
        }
        if (palabras == `yes`) {
          console.log(`${wcOutputAsArray[2]} words`);
        }
        if (caracteres == `yes`) {
          console.log(`${wcOutputAsArray[3]} characters`);
        }
      });
    } else {
      console.log(`No existe el ${fichero} a analizar`);
    }
  }

  /**
   * Funcion para obtener la información del fichero haciendo uso del método Pipe
   * @param fichero nombre del fichero
   * @param lineas string que en caso de ser "yes" te muestra el numero de lineas
   * @param palabras string que en caso de ser "yes" te muestra el numero de palabras
   * @param caracteres string que en caso de ser "yes" te muestra el numero de palabras
   * La funcion no retorna nada ya que lo muestra por pantalla;
   */
  infoFileConPipes(fichero: string, lineas: string, palabras: string, caracteres: string) {
    if (fs.existsSync(`${fichero}`) == true) {
      const wc = spawn('wc', [`${fichero}`]);
      const echo = spawn('echo', [`\nFile ${fichero} has`]);
      echo.stdout.pipe(process.stdout);

      let wcOutput = '';
      wc.stdout.on('data', (piece) => wcOutput += piece);
      wc.on('close', () => {
        const wcOutputAsArray = wcOutput.split(/\s+/);
        const numLineas = parseInt(wcOutputAsArray[1], 10) + 1;
        if (lineas == `yes`) {
          const echo = spawn('echo', [`\n${numLineas} lines`]);
          echo.stdout.pipe(process.stdout);
        }
        if (palabras == `yes`) {
          const echo = spawn('echo', [`\n${wcOutputAsArray[2]} words`]);
          echo.stdout.pipe(process.stdout);
        }
        if (caracteres == `yes`) {
          const echo = spawn('echo', [`\n${wcOutputAsArray[3]} characters`]);
          echo.stdout.pipe(process.stdout);
        }
      });
    } else {
      console.log(`No existe el ${fichero} a analizar`);
    }
  }
}

const prueba: App2 = new App2();

yargs.command({
  command: 'infoFile',
  describe: 'Information of lines, word and characteres',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Metodo Pipe',
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
      if (argv.pipe == 'yes') {
        prueba.infoFileConPipes(argv.name, argv.lineas, argv.palabras, argv.caracteres);
      } else {
        prueba.infoFileSinPipes(argv.name, argv.lineas, argv.palabras, argv.caracteres);
      }
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.argv;

