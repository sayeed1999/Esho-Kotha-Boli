using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Entity_Layer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Repository_Layer.GenericRepository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _dbContext;
        internal DbSet<T> _dbSet;

        public Repository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        /// <summary>
        /// Gets all items from the collection
        /// </summary>
        /// <returns></returns>
        public async Task<Response<IEnumerable<T>>> GetAllAsync()
        {
            var response = new Response<IEnumerable<T>>();
            try
            {
                response.Data = await _dbSet.ToListAsync();
                response.Message = "All items fetched successfully";
            }
            catch(Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = "Internal Server Error";
            }
            return response;
        }

        /// <summary>
        /// Gets one specific item from the collection with the 'id' primary key
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Response<T>> GetByIdAsync(long id)
        {
            var response = new Response<T>();
            try
            {
                T itemInDb = await _dbSet.FindAsync(id);
                response.Data = itemInDb;
                response.Message = "Item fetched successfully";

                if (itemInDb == null)
                {
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = "Internal Server Error";
            }
            return response;
        }

        /// <summary>
        /// Does all the tracking to add the new item, but is not added yet SaveChanges() or SaveChangesAsync() is called
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<Response<T>> AddAsync(T item)
        {
            var response = new Response<T>();

            if(item == null)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                response.Message = "Item cannot be null";
            }
            else
            {
                try
                {
                    // setting the primary key 'Id' of the item to 0 to conflict error with SQL
                    item.GetType().GetProperty("Id").SetValue(item, 0);
                    response.Data = item;
                    await _dbSet.AddAsync(item);
                    response.StatusCode = HttpStatusCode.Created;
                    response.Message = "Item created successfully";
                }
                catch (Exception ex)
                {
                    response.StatusCode = HttpStatusCode.InternalServerError;
                    response.Message = "Internal Server Error";
                }
            }
            return response;
        }

        /// <summary>
        /// Does all the tracking to update the given item, but is not updated yet SaveChanges() or SaveChangesAsync() is called
        /// </summary>
        /// <param name="id"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<Response<T>> UpdateAsync(long id, T item)
        {
            var response = new Response<T>();
            try
            {
                long itemId = (long)item.GetType().GetProperty("Id").GetValue(item);
                if (id != itemId)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "Given id and itemId don't match";
                    return response;
                }

                T itemInDb = await _dbSet.FindAsync(id);
                if (itemInDb == null)
                {
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Message = "Not Found";
                    return response;
                }

                // _dbSet.Update(item);
                _dbContext.Entry<T>(itemInDb).CurrentValues.SetValues(item);
                response.Data = item;
                response.Message = "Item updated successfully";
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = "Internal Server Error";
            }
            return response;
        }

        /// <summary>
        /// Does all the tracking to delete the item from the database, but is not removed yet SaveChanges() or SaveChangesAsync() is called
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Response<T>> DeleteAsync(long id)
        {
            var response = new Response<T>();

            T itemInDb = await _dbSet.FindAsync(id);
            if(itemInDb == null)
            {
                response.StatusCode = HttpStatusCode.NotFound;
                response.Message = "Not Found";
            }
            else
            {
                _dbSet.Remove(itemInDb);
                response.Data = itemInDb;
                response.Message = "Item deleted successfully";
            }
            return response;
        }

        /// Additional linq operations attached...
        
        // just make IQueryable<> from the generic repo to get any dbSet methods ;)

        //public IQueryable<T> MakeQueryable()
        //{
        //    return _dbSet.AsQueryable();
        //}
        
        public async Task<bool> ContainsAsync(T item)
        {
            return await _dbSet.ContainsAsync(item);
        }

        public async Task<T> FindAsync(long id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> GetFirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true
        )
        {
            IQueryable<T> query = _dbSet; // implicit casting
            if(disableTracking)
            {
                query = query.AsNoTracking();
            }
            if(include != null)
            {
                query = include(query);
            }
            if(orderBy != null)
            {
                query = orderBy(query);
            }
            T result = await query.FirstOrDefaultAsync(predicate);
            return result;
        }

        public async Task<T> GetFirstOrDefaultAsync(
            Expression<Func<T, bool>> predicate,
            params Func<IQueryable<T>, IIncludableQueryable<T, object>>[] includes
        )
        {
            IQueryable<T> query = _dbSet; // implicit casting

            // tracking disabled!
            query = query.AsNoTracking();

            foreach(Func<IQueryable<T>, IIncludableQueryable<T, object>> include in includes)
            {
                query = include(query);
            }

            T result = await query.FirstOrDefaultAsync(predicate);
            return result;
        }

        public async Task<IEnumerable<T>> GetWhereToListAsync(
            Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true,
            int page = 1,
            int number = 5

        )
        {
            IQueryable<T> query = _dbSet; // implicit casting
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }
            if (include != null)
            {
                query = include(query);
            }
            if (orderBy != null)
            {
                query = orderBy(query);
            }
            const int defaultPageSize = 5;
            IEnumerable<T> result = await query.Where(predicate).Skip(defaultPageSize * (page - 1)).Take(number).ToListAsync();
            return result;
        }

        public IQueryable<T> FromSql(string rawsql, params SqlParameter[] parameters)
        {
            return _dbSet.FromSqlRaw(rawsql, parameters);
        }
    }
}
