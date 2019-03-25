CREATE TABLE LeaveCategory_ref(
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(50),
	Code NVARCHAR(5),
	TotalLeaves INT,
	TotalCarryFwdLeaves INT,
	CarryFwdUpperLimit INT,
	Status INT,
	UpdatedDate DATETIME,
	CreatedDate DATETIME
);
