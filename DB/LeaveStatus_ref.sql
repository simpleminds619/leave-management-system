CREATE TABLE LeaveStatus_ref
(
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(50),
	CreatedDate DATETIME,
	UpdatdDate DATETIME
)

INSERT INTO LeaveStatus_ref VALUES ('In-Progress', GETUtCDATE(), GETUtCDATE());
INSERT INTO LeaveStatus_ref VALUES ('Rejected', GETUtCDATE(), GETUtCDATE());
INSERT INTO LeaveStatus_ref VALUES ('Cancelled', GETUtCDATE(), GETUtCDATE());
INSERT INTO LeaveStatus_ref VALUES ('Approved', GETUtCDATE(), GETUtCDATE());