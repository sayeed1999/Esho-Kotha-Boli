using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Repository_Layer.DerivedRepositories.CommentRepository;
using Repository_Layer.DerivedRepositories.PostRepository;
using Repository_Layer.DerivedRepositories.ReplyRepository;

namespace Repository_Layer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public IPostRepository PostRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }
        public IReplyRepository ReplyRepository { get; private set; }

        public UnitOfWork
        (
            ApplicationDbContext dbContext,
            IPostRepository postRepository,
            ICommentRepository commentRepository,
            IReplyRepository replyRepository
        ) {
            _dbContext = dbContext;
            PostRepository = postRepository;
            CommentRepository = commentRepository;
            ReplyRepository = replyRepository;
        }

        public async Task CompleteAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
