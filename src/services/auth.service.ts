import { BadRequestError, NotFoundError } from '../utils/apiError';
import { User } from '../entities/index';
import { SigninDto, SignupDto } from '../interfaces/auth.interface';
import { AppDataSource } from '../config/database';
import { Jwt } from '../utils/jwt';
import { MailMangement } from '../utils/mails';
import { generateCode, hash } from '../utils/generateCode';
import { MoreThan } from 'typeorm';

class AuthService {
  private readonly mails = new MailMangement();
  private readonly userRepository = AppDataSource.getRepository(User);

  /**
   * Checks if an email is already taken by querying the database using the `userRepository` and the provided email.
   * @param email - The email to check if it is taken.
   * @returns {Promise<User | undefined>} The user object if the email is taken, otherwise undefined.
   */
  private async isEmailTaken(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  /**
   * Checks if an email is already taken by querying the database using the `userRepository` and the provided email and optional id.
   * @param signupDto The data for signup.
   * @throws {BadRequestError} if the email is already taken.
   * @returns {Promise<User>} The  created user object.
   */
  public async signup(signupDto: SignupDto) {
    // check if the email is already taken by another user
    const emailTaken = await this.isEmailTaken(signupDto.email);
    if (emailTaken) throw new BadRequestError('Email already exist');
    const user = this.userRepository.create(signupDto);

    const { randomCode, hashCode } = generateCode();

    user.isEmailVerified = false;
    user.emailVerifyCode = hashCode;
    // email code expire after 30 minutes
    user.emailCodeExpires = new Date(Date.now() + 30 * 60 * 1000);

    // try {
    //   await this.mails.sendVerifyEmailCode(user.email, randomCode);
    // } catch (err) {
    //   user.isEmailVerified = undefined;
    //   user.emailVerifyCode = undefined;
    //   user.emailCodeExpires = undefined;
    // }
    await this.userRepository.save(user);
    return { user, randomCode };
  }

  /**
   * Checks if an email is already taken by querying the database using the `userRepository` and the provided email and optional id.
   * @param singinDto The data for signin.
   * @throws {BadRequestError} if the email is already taken.
  //  * @returns {Object<user|token|refreshToken>} the user and token and refresh token.
   */
  public async signin(singinDto: SigninDto) {
    const user = await this.userRepository.findOneBy({
      email: singinDto.email,
    });

    if (!user) throw new BadRequestError('Invalid Credentials');

    // compare the entered password with the user's password
    const passwordMatched = user.comparePassword(singinDto.password);
    if (!passwordMatched) throw new BadRequestError('Invalid Credentials');

    // generate auth tokens (accessToken & refreshToken)
    const jwt = new Jwt();
    const tokens = await jwt.generateAuthTokens({ id: user.id });
    // exclude password
    user.password = undefined;
    return { tokens, user };
  }

  public async signout(refreshToken: string) {
    const jwt = new Jwt();
    return await jwt.removeToken(refreshToken);
  }

  public async verifyEmailCode(code: string) {
    const hashCode = hash(code);

    const user = await this.userRepository.findOne({
      where: {
        emailVerifyCode: hashCode,
        emailCodeExpires: MoreThan(new Date(Date.now())),
      },
    });

    if (!user) throw new BadRequestError('code not valid or expired');

    user.isEmailVerified = true;
    user.emailVerifyCode = null;
    user.emailCodeExpires = null;

    await this.userRepository.save(user);
    const jwt = new Jwt();
    const tokens = await jwt.generateAuthTokens({ id: user.id });
    // exclude password
    user.password = undefined;
    return { tokens, user };
  }

  public async forgetPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new NotFoundError('user not found');

    const { randomCode, hashCode } = generateCode();

    user.passwordResetVerified = false;
    user.passwordResetCode = hashCode;
    // reset password code expire after 30 minutes
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);

    await this.userRepository.save(user);
    // try {
    //   await this.mails.sendResetPasswordCode(email, randomCode);
    // } catch (err) {
    //   user.passwordResetVerified = null;
    //   user.passwordResetCode = null;
    //   user.passwordResetExpires = null;
    // }
    return { randomCode };
  }

  public async verifyResetPasswordCode(email: string, code: string) {
    const hashCode = hash(code);

    const user = await this.userRepository.findOne({
      where: {
        email,
        passwordResetCode: hashCode,
        passwordResetExpires: MoreThan(new Date(Date.now())),
      },
    });

    if (!user) throw new BadRequestError('code not valid or expired');

    user.passwordResetVerified = true;
    await this.userRepository.save(user);

    return { user };
  }

  public async resetPassword(email: string, password: string) {
    const user = await this.userRepository.findOneBy({
      email: email,
      passwordResetVerified: true,
    });

    if (!user) throw new BadRequestError('reset code not verified');

    user.password = password;
    user.passwordResetCode = null;
    user.passwordResetVerified = null;
    user.passwordResetExpires = null;
    user.passwordChangedAt = new Date();

    await this.userRepository.save(user);

    const jwt = new Jwt();
    const tokens = await jwt.generateAuthTokens({ id: user.id });
    user.password = undefined;
    return { tokens, user };
  }
}

export default AuthService;
