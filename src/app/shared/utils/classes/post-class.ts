export class Post {
  userId: number = 0;
  title: string = '';
  body: string = '';
}

export class User {
  id: number = 0;
  name: string = '';
  username: string = '';
  email: string = '';
  adresses: {
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
