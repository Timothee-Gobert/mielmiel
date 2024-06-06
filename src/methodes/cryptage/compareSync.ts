import { compareSync } from "bcryptjs";

export default function comparerSync(s: string, h: string): boolean | any {
  try {
    return compareSync(s, h);
  } catch (error: any) {
    // console.log(error.message);
  }
}
