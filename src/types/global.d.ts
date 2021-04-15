declare namespace NodeJS{
  interface Global {
    userStorage: {
      name: string;
      id: number;
      email: string;
      photo: string;
    };
  }
}