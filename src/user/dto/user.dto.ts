export class UserDTO {
  id: number;
  username: string;
  password: string;
  email: string;
  role: "user" | "admin" | undefined;
}
