import * as dotenv from 'dotenv';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getMongooseConfig() {
    return `mongodb://${this.getValue('DB_USER')}:${this.getValue(
      'DB_PASS',
    )}@${this.getValue('DB_HOST')}:${this.getValue('DB_PORT')}/${this.getValue(
      'DB_NAME',
    )}`;
  }

  public getJwtConfig() {
    return {
      secret: this.getValue('JWT_SECRET', true),
      signOptions: {
        expiresIn: this.getValue('JWT_EXPIRE_IN', false) || '60m',
      },
    };
  }

  public getSuperUser() {
    return {
      username: this.getValue('SUPERUSER_USERNAME'),
      password: this.getValue('SUPERUSER_PASSWORD'),
    };
  }

  public getMediaPath() {
    return this.getValue('MEDIA_PATH');
  }

  public getAvatarPath() {
    return this.getValue('AVATAR_PATH');
  }

  public getZarrinpalConfig() {
    return {
      merchantId: this.getValue('ZARRINPAL_MERCHANT_ID'),
      testEnv:
        this.getValue('PAYMENT_TEST_ENVIRONMENT').toLowerCase() === 'true',
    };
  }

  public getGmailAuth() {
    return {
      user: this.getValue('GMAIL_USERNAME'),
      pass: this.getValue('GMAIL_PASSWORD'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'JWT_SECRET',
  'JWT_EXPIRE_IN',
  'SUPERUSER_USERNAME',
  'SUPERUSER_PASSWORD',
  'MEDIA_PATH',
  'AVATAR_PATH',
  'ZARRINPAL_MERCHANT_ID',
  'PAYMENT_TEST_ENVIRONMENT',
  'GMAIL_USERNAME',
  'GMAIL_PASSWORD',
]);

export { configService };
