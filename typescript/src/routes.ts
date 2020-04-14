import {Request, Response} from 'express';
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
  const user= createUser({
    name: 'Marcelo', 
    email:'contato+insc@marceloratton.com', 
    password:'123456',
    techs: ['Nodejs', 'Reactjs', 'React Native', {title: 'PHP', experience: 100}]
  });

  return res.json({message: 'Hello World', user});
}