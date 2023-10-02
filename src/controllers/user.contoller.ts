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
    console.log(req.query)
    const { count, users } = await userService.find(req.query);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      count,
      data: users,
    });
  }
}
