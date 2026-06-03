import { complaintsDAL } from '../../../db/dal/complaints.js';
import { complaintEmbeddingsDAL } from '../../../db/dal/complaintEmbeddings.js';
import { usersDAL } from '../../../db/dal/users.js';
import { generateEmbedding } from '../../../utils/openai.js';

export async function searchService(userId: number, query: string, ai: boolean) {
  if (!ai) {
    return complaintsDAL.keywordSearch(query);
  }

  const user = await usersDAL.findById(userId);
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  if (user.searchesUsed >= user.searchLimit) {
    throw {
      status: 403,
      message: `AI search limit reached (${user.searchLimit}). Contact admin to increase your limit`,
    };
  }

  const queryEmbedding = await generateEmbedding(query);
  const results = await complaintEmbeddingsDAL.semanticSearch(queryEmbedding);

  await usersDAL.incrementSearchesUsed(userId);

  return results;
}
