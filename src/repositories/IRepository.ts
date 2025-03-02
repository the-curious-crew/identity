export interface IBaseRepository<I = string> {
  getAll?(): Promise<any[]>;

  getAllWithCursor?(): Promise<{ items: any[]; nextCursor: number | null }>;

  getById?(id: I): Promise<any | null>;

  create?(data: any): Promise<any>;

  update?(id: I | undefined, data: any, upsert?: boolean): Promise<any | null>;

  delete?(id: I): Promise<void>;

  bulkCreate?(data: any[]): Promise<any[]>;

  bulkUpdate?(updateData: any[]): Promise<void>;

  getSearchQuery?: (searchString: string) => unknown;
}
