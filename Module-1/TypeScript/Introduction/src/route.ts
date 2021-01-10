import { Request, Response } from "express";
import createUser from './services/CreateUser';
export function helloWorld(req: Request, res: Response) { // req => Vai ser do tipo Request e Res => Response
  const user = createUser({
    email: 'thiago.rodrigues@gmail.com',
    password: 'Rapaz123@1',
    techs: ['Node.js', 'ReactJs', 'React Native',
      { title: 'Javascript', experience: 3 }
    ]
  });
  return res.json({ statusUser: user });
}