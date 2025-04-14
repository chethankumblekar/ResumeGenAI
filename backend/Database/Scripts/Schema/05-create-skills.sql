USE AIResumeDB;
GO

CREATE TABLE Skills (
                        Id UNIQUEIDENTIFIER PRIMARY KEY,
                        ResumeId UNIQUEIDENTIFIER NOT NULL,
                        Skill NVARCHAR(50),
                        FOREIGN KEY (ResumeId) REFERENCES Resumes(Id)
);
