declare namespace NodeJS{
  interface Global {
    userData: {
      name: string;
      id: number;
      email: string;
      photo: string;
    },
    likeStatus: {
      isLiked: boolean;
    }
  }

}