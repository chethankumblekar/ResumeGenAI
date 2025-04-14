USE AIResumeDB;
GO

CREATE TABLE Educations (
                            Id UNIQUEIDENTIFIER PRIMARY KEY,
                            ResumeId UNIQUEIDENTIFIER NOT NULL,
                            Institution NVARCHAR(100),
                            Degree NVARCHAR(100),
                            Year NVARCHAR(10),
                            Description NVARCHAR(MAX),
                            FOREIGN KEY (ResumeId) REFERENCES Resumes(Id)
);
