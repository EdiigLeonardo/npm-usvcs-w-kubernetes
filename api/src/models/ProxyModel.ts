import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class NpmRes extends Model {

  @Column
  get url(): string {
    return this.getDataValue('url');
  }

  set url(value: string) {
    this.setDataValue('url', value);
  }

  @Column
  get res(): string {
    return this.getDataValue('res');
  }

  set res(value: string) {
    this.setDataValue('res', value);
  }
  
}
