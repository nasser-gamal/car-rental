import { CreateUserDto, UpdateUserDto } from '../interfaces/user.interface';
import { AppDataSource } from '../config/database';
import { User } from '../entities/index';
import { FindOptionsWhere } from 'typeorm';
import { BadRequestError } from '../utils/apiError';

const userRepository = AppDataSource.getRepository(User);

export default class UserService {
  // create new user
  /**
   *
   * @param {CreateUserDto} : createUserDto
   * @returns {{user: User}} result object
   */
  static async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return await userRepository.save(user);
  }

  // find all users
  /**
   *
   * @param {query}: IFilterInterface
   * @returns {{users: User[]}} result object
   */
  static async find(filterQuery?: any) {
    let queryString = { ...filterQuery };
    const excludeFields = ['sort', 'limit', 'page', 'keyword'];
    excludeFields.forEach((field) => delete queryString[field]);

    const [count, users] = await userRepository.findAndCount({
      where: queryString as FindOptionsWhere<User>,
    });
    return { count, users };
  }

  // find user by id
  /**
   *
   * @param {id}: number
   * @returns {{user: User}} result object
   */
  static async findById(id: number): Promise<User> {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    return user;
  }

  // update user by id
  /**
   *
   * @param {id}: number
   * @param {updateUserDto}: UpdateUserDto
   * @returns {{user: User}} result object
   */
  static async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    Object.assign(user, updateUserDto);
    await userRepository.save(user);
    return user;
  }

  // change user password
  /**
   *
   * @param {id}: number
   * @param {password}: string
   * @returns {{user: User}} result object
   */
  static async changePassword(id: number, password: string): Promise<User> {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    user.password = password;
    await userRepository.save(user);
    return user;
  }

  // delete user by id
  /**
   *
   * @param {id}: number
   * @returns
   */
  static async deleteById(id: number) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestError('user not found');
    await userRepository.remove(user);
    return;
  }
}
