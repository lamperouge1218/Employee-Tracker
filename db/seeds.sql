INSERT INTO department(name)
VALUES 
    ("Tech Support"),
    ("Account Coordinators"),
    ("Asset Recovery"),
    ("Engineering"),
    ("IT"),
    ("Shipping");

INSERT INTO _role(title, salary, department_id)
VALUES
    ("Tech Support Specialist", 36000, 1),
    ("Senior Tech Support", 65000, 1),
    ("Account Coordinator", 36000, 2),
    ("Senior Account Coordinator", 65000, 2),
    ("Asset Recovery Specialist", 40000, 3),
    ("Senior Asset Recovery", 70000, 3),
    ("Engineer Team Member", 70000, 4),
    ("Engineer Team Lead", 100000, 4),
    ("IT Specialist", 70000, 5),
    ("IT Team Lead", 100000, 5),
    ("Shipping Team Member", 35000, 6),
    ("Shipping Team Lead", 65000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Kevin", "Alcorn", 1, 2),
    ("Bryce", "Dallas-Howard", 2, NULL),
    ("Briggs", "Myers", 3, 4),
    ("Paul", "Scraighm", 4, NULL),
    ("Camille", "Ferros", 5, 6),
    ("Sarah", "Fortune", 6, NULL),
    ("Bevin", "Screvin", 7, 8),
    ("Cary", "Elwes", 8, NULL),
    ("Carl", "Miskt", 9, 10),
    ("Lorne", "Aiken", 10, NULL),
    ("Scott", "Greft", 11, 12),
    ("Norman", "Plont", 12, NULL);
    