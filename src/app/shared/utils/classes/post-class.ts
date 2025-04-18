import { IComment } from '../interfaces/content-interfaces';

export class Post {
  userId: number = 0;
  title: string = '';
  body: string = '';
}

export class User {
  pfp?: string = '';
  id: number = 0;
  name: string = '';
  username: string = '';
  email: string = '';
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } = {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  };
  phone: string = '';
  website: string = '';
  company: {
    name: string;
    catchPhrase: string;
    bd: string;
  } = {
    name: '',
    catchPhrase: '',
    bd: '',
  };
}

export class PostsDisplay {
  userId: number = 0;
  postId: number = 0;
  username: string = '';
  title: string = '';
  postContent: string = '';
  commentQty: number = 0;
  pfp: string = '';
  comments: IComment[] = [];
}
