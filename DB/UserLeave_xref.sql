CREATE TABLE UserLeave_xref
(
	CategoryId INT FOREIGN KEY REFERENCES dbo.LeaveCategory_ref(Id),
	UserId INT,
	TotalAvailableLeaves INT
	PRIMARY KEY (CategoryId, UserId)
)