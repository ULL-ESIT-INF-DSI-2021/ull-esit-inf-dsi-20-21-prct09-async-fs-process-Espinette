export class Nota {
  /**
   * Constructor de la clase nota
   * @param titulo Titulo de la nota
   * @param cuerpo Cuerpo de la nota
   * @param color Color de la nota
   */
  constructor(public titulo: string, public cuerpo: string, public color: string) {
    this.titulo = titulo;
    this.cuerpo = cuerpo;
    this.color = color;
  }

  /**
   * Funcion get para obtener el titulo de la nota
   * @returns titulo de la nota
   */
  getTitulo() {
    return this.titulo;
  }

  /**
   * Funcion set para establecer un nuevo titulo de la nota
   * @param titulo Titulo nuevo a poner
   */
  setTitulo(titulo: string) {
    this.titulo = titulo;
  }

  /**
   * Funcion get para obtener el cuerpo de la nota
   * @returns cuerpo de la nota
   */
  getCuerpo() {
    return this.cuerpo;
  }

  /**
   * Funcion set para establecer un nuevo cuerpo a la nota
   * @param cuerpo Cuerpo nuevo a poner
   */
  setCuerpo(cuerpo: string) {
    this.cuerpo = cuerpo;
  }

  /**
   * Funcion get para obtener el color de la nota
   * @returns color de la nota
   */
  getColor() {
    return this.color;
  }

  /**
   * Funcion set para establecer un nuevo color a la nota
   * @param color Color nuevo a poner
   */
  setColor(color: string) {
    this.color = color;
  }

  /**
   * Convierte una nota a formato JSON
   * @returns La nota en formato JSON
   */
  toJSON(): string {
    return '{\n\"titulo\": \"' + this.titulo + '\",\n\"cuerpo\": \"' + this.cuerpo + '\",\n\"color\": \"' + this.color + '\"\n}';
  }
}
