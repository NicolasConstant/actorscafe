import { User } from "../models/User";

export const toAcctString = (user: User) => user.host ? `@${user.name}@${user.host}` : `@${user.name}`;