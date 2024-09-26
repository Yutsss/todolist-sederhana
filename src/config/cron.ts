import cron from 'node-cron';
import { BlacklistedTokenRepository } from '../repository/BlacklistedTokenRepository';

cron.schedule('1 * * * *', async () => {
  await BlacklistedTokenRepository.deleteExpiredTokens();
  console.log('Expired tokens deleted');
});