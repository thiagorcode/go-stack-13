/**
 * Para criar: name, email, password
 */


/*export default function createUser(name = '', email: string, password: string) {
  const user = {
    name,
    email,
    password,
  }
  return user;
}*/
interface TechObject {
  title: string,
  experience: number
}
/**
 * Para Array quando o array for string
 * techs: string[], => Quando for simples.
 * techs: Array<string | TechObject>
 */
interface CreateUserData {
  name?: string,
  email: string,
  password: string,
  techs: Array<string | TechObject>
}

export default function createUser({ name = '', email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password,
  }
  return user;
}