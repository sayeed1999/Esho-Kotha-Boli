using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer;
using Repository_Layer.DerivedRepositories.CommentRepository;
using Repository_Layer.DerivedRepositories.ImageRepository;
using Repository_Layer.DerivedRepositories.PostRepository;
using Repository_Layer.DerivedRepositories.PostSummaryRepository;
using Repository_Layer.DerivedRepositories.ProfilePictureRepository;
using Repository_Layer.DerivedRepositories.ReplyRepository;

namespace Repository_Layer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public IPostRepository PostRepository { get; private set; }
        public IPostSummaryRepository PostSummaryRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }
        public IReplyRepository ReplyRepository { get; private set; }
        public IImageRepository ImageRepository { get; private set; }
        public IProfilePictureRepository ProfilePictureRepository { get; private set; }

        public UnitOfWork
        (
            ApplicationDbContext dbContext,
            IPostRepository postRepository,
            IPostSummaryRepository postSummaryRepository,
            ICommentRepository commentRepository,
            IReplyRepository replyRepository,
            IImageRepository imageRepository,
            IProfilePictureRepository profilePictureRepository
        ) {
            _dbContext = dbContext;
            PostRepository = postRepository;
            PostSummaryRepository = postSummaryRepository;
            CommentRepository = commentRepository;
            ReplyRepository = replyRepository;
            ImageRepository = imageRepository;
            ProfilePictureRepository = profilePictureRepository;
        }

        public async Task CompleteAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
