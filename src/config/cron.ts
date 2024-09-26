import cron from 'node-cron';
import { BlacklistedTokenRepository } from '../repository/BlacklistedTokenRepository';
import { SessionRepository } from '../repository/SessionRepository';

cron.schedule(process.env.BLACKLIST_CRON as string, async () => {
  await BlacklistedTokenRepository.deleteExpiredTokens();
  console.log('Expired tokens deleted');
});

cron.schedule(process.env.SESSION_CRON as string, async () => {
  await SessionRepository.deleteExpiredSessions();
  console.log('Expired sessions deleted');
});