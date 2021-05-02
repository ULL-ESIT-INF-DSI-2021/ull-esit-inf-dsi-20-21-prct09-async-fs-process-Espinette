import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';


/**
 * Función para controlar los cambios realizados en las notas de un usuario
 * @param usuario uduario que queremos controlar
 * @param directorio directorio donde se ubica el usuario
 */
function ejercicio3(usuario: string, directorio: string) {
  const directorioUsuario = `${directorio}/${usuario}`;
  fs.access(directorioUsuario, (err) => {
    if (err) {
      console.log(chalk.red.inverse(`\n¡ERROR! No existe el ruta "${directorioUsuario}"\n`));
    } else {
      fs.readFile(directorio, (err) => {
        if (!err) {
          console.log(`\n¡ERROR! El directorio ${directorioUsuario} es un fichero\n`);
        } else {
          fs.readdir(directorioUsuario, (err, numFiles) => {
            if (err) {
              console.log(`¡ERROR! No se ha podido leer el contenido del directorio ${directorioUsuario}`);
            } else {
              fs.watch(directorioUsuario, (evento, file) => {
                fs.readdir(directorioUsuario, (err, newNumFiles) => {
                  if (err) {
                    console.log(`¡ERROR! No se ha podido leer el contenido del directorio ${directorioUsuario} después de que pasará algo con este`);
                  } else {
                    if (evento == "rename") {
                      if (numFiles.length < newNumFiles.length) {
                        console.log(`\nNota "${file}" añadida\n`);
                      }
                      if (numFiles.length > newNumFiles.length) {
                        console.log(`\nNota "${file}" borrada\n`);
                      }

                      numFiles = newNumFiles;
                    }
                  }
                });
              });
            }
          });
        }
      });
    }
  });
}


yargs.command( {
  command: 'watch',
  describe: 'La terminal se queda congelada esperando a un cambio en el directorio del usuario',
  builder: {
    user: {
      describe: 'Nombre de usuario del usuario',
      demandOption: true,
      type: 'string',
    },
    dir: {
      describe: 'directorio donde se almacena el directorio del usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === "string" && typeof argv.dir === "string") {
      ejercicio3(argv.user, argv.dir);
    }
  },
});


yargs.argv;
