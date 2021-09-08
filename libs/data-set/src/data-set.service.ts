import { Injectable } from '@nestjs/common';

export interface IDataSetModel {
  id: number;
}

@Injectable()
export class DataSetService<T> {
  private id = 0;
  private dataSet: (IDataSetModel & T)[] = [];

  fill(dataSet: (IDataSetModel & T)[], id?: number) {
    this.dataSet = [...this.dataSet, ...dataSet];
    this.id = id ?? dataSet.length;
  }

  create(newDataSet: T): IDataSetModel & T {
    this.id++;
    const newItem = { id: this.id, ...newDataSet };
    this.dataSet.push(newItem);
    return newItem;
  }

  filter(
    search: Partial<IDataSetModel & T> | string | string[] | Function,
  ): DataSetService<T> {
    const DataSet = new DataSetService<T>();
    let filtered: Array<IDataSetModel & T> = [];

    if (typeof search === 'string') {
      filtered = this.dataSet.filter((data) => data[search]);
    } else if (Array.isArray(search)) {
      filtered = this.dataSet.filter((data) =>
        search
          .map((s) => data[s])
          .reduce((accumulator, current) => accumulator && current, true),
      );
    } else if (typeof search === 'function') {
      filtered = this.dataSet.filter((value, key) => search(value, key));
    } else {
      filtered = this.dataSet.filter((data) =>
        Object.keys(search)
          .map((s) => data[s] === search[s])
          .reduce((accumulator, current) => accumulator && current, true),
      );
    }

    DataSet.fill(filtered, this.id);
    return DataSet;
  }

  get(): (IDataSetModel & T)[] {
    return [...this.dataSet];
  }

  first(): IDataSetModel & T {
    return this.dataSet[0] ?? null;
  }
}
