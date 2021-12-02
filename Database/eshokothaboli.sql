use EshoKothaBoli;
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

alter proc spGetAllPostSummary (
	@page int = 1
)
as	
begin
	set nocount on
	select top (@page*5) -- considering 5 is the capacity of each page. each time the user clicks load more, it will load more 5
		[p].[Id] [Id]
		,(select dbo.funcShortenBody(p.Body)) [Body]
		,[p].[DateCreated] [DateCreated]
		,[u].[FirstName] + ' ' + [u].[LastName] [UserName]
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
		,[u].[FirstName]
		,[u].[LastName]
	order by
		[p].[Id] desc
end
go

-- testing

exec spGetAllPostSummary 3
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