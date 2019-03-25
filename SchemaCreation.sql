CREATE TABLE LeaveCategory_ref(
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(50),
	Code NVARCHAR(5),
	TotalLeaves INT,
	TotalCarryFwdLeaves INT,
	CarryFwdUpperLimit INT,
	Status BIT,
	UpdatedDate DATETIME,
	CreatedDate DATETIME
);

--INSERT INTO LeaveCategory_ref 
--VALUES ('Privileged Leaves','PL',40,12,40,1,GETUTCDATE(), GETUTCDATE())