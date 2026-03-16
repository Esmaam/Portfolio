PRAGMA foreign_keys = ON;

CREATE TABLE Owner (
    id_owner INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    linkedin_profile_url TEXT
);

CREATE TABLE Company (
    id_company INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE SkillCategory (
    id_category INTEGER PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE HeroMessage (
    id_message INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    id_owner INTEGER NOT NULL,
    FOREIGN KEY (id_owner) REFERENCES Owner(id_owner)
);

CREATE TABLE Education (
    id_education INTEGER PRIMARY KEY,
    establishment TEXT NOT NULL,
    degree TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    id_owner INTEGER NOT NULL,
    FOREIGN KEY (id_owner) REFERENCES Owner(id_owner)
);

CREATE TABLE Role (
    id_role INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    city TEXT,
    start_date TEXT,
    end_date TEXT,
    visible INTEGER NOT NULL DEFAULT 1,
    id_owner INTEGER NOT NULL,
    id_company INTEGER NOT NULL,
    FOREIGN KEY (id_owner) REFERENCES Owner(id_owner),
    FOREIGN KEY (id_company) REFERENCES Company(id_company)
);

CREATE TABLE Project (
    id_project INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    contribution TEXT,
    description TEXT,
    id_role INTEGER,
    position INTEGER UNIQUE,
    FOREIGN KEY (id_role) REFERENCES Role(id_role)
);

CREATE TABLE Skill (
    id_skill INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    id_owner INTEGER NOT NULL,
    id_category INTEGER,
    FOREIGN KEY (id_owner) REFERENCES Owner(id_owner),
    FOREIGN KEY (id_category) REFERENCES SkillCategory(id_category)
);

CREATE TABLE Keyword (
    id_keyword INTEGER PRIMARY KEY,
    text TEXT NOT NULL UNIQUE
);

CREATE TABLE RoleKeyword (
    id_role INTEGER NOT NULL,
    id_keyword INTEGER NOT NULL,
    PRIMARY KEY (id_role, id_keyword),
    FOREIGN KEY (id_role) REFERENCES Role(id_role),
    FOREIGN KEY (id_keyword) REFERENCES Keyword(id_keyword)
);

CREATE TABLE ProjectKeyword (
    id_project INTEGER NOT NULL,
    id_keyword INTEGER NOT NULL,
    PRIMARY KEY (id_project, id_keyword),
    FOREIGN KEY (id_project) REFERENCES Project(id_project),
    FOREIGN KEY (id_keyword) REFERENCES Keyword(id_keyword)
);