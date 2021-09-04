import { Injectable } from '@nestjs/common';

export interface IModel {
  id: number;
}

@Injectable()
export class DataSetService<T> {
  private id = 0;
  private readonly dataSet: (IModel & T)[] = [];

  fill(dataSet: (IModel & T)[], id: number = 0) {
    for (const data of dataSet) {
      this.dataSet.push({ ...data });
    }
    if (id === 0) this.id = dataSet.length;
    else this.id = id;
  }

  create(newDataSet: T): IModel & T {
    this.id++;
    const createdDataSet = { id: this.id, ...newDataSet };
    this.dataSet.push(createdDataSet);
    return createdDataSet;
  }

  filter(key: string, value: string | number): DataSetService<T> {
    const DataSet = new DataSetService<T>();
    DataSet.fill(
      this.dataSet.filter((data) => data[key] === value),
      this.id,
    );
    return DataSet;
  }

  get(): (IModel & T)[] {
    return [...this.dataSet];
  }

  first(): IModel & T {
    return this.dataSet[0] ?? null;
  }
}
