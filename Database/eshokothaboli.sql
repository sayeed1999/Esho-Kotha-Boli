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
		,CAST(COUNT([c].[CommentId]) as bigint) [CommentsCount]
		,CAST(SUM([c].[RepliesCount]) as bigint) [RepliesCount]

	from [dbo].[Posts] as p
	inner join [dbo].[AspNetUsers] as u
		on u.Id = p.UserId
	outer apply (
		select
			t.Id [CommentId]
			,count(r.Id) [RepliesCount]
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
