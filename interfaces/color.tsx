import { IDefault } from "interfaces/default";

/**
 * 색상 interface
 * @extends IDefault
 */
export interface IColor extends IDefault {
  /**
   * HEX 값 (6자리 16진수)
   */
  hex: string;
}
