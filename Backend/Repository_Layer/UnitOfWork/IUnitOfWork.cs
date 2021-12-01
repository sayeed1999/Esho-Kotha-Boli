using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository_Layer.DerivedRepositories.CommentRepository;
using Repository_Layer.DerivedRepositories.PostRepository;
using Repository_Layer.DerivedRepositories.PostSummaryRepository;
using Repository_Layer.DerivedRepositories.ReplyRepository;
using Repository_Layer.GenericRepository;

namespace Repository_Layer.UnitOfWork
{
    public interface IUnitOfWork
    {
        // Interfaces can’t have private members.
        // By default all the members of Interface are public and abstract. 
        IPostRepository PostRepository { get; }
        IPostSummaryRepository PostSummaryRepository { get; }
        ICommentRepository CommentRepository { get; }
        IReplyRepository ReplyRepository { get; }
        Task CompleteAsync();
    }
}
