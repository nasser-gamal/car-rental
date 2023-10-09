import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';
import * as moment from 'moment';
import config from '../config/config';
import { TokenType } from '../enums/token-type.enum';
import { TokenData } from '../interfaces/token.interface';
import { AppDataSource } from '../config/database';
import { Token } from '../entities';
import { FindOptionsWhere } from 'typeorm';
import { NotFoundError } from './apiError';

export class Jwt {
  private readonly tokenRepository = AppDataSource.getRepository(Token);

  private createToken(
    userId: Record<string, unknown>,
    expiresIn: moment.Moment,
    type: TokenType,
    secret: Secret
  ): string {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expiresIn.unix(),
      type,
    };
    return sign(payload, secret);
  }

  private async saveToken({
    refreshToken,
    refreshTokenExpires,
    type,
    payload,
  }: TokenData) {
    const tokenDoc = this.tokenRepository.create({
      token: refreshToken,
      expiresIn: refreshTokenExpires.toString(),
      type,
      user: payload,
    });
    return await this.tokenRepository.save(tokenDoc);
  }

  public verifyToken(token: string, secret: Secret): JwtPayload {
    return verify(token, secret) as JwtPayload;
  }

  public async generateAuthTokens(payload: Record<string, unknown>) {
    const accessTokenExpires = moment().add(config.jwt.expires_in, 'minutes');
    const refreshTokenExpires = moment().add(
      config.jwt.refresh_expires_in,
      'days'
    );

    // create access token
    const accessToken = this.createToken(
      payload,
      accessTokenExpires,
      TokenType.ACCESS,
      config.jwt.secret
    );

    // // create refresh token
    const refreshToken = this.createToken(
      payload,
      refreshTokenExpires,
      TokenType.REFRESH,
      config.jwt.refresh_secret
    );

    await this.saveToken({
      refreshToken,
      refreshTokenExpires,
      type: TokenType.REFRESH,
      payload,
    });

    return { accessToken, refreshToken };
  }

  public async removeToken(token: string) {
    const refreshToken = await this.tokenRepository.findOne({
      where: { token, type: TokenType.REFRESH },
    });
    if (!refreshToken) throw new NotFoundError('not found');
    await this.tokenRepository.remove(refreshToken);
  }
}
