import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { id: user_id },
      relations: ["games"],
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`SELECT * FROM users ORDER BY first_name ASC`);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const firstNameToLowerCase = first_name.toLowerCase();
    const lastNameToLowerCase = last_name.toLowerCase();

    return this.repository.query(
      `SELECT * FROM users WHERE LOWER(first_name)='${firstNameToLowerCase}' AND LOWER(last_name)='${lastNameToLowerCase}'`
    );
  }
}
