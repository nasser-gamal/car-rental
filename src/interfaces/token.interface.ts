import { TokenType } from 'src/enums/token-type.enum';
import { User } from '../entities/index';
import moment from 'moment';

export interface TokenData {
  refreshToken: string;
  refreshTokenExpires: moment.Moment;
  type: TokenType;
  payload: Record<string, unknown>;
}

export interface DataStoredInToken {
  id: number;
}
