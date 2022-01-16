using Repository_Layer.DerivedRepositories.CommentRepository;
using Repository_Layer.DerivedRepositories.ImageRepository;
using Repository_Layer.DerivedRepositories.MessageRepository;
using Repository_Layer.DerivedRepositories.PostRepository;
using Repository_Layer.DerivedRepositories.PostSummaryRepository;
using Repository_Layer.DerivedRepositories.ProfilePictureRepository;
using Repository_Layer.DerivedRepositories.ReplyRepository;
using Repository_Layer.DerivedRepositories.UserRepository;
using System.Threading.Tasks;

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
        IImageRepository ImageRepository { get; }
        IProfilePictureRepository ProfilePictureRepository { get; }
        IMessageRepository MessageRepository { get; }
        IUserRepository UserRepository { get; }
        Task CompleteAsync();
    }
}
