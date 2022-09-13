import { IDefault } from "interfaces/default";

/**
 * 사용자 interface
 * @extends IDefault
 */
export interface IUser extends IDefault {
  /**
   * 사용자 Key
   */
  key: string;
  /**
   * 사용자 UUID
   */
  uuid: string;
}
