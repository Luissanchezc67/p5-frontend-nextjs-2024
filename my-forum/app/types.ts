// types.ts
export interface User {
    userId: number;
    name: string;
    age: string;
  }
  
  export interface Comment {
    commentId: number;
    content: string;
    date: string;
    user: User;
  }
  