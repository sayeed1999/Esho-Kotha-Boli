use EshoKothaBoli
go

-- User-defined function for shortening body

alter function funcShortenBody(
	@body nvarchar(max)
)
returns nvarchar(max) as
begin
	declare @ret nvarchar(max);
	if (len(@body) > 50)
		set @ret = SUBSTRING(@body, 1, 50) + '...';
	else
		set @ret = @body;
	return @ret;
end
go

-- Stored Procedure for GettingAllPostSummaries

-- this sp will work from any page and post count
alter proc spGetAllPostSummary (
	@page int = 1 -- default page number
	,@count int = 5 -- default page capacity
)
as	
begin
	set nocount on
	select
		[p].[Id] [Id]
		,(select dbo.funcShortenBody(p.Body)) [Body]
		,[p].[DateCreated] [DateCreated]
		,[u].[UserName] [UserName]
		,[u].[FirstName] + ' ' + [u].[LastName] [FullName]
		,CAST(ISNULL(COUNT([c].[CommentId]), 0) as bigint) [CommentsCount]
		,CAST(ISNULL(SUM([c].[RepliesCount]), 0) as bigint) [RepliesCount]

	from [dbo].[Posts] as p
	inner join [dbo].[AspNetUsers] as u
		on u.Id = p.UserId
	outer apply (
		select
			t.Id [CommentId]
			,isnull(count(r.Id), 0) [RepliesCount]
		from [dbo].[Comments] t
		left join [dbo].[Replies] r on t.Id = r.CommentId
		where p.Id = t.PostId
		group by t.Id
	) c
	group by
		[p].[Id]
		,[p].[Body]
		,[p].[DateCreated]
		,[u].[UserName]
		,[u].[FirstName]
		,[u].[LastName]
	order by
		[p].[Id] desc
	offset (@page - 1)*@count rows
	fetch next @count rows only
end
go

-- Stored Procedure for GettingAllPostSummariesForAUser

-- this sp will work from any page and post count
alter procedure spGetAllPostSummaryByUser (
	@username nvarchar(max)
	,@page int = 1 -- default page number
	,@count int = 5 -- default page capacity
)
as	
begin
	set nocount on
	select
		[p].[Id] [Id]
		,(select dbo.funcShortenBody(p.Body)) [Body]
		,[p].[DateCreated] [DateCreated]
		,[u].[UserName] [UserName]
		,[u].[FirstName] + ' ' + [u].[LastName] [FullName]
		,CAST(ISNULL(COUNT([c].[CommentId]), 0) as bigint) [CommentsCount]
		,CAST(ISNULL(SUM([c].[RepliesCount]), 0) as bigint) [RepliesCount]

	from [dbo].[Posts] as p
	inner join [dbo].[AspNetUsers] as u
		on u.Id = p.UserId
	outer apply (
		select
			t.Id [CommentId]
			,isnull(count(r.Id), 0) [RepliesCount]
		from [dbo].[Comments] t
		left join [dbo].[Replies] r on t.Id = r.CommentId
		where p.Id = t.PostId
		group by t.Id
	) c
	where
		[u].[UserName] = @username
	group by
		[p].[Id]
		,[p].[Body]
		,[p].[DateCreated]
		,[u].[UserName]
		,[u].[FirstName]
		,[u].[LastName]
	order by
		[p].[Id] desc
	offset (@page - 1)*@count rows
	fetch next @count rows only
end
go


-- this sp will fetch a post summary by the postId
create proc spGetPostSummaryByPostId (
	@postId int = 0
)
as	
begin
	set nocount on
	select top(1)
		[p].[Id] [Id]
		,(select dbo.funcShortenBody(p.Body)) [Body]
		,[p].[DateCreated] [DateCreated]
		,[u].[UserName] [UserName]
		,[u].[FirstName] + ' ' + [u].[LastName] [FullName]
		,CAST(ISNULL(COUNT([c].[CommentId]), 0) as bigint) [CommentsCount]
		,CAST(ISNULL(SUM([c].[RepliesCount]), 0) as bigint) [RepliesCount]

	from [dbo].[Posts] as p
	inner join [dbo].[AspNetUsers] as u
		on u.Id = p.UserId
	outer apply (
		select
			t.Id [CommentId]
			,isnull(count(r.Id), 0) [RepliesCount]
		from [dbo].[Comments] t
		left join [dbo].[Replies] r on t.Id = r.CommentId
		where p.Id = t.PostId
		group by t.Id
	) c
	where
		[p].[Id] = @postId
	group by
		[p].[Id]
		,[p].[Body]
		,[p].[DateCreated]
		,[u].[UserName]
		,[u].[FirstName]
		,[u].[LastName]
end
go


select * from dbo.Posts
exec spGetPostSummaryByPostId @postId = 128



CREATE TRIGGER tr_AspNetUsers ON dbo.AspNetUsers
AFTER INSERT
AS
BEGIN
	declare @userid as nvarchar(max)
	set @userid = (select i.Id from inserted i)
	INSERT INTO 
		dbo.ProfilePictures (UserId, ImageId, DateCreated)
		VALUES (@userid, NULL, SYSDATETIME())
END
go

select * from Images
select * from ProfilePictures

-- testing
declare @page as int, @count as int
set @page = 1
set @count = 9
exec spGetAllPostSummary @page, @count
go

insert into dbo.Posts (UserId, Body, DateCreated) values
('82394a08-8824-4d13-a127-639126febbfd', 'Dummy post 01', SYSDATETIME()),
('82394a08-8824-4d13-a127-639126febbfd', 'Dummy post 02', SYSDATETIME())

select * from posts
insert into Comments (Body, DateCreated, PostId, UserId) values
('Dummy comment 1', SYSDATETIME(), 72, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy comment 2', SYSDATETIME(), 72, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy comment 3', SYSDATETIME(), 72, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy comment 4', SYSDATETIME(), 73, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy comment 5', SYSDATETIME(), 73, '82394a08-8824-4d13-a127-639126febbfd')

select * from Comments
insert into Replies (Body, DateCreated, CommentId, UserId) values
('Dummy replies', SYSDATETIME(), 77, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 78, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 79, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 80, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 80, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 80, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 81, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 81, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 81, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 81, '82394a08-8824-4d13-a127-639126febbfd')
,('Dummy replies', SYSDATETIME(), 81, '82394a08-8824-4d13-a127-639126febbfd')


select * from dbo.Posts


-- debug that it works.

CREATE FUNCTION dbo.debug(
    @quantity INT,
	@quantity2 INT
)
RETURNS int
AS 
BEGIN
    RETURN @quantity * @quantity2
END;

select dbo.debug(2, 3);



-- R&D on inner join vs left join please check :)
declare @A as table (
	id int,
	name nvarchar(max)
)
declare @B as table (
	id int,
	Aid int
)
declare @C as table (
	id int,
	Bid int
)
insert into @A values (1, 'A'),(2, 'B'),(3, 'C'),(4, 'D'),(5, 'E');
insert into @B values (1,1),(2,2),(3,3),(4,4);
insert into @C values (1,2),(2,3),(3,4),(4,5),(5,6);
select
	a.id as aa
	,b.Aid as b
	,c.Bid as cc
from @A a
left join @B b on a.id = b.Aid
left join @C c on a.id = c.Bid