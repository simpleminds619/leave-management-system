USE [LeaveManagementSystemDb]
GO

/****** Object:  Table [dbo].[Holiday_ref]    Script Date: 4/2/2019 3:15:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Holiday_ref](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LocationId] [int] NULL,
	[Year] [int] NULL,
	[Reason] [nvarchar](100) NULL,
	[EffectiveDate] [datetime] NULL,
	[Staus] int NULL,
	[UpdatedDate] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Holiday_ref]  WITH CHECK ADD FOREIGN KEY([LocationId])
REFERENCES [dbo].[Location_ref] ([Id])
GO


