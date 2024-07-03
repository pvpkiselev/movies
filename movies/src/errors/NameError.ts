export class NameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NameError';
  }
}
