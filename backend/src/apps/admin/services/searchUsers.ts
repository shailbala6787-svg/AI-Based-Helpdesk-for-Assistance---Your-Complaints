import { usersDAL } from '../../../db/dal/users.js';

export async function searchUsersService(query: string) {
  if (!query) {
    return [];
  }
  const users = await usersDAL.searchByQuery(query);
  return users.map(({ passwordHash, ...rest }) => rest);
}
