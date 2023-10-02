import { CreateUserDto } from 'src/interfaces/user.interface';
import { AppDataSource } from '../config/database';
import { User } from '../entities/index';
import { FindOptionsWhere } from 'typeorm';

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
}
