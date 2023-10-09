import { CreateUserDto, UpdateUserDto } from '../interfaces/user.interface';
import { AppDataSource } from '../config/database';
import { User } from '../entities/index';
import { FindOptionsWhere, Not } from 'typeorm';
import { BadRequestError } from '../utils/apiError';

class UserService {
  private readonly userRepository = AppDataSource.getRepository(User);

  /**
   * Checks if an email is already taken by querying the database using the `userRepository` and the provided email and optional id.
   * @param email - The email to check if it is taken.
   * @param id - The id of the user to exclude from the check. This is useful when updating a user's email.
   * @returns {Promise<User | undefined>} The user object if the email is taken, otherwise undefined.
   */
  private async isEmailTaken(
    email: string,
    id?: number
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email, id: Not(id) },
    });
    return user;
  }

  /**
   * Creates a new user with the provided data and returns the created user object.
   * @param createUserDto The data for creating a new user.
   * @throws {BadRequestError} if the email is already taken.
   * @returns {Promise<User>} The created user object
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailTaken = await this.isEmailTaken(createUserDto.email);
    if (emailTaken) throw new BadRequestError('email already exist');

    const user = new User();
    Object.assign(user, createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   /**
    * Find all users in the database
    * @param filterQuery - The filterQuery to filter the data.
    * @returns {Promise<{ count: number, users: User[] }>} The count of users in database & array of users in objects.
    */
  async find(filterQuery?: any) {
    const { sort, limit, page, keyword, ...queryString } = filterQuery || {};

    const [count, users] = await this.userRepository.findAndCount({
      where: queryString as FindOptionsWhere<User>,
    });

    return { count, users };
  }

  /**
   /**
    * Find  user by condition
    * @param conditions - The conditions to find the user.
    * @returns {Promise<{  user: User }>} find user by condition.
    */
  async findOne(conditions?: any) {
    return await this.userRepository.findOneBy({ ...conditions });
  }

  /**
   * Find a user by their ID in the database.
   * @param id - The ID of the user to find.
   * @throws {BadRequestError} - with the message "user not found" if no user is found.
   * @returns {Promise<User | undefined>} The user object with the specified ID, or `undefined` if no user is found.
   */
  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    return user;
  }

  /**
   * Updates a user's information in the database.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data to update the user with.
   * @throws {BadRequestError} - If the user is not found.
   * @returns {Promise<User>} The updated user object.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  /**
   * Change a user's password in database
   * @param id  - The ID of the user to update
   * @param password the new password to update it
   * @throws {BadRequestError} - if the user is not found
   * @returns {Promise<User | undefined>} the updated user object or undefined
   */
  async changePassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    user.password = password;
    await this.userRepository.save(user);
    return user;
  }

  /**
   * Deletes a user from the database based on their ID.
   *
   * @param id - The ID of the user to be deleted.
   * @throws {BadRequestError} - If the user is not found.
   * @returns {Promise<void>} - Promise that resolves with nothing.
   */
  async deleteById(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new BadRequestError('user not found');
    return;
  }
}

export default UserService;
