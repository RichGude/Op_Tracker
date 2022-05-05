\c pern 

CREATE TABLE IF NOT EXISTS operations  (
    id          BIGSERIAL       NOT NULL        PRIMARY KEY,
    requirement VARCHAR(50)     NOT NULL,
    team        VARCHAR(30)     NOT NULL,
    team_id     VARCHAR(5)      NOT NULL,
    obj_opn     VARCHAR(50)     NOT NULL,
    capability  VARCHAR(50)     NOT NULL,
    progress    INT             NOT NULL,
    status      VARCHAR(50)     NOT NULL,
    document    VARCHAR(50),
    category    INT             NOT NULL,
    completed   DATE,
    bullet1     VARCHAR(50),
    bullet2     VARCHAR(50),
    bullet3     VARCHAR(50),
    bullet4     VARCHAR(50),
    bullet5     VARCHAR(50),
    poc         VARCHAR(50),
    updated     VARCHAR(10)
);

-- Insert sample data points (one for each header)
INSERT INTO operations (requirement, team, team_id, obj_opn, capability, progress, status, document, category, completed, bullet1, bullet2, bullet3, bullet4, bullet5, updated)
				VALUES ('Requirement', 'Sooners', 'AAA', 'Winning', 'New quarterback', 2, 'recruiting', 'document_name.txt', 1, '2022-1-30', 'Some', 'stuff', 'to', 'show', 'off', '12MAR22');
INSERT INTO operations (requirement, team, team_id, obj_opn, capability, progress, status, document, category, completed, bullet1, bullet2, bullet3, bullet4, bullet5, updated)
				VALUES ('Requirement', 'Texas', 'BBB', 'Just keep sucking', 'laying an egg', 2, 'staying home from bowl', null, 2, null, 'Some', 'stuff', 'to', null, null, '24MAR22');
INSERT INTO operations (requirement, team, team_id, obj_opn, capability, progress, status, document, category, completed, bullet1, bullet2, bullet3, bullet4, bullet5, updated)
				VALUES ('Requirement', 'Nebraska', 'AAA', 'Try harder', 'eventually go to a bowl', 2, 'training', null, 3, null, 'Some', 'stuff', null, null, null, '12JAN22');

CREATE TABLE IF NOT EXISTS tracker  (
    id        BIGSERIAL       NOT NULL        PRIMARY KEY,
    "AAA"       VARCHAR(40),
    "BBB"       INT,
    "CCC"       INT,
    "DDD"       INT,
    "EEE"       INT,
    "FFF"       INT,
    "GGG"       INT,
    "HHH"       INT,
    "III"       INT,
    "JJJ"       INT,
    "KKK"       INT,
    "LLL"       INT,
    "MMM"       INT,
    "NNN"       INT,
    "OOO"       INT,
    "PPP"       INT,
    "QQQ"       INT,
    "RRR"       INT,
    "SSS"       INT,
    "TTT"       INT,
    "UUU"       INT
);

-- Insert sample tracker data point
INSERT INTO tracker ("AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ", "KKK", "LLL", "MMM", "NNN", "OOO", "PPP", "QQQ", "RRR", "SSS", "TTT", "UUU")
	     VALUES ('NAM', 12,  0,   2,   20,  51,  1,   4,   5,   8,   9,   5,  0,   4,   8,   3,   10,  9,   2,   8,   3);
