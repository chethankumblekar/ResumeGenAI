USE AIResumeDB;
GO

CREATE TABLE Resumes (
                         Id UNIQUEIDENTIFIER PRIMARY KEY,
                         FullName NVARCHAR(100) NOT NULL,
                         Email NVARCHAR(100) NOT NULL,
                         Phone NVARCHAR(20),
                         Summary NVARCHAR(MAX)
);
