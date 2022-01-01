using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Entity_Layer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Query;

namespace Repository_Layer.GenericRepository
{
    public interface IRepository<T>
    {
        // Basic five CRUD operations.
        public Task<Response<IEnumerable<T>>> GetAllAsync();
        public Task<Response<T>> GetByIdAsync(long id);
        public Task<Response<T>> AddAsync(T item);
        public Task<Response<T>> UpdateAsync(long id, T item);
        public Task<Response<T>> DeleteAsync(long id);

        // Additional operations.
        //public IQueryable<T> MakeQueryable();
        public Task<bool> ContainsAsync(T item);
        public Task<T> FindAsync(long id);
        public Task<T> GetFirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true
        );
        public Task<T> GetFirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate,
            params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes
        );
        public Task<IEnumerable<T>> GetWhereToListAsync(
            Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true,
            int page = 1,
            int count = 5
        );
        public IQueryable<T> FromSql(string rawsql, params SqlParameter[] parameters);
    }
}
