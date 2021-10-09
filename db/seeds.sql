INSERT INTO department(department_name)
VALUES 
    ("Tech Support"),
    ("Account Coordinators"),
    ("Asset Recovery"),
    ("Engineering"),
    ("IT"),
    ("Shipping");

INSERT INTO _role(title, salary, deparment_id)
VALUES
    ("Tech Support Specialist", 36000, 1),
    ("Account Coordinator", 36000, 2),
    ("Asset Recovery Specialist", 40000, 3),
    ("Engineer Team Member", 70000, 4),
    ("IT Specialist", 70000, 5),
    ("Shipping Team Member", 35000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Kevin", "Alcorn", 1, 1),
    ("Bryce", "Dallas-Howard", 2, 2),
    ("Briggs", "Myers", 3, 3),
    ("Paul", "Scraighm", 4, 4),
    ("Camille", "Ferros", 5, 5),
    ("Sarah", "Fortune", 6, 6);