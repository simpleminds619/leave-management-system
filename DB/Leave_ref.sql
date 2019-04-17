CREATE TABLE Leave_ref
(
	Id INT PRIMARY KEY IDENTITY,
	CategoryId INT FOREIGN KEY REFERENCES dbo.LeaveCategory_ref(Id),
	UserId INT,
	StartDate DATETIME,
	EndDate DATETIME,
	Reason NVARCHAR(MAX),
	StatusId INT FOREIGN KEY REFERENCES dbo.LeaveStatus_ref(Id),
	ApprovalDate DATETIME,
	CreatedDate DATETIME,
	UpdatedDate DATETIME
)