USE AIResumeDB;
GO

CREATE TABLE Experiences (
                             Id UNIQUEIDENTIFIER PRIMARY KEY,
                             ResumeId UNIQUEIDENTIFIER NOT NULL,
                             Company NVARCHAR(100),
                             Role NVARCHAR(100),
                             Duration NVARCHAR(50),
                             Description NVARCHAR(MAX),
                             FOREIGN KEY (ResumeId) REFERENCES Resumes(Id)
);
