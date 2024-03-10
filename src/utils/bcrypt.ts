import bcryptjs from "bcrypt";

export const hashPassword = (plainTextPassword: string) => {
  return new Promise<any>((resolve, reject) => {
    bcryptjs
      .hash(plainTextPassword, 10)
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const compareHashedPassword = (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return new Promise<boolean>((resolve, reject) => {
    bcryptjs
      .compare(plainTextPassword, hashedPassword)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};
