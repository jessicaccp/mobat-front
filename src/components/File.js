export default class File {
  constructor(file) {
    this.file = file;
  }

  setFile(file) {
    this.file = file;
  }

  getFile() {
    return this.file;
  }

  eraseFile() {
    this.file = null;
  }
}
