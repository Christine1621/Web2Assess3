CREATE DATABASE crowdfunding_db;

USE crowdfunding_db;
CREATE TABLE FUNDRAISER (
    FUNDRAISER_ID INT AUTO_INCREMENT PRIMARY KEY,
    ORGANIZER VARCHAR(150) NOT NULL,
    CAPTION VARCHAR(200) NOT NULL,
    TARGET_FUNDING DECIMAL(10, 2) NOT NULL,
    CURRENT_FUNDING DECIMAL(10, 2) NOT NULL DEFAULT 0,
    CITY VARCHAR(150),
    ACTIVE TEXT,
    CATEGORY_ID INT,
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

CREATE TABLE CATEGORY (
    CATEGORY_ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL
);

INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)
VALUES 

('Leo', 'Medical Bills for Injured Athlete', 12000.00, 4000.00, 'Sydney', 'Leo was injured during the game and faced high medical costs.', 1),
('David', 'Arts Program for Youth', 5000.00, 800.00, 'Melbourne', 'Provide art education opportunities for adolescents at risk.', 4),
('Emma', 'Scholarship for Underprivileged Kids', 10000.00, 3000.00, 'Canberra', 'Scholarship to children from low-income families to help them access better educational resources', 4),
('Mike', 'Help Local Homeless', 6000.00, 1500.00, 'Darwin', 'Provide basic daily necessities for homeless people, including food and temporary shelter', 2),
('Edith', 'Animal Shelter Fundraiser', 7000.00, 2000.00, 'Sydney', 'Animal shelters need funds to provide food, medical care, and shelter to stray animals', 3),
('Grace', 'Local Food Bank', 8000.00, 2500.00, 'Hobart', 'Help stock the food bank with essential supplies.', 3),
('Mark', 'Vet Care for Stray Animals', 10000.00, 2000.00, 'Darwin', 'Provide veterinary care for stray animals, including vaccinations, spaying, and neutering.', 5),
('Kevin', 'Community Garden Project', 4000.00, 1000.00, 'Melbourne', 'Create a community garden that provides a space for residents to grow vegetables and communicate.', 2),
('Erin', 'Disaster Relief Fund', 25000.00, 7000.00, 'Brisbane', 'Help families recently affected by natural disasters.', 2),
('Tom','Short-Term Child Counseling','8000','2000','Darwin','Short-term counseling services for children who need psychological support',1);
('George', 'Wildlife Conservation Fund', 20000.00, 6000.00, 'Ballarat', 'Support wildlife conservation efforts to protect endangered species and their habitats.', 5),
('Sophia', 'Community Cleanup Program', 10000.00, 2500.00, 'Warrnambool', 'Organize volunteers to conduct community clean-up activities', 2)


INSERT INTO CATEGORY (NAME) VALUES ('Health'), ('Environment'), ('Community Support'),('Education'),('Animal Welfare');;

CREATE TABLE DONATION (
    DONATION_ID INT AUTO_INCREMENT PRIMARY KEY,
    DATE DATETIME NOT NULL,
    AMOUNT DECIMAL(10, 2) NOT NULL,
    GIVER VARCHAR(150) NOT NULL,  
    FUNDRAISER_ID INT,
    FOREIGN KEY (FUNDRAISER_ID) REFERENCES FUNDRAISER(FUNDRAISER_ID)
);

INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES
('2024-10-01 10:00:00', 600.00, 'Christine', 1),
('2024-09-22 14:30:00', 450.00, 'Avery', 2),
('2024-10-06 09:15:00', 200.00, 'Draken', 6),
('2024-09-17 16:45:00', 150.00, 'Mendy', 8),
('2024-09-20 11:30:00', 120.00, 'Monica', 3),
('2024-10-11 13:10:00', 50.00, 'Fiona', 9),
('2024-09-24 17:20:00', 75.00, 'George', 7),
('2024-10-05 08:50:00', 500.00, 'Helen', 4),
('2024-10-08 12:05:00', 125.00, 'Ian', 5),
('2024-09-30 15:30:00', 400.00, 'Adele', 10);