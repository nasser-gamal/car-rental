import { Request, Response } from 'express';
import userService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

export class UserController {
  /**
   * Creates a new user.
   *
   * @param {Request} req - The request object containing the user data in the `body` property.
   * @param {Response} res - The response object used to send the HTTP response.
   * @returns {Promise<Response>} The HTTP response with a status of 201 (Created) and a JSON object containing a success message and the created user data.
   */
  static async createUser(req: Request, res: Response) {
    const user = await userService.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'user created successfully',
      data: user,
    });
  }

  /**
   * Retrieves all users from the database and returns them as a JSON response.
   *
   * @param req - The request object containing the query parameters.
   * @param res - The response object used to send the HTTP response.
   * @returns A JSON response with a status of 200 (OK) and an array of users as the `data` property.
   *
   */
  static async getAllUsers(req: Request, res: Response) {
    console.log(req.query);
    const { count, users } = await userService.find(req.query);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      count,
      data: users,
    });
  }

  /**
   * Retrieves only one user from the database and returns them as a JSON response.
   *
   * @param req - The request object containing the query parameters.
   * @param res - The response object used to send the HTTP response.
   * @returns A JSON response with a status of 200 (OK) and an object of user as the `data` property.
   *
   */
  static async getUser(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await userService.findById(+userId);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: user,
    });
  }
  /**
   * update one user from the database and returns them as a JSON response.
   *
   * @param req - The request object containing the query parameters.
   * @param res - The response object used to send the HTTP response.
   * @returns A JSON response with a status of 200 (OK) and an object of user as the `data` property.
   *
   */
  static async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const user = await userService.update(+userId, req.body);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: user,
    });
  }

  /**
   * change user password from the database and returns them as a JSON response.
   *
   * @param req - The request object containing the query parameters.
   * @param res - The response object used to send the HTTP response.
   * @returns A JSON response with a status of 200 (OK) . and an object of user as the `data` property.
   *
   */

  static async changeUserPassword(req: Request, res: Response) {
    const { userId } = req.params;
    await userService.changePassword(+userId, req.body.password);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'password changed successfully',
    });
  }
  /**
   * delete user from the database and returns them as a JSON response.
   *
   * @param req - The request object containing the query parameters.
   * @param res - The response object used to send the HTTP response.
   * @returns A JSON response with a status of 200 (OK) .
   *
   */

  static async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    await userService.deleteById(+userId);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'user deleted successfully',
    });
  }
}
