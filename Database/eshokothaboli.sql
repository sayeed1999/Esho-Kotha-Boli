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
		[p].[Id],
		(select dbo.funcShortenBody(p.Body)) as Body,
		[p].[DateTime]
	from
		[dbo].[Posts] as p
	order by
		[p].[Id] desc
end
go

-- testing

exec spGetAllPostSummary 3
go
















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
