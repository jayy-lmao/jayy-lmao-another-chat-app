import { Model } from "objection";
import { genSaltSync, hash, compare } from "bcrypt";
import * as Knex from "knex";
import connection from "./knexfile";

const ENVIRONMENT = process.env.NODE_ENV || "development";
const knexConfig = (connection as any)[ENVIRONMENT];
const knexConnection = Knex(knexConfig as Knex.Config);

Model.knex(knexConnection);

export class User extends Model {
  public id: number = 0;
  public displayname: string = "";
  public username: string = "";
  public password: string = "";

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  getUser() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  async $beforeInsert() {
    const salt = genSaltSync();
    this.password = await hash(this.password, salt);
  }

  async verifyPassword(
    password: string,
    callback: (err?: Error, isCorrect?: boolean) => void
  ) {
    compare(password, this.password, callback);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}
