import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  accessSecretKey: process.env.ACCESS_SECRET_KEY,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY,
  recoverySecretKey: process.env.RECOVERY_SECRET_KEY,
  sentrySampleRate: process.env.SENTRY_SAMPLE_RATE,
  sentryDSN: process.env.SENTRY_DSN,
  env: process.env.NODE_ENV || 'dev',
}));
