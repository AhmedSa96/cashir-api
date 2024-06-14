import { ObjectLiteral } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 15;

export interface PaginationResult<T> {
  data: T[];
  meta: {
    nextPage?: number;
    prevPage?: number;
    totalCount: number;
    currentPage: number;
    pageLimit: number;
  };
}

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity extends ObjectLiteral> {
    paginate(options: {
      page?: number;
      perPage?: number;
    }): Promise<PaginationResult<Entity>>;
  }
}

SelectQueryBuilder.prototype.paginate = async function <T>(
  this: SelectQueryBuilder<T>,
  options: { page: number; perPage: number },
): Promise<PaginationResult<T>> {
  const page = Number(options.page) || DEFAULT_PAGE;
  const perPage = Number(options.perPage) || DEFAULT_PER_PAGE;
  const totalCount = await this.getCount();
  const totalPages = Math.ceil(totalCount / perPage);
  const nextPage =
    page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;
  const data = await this.skip((page - 1) * perPage)
    .take(perPage)
    .getMany();

  return {
    data,
    meta: {
      totalCount,
      currentPage: page,
      pageLimit: perPage,
      nextPage,
      prevPage,
    },
  };
};
