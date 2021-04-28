import {Nota} from "./nota";
import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Clase usuario que representa las funciones que debe realizar un usuario para trabajar con sus notas
 */
export class Usuario {
  constructor() {}

  /**
   * Añadir un fichero nota a la carpeta de un usuario
   * @param usuario Usuario que realiza la nota
   * @param titulo Titulo de la nota
   * @param cuerpo Cuerpo de la nota
   * @param color Color de la nota
   */
  addNote(usuario: string, titulo: string, cuerpo: string, color: string) {
    const nota: Nota = new Nota(titulo, cuerpo, color);
    if (fs.existsSync(`src/practica8/usuarios/${usuario}`) == false) {
      fs.mkdir(`src/practica8/usuarios/${usuario}`, (err) => {
        if (err) {
          console.log(chalk.red('Hubo un error mientras se creaba la carpeta'));
        }
      });
    }
    if (fs.existsSync(`src/practica8/usuarios/${usuario}/${titulo}.json`) == false) {
      fs.writeFile(`src/practica8/usuarios/${usuario}/${titulo}.json`, nota.toJSON(), (err) => {
        if (err) {
          console.log(chalk.red('Hubo un error mientras se escribía el fichero'));
        } else {
          console.log(chalk.green('New note added!'));
        }
      });
    } else {
      console.log(chalk.red('Note title taken!'));
    }
  }

  /**
   * Eliminar un fichero nota
   * @param usuario Usuario que tiene dicha nota
   * @param titulo Titulo de la nota
   */
  removeNote(usuario: string, titulo: string) {
    if (fs.existsSync(`src/practica8/usuarios/${usuario}/${titulo}.json`) == true) {
      fs.rm(`src/practica8/usuarios/${usuario}/${titulo}.json`, (err) => {
        if (err) {
          console.log(chalk.red('Hubo un error mientras se borraba el fichero'));
        } else {
          console.log(chalk.green('Nota removed!'));
        }
      });
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * Listar las notas de un usuario
   * @param usuario Usuario que queremos analizar
   */
  listNote(usuario: string) {
    if (fs.existsSync(`src/practica8/usuarios/${usuario}`) == true) {
      console.log('Your notes:\n');
      fs.readdirSync(`src/practica8/usuarios/${usuario}`).forEach((item) => {
        const note = fs.readFileSync(`src/practica8/usuarios/${usuario}/${item}`);
        const noteJSON = JSON.parse(note.toString());
        this.obtenerColor(`- ${noteJSON.titulo}`, noteJSON.color);
      });
    } else {
      console.log(chalk.red('User not found!'));
    }
  }

  /**
   * Leer una nota en concreto
   * @param usuario Usuario que tiene dicha nota
   * @param titulo Titulo de la nota
   */
  readNote(usuario: string, titulo: string) {
    if (fs.existsSync(`src/practica8/usuarios/${usuario}/${titulo}.json`) == true) {
      const note = fs.readFileSync(`src/practica8/usuarios/${usuario}/${titulo}.json`);
      const noteJSON = JSON.parse(note.toString());
      this.obtenerColor(`Titulo: ${noteJSON.titulo}\nCuerpo: ${noteJSON.cuerpo}`, noteJSON.color);
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * Modificar nota
   * @param usuario Usuario al que pertenece la nota que se quiere modificar
   * @param titulo Titulo de la nota que se quiere modificar
   * @param newTitulo Nuevo Titulo de la nota
   * @param newCuerpo Nuevo cuerpo de la nota
   * @param newColor Nuevo color de la nota
   */
  modifyNote(usuario: string, titulo: string, newTitulo: string, newCuerpo: string, newColor: string) {
    if (fs.existsSync(`src/practica8/usuarios/${usuario}/${titulo}.json`) == true) {
      const note = fs.readFileSync(`src/practica8/usuarios/${usuario}/${titulo}.json`);
      const noteJSON = JSON.parse(note.toString());
      const newNota: Nota = new Nota(noteJSON.titulo, noteJSON.cuerpo, noteJSON.color);
      if (newTitulo !== '' ) {
        newNota.setTitulo(newTitulo);
      }
      if (newCuerpo !== '') {
        newNota.setCuerpo(newCuerpo);
      }
      if (newColor !== '' ) {
        newNota.setColor(newColor);
      }
      fs.renameSync(`src/practica8/usuarios/${usuario}/${titulo}.json`, `src/practica8/usuarios/${usuario}/${newNota.getTitulo()}.json`);
      fs.writeFile(`src/practica8/usuarios/${usuario}/${newNota.getTitulo()}.json`, newNota.toJSON(), (err) => {
        if (err) {
          console.log(chalk.red('Hubo un error mientras se escribía el fichero'));
        } else {
          console.log(chalk.green('Note modified!'));
        }
      });
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * Obtener color
   * @param informacion Texto a poner de ese color
   * @param color Color a poner
   */
  obtenerColor(informacion: string, color: string) {
    switch (color) {
      case "red":
      case "Red":
        console.log(chalk.red.inverse(`${informacion}`));
        break;
      case "blue":
      case "Blue":
        console.log(chalk.blue.inverse(`${informacion}`));
        break;
      case "green":
      case "Green":
        console.log(chalk.green.inverse(`${informacion}`));
        break;
      case "yellow":
      case "Yellow":
        console.log(chalk.yellow.inverse(`${informacion}`));
        break;
      default:
        break;
    }
  }
}
