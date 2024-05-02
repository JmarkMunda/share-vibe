import { Session } from "next-auth";

export interface INavLinks {
  session: Session | null;
}
