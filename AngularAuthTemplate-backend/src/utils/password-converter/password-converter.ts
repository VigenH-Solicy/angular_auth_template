import * as bcrypt from "bcryptjs";
const saltRounds = 10;

export const bcryptPassword = async (
  password: string
): Promise<String | Error> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (hashedPassword) {
      return hashedPassword;
    }
    return new Error("Failed to hash password");
  } catch (error: any) {
    return new Error(error.message);
  }
};

export const comparePasswords = async(dbPassword: string, userPassword: string): Promise<boolean> => {
  const passwordMatch = await bcrypt.compare(dbPassword, userPassword);
  if (!passwordMatch) {
    return false
  }
  return true
}
