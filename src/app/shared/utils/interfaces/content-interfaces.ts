export interface IPostsDisplay {
  userId: number;
  postId: number;
  username: string;
  title: string;
  postContent: string;
  commentQty: number;
  pfp: string;
  comments: IComment[];
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  adresses: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bd: string;
  };
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
