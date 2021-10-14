import { Injectable } from '@nestjs/common';

export interface IDataSetModel {
  id: number;
}

export interface IDataSetModel {
  id: number;
}

interface IDataQueryObject {
  min?: number;
  max?: number;
}

export interface IDataQuery {
  [key: string]: IDataQueryObject;
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

  update(id: number, updateDataSet: Partial<T>): IDataSetModel & T {
    const dataSetIndex = this.dataSet.findIndex((data) => data.id === id);

    if (dataSetIndex < 0) return null;

    this.dataSet[dataSetIndex] = {
      ...this.dataSet[dataSetIndex],
      ...updateDataSet,
    };
    return this.dataSet[dataSetIndex];
  }

  find(
    search:
      | Partial<IDataSetModel & T>
      | string
      | string[]
      | Function
      | IDataQuery,
  ): DataSetService<T> {
    const DataSet = new DataSetService<T>();
    let filtered: Array<IDataSetModel & T>;

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
          .map((s) => {
            if (
              search[s].hasOwnProperty('min') &&
              search[s].hasOwnProperty('max')
            ) {
              return data[s] > search[s].min && data[s] < search[s].max;
            } else if (search[s].hasOwnProperty('max')) {
              return data[s] < search[s].max;
            } else if (search[s].hasOwnProperty('min')) {
              return data[s] > search[s].min;
            } else return data[s] === search[s];
          })
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
