import * as bcrypt from 'bcryptjs';
export async function hashFromRequest(o: any) {
  const { password } = o;
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return { ...o, password: hash };
}