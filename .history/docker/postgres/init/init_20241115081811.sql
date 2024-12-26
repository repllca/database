-- DB作成
CREATE DATABASE sample_db WITH ENCODING 'UTF-8';

-- 作成したDBに接続
\c sample_db;

DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS lab;

-- テーブル作成
CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	student_id VARCHAR(100) NOT NULL,
	student_name VARCHAR(100) NOT NULL,
	student_grade INT NOT NULL,
	class_id REFERENCE class(class_id),
	lab_id REFERENCE lab(lab_id),
	created_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 学生の所属するクス
CREATE TABLE class (
	class_id SERIAL PRIMARY KEY,
	class_name VARCHAR(100) NOT NULL,
	created_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 学生の所属する研究室
CREATE TABLE lab (
	lab_id SERIAL PRIMARY KEY,
	lab_name VARCHAR(100) NOT NULL,
	lab_professor VARCHAR(100) NOT NULL,
	class_id REFERENCE class(class_id),
	created_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO class (class_name) 
VALUES 
	('IM'),
	('IC'),
	('IN'),
	('IS');

INSERT INTO lab (lab_name, lab_professor, class_id) 
VALUES 
	('lab1', 'prof1', 1),
	('lab2', 'prof2', 2),
	('lab3', 'prof3', 3),
	('lab4', 'prof4', 4);

INSERT INTO students (student_id, student_name, student_grade, class_id, lab_id) 
VALUES 
	('s1', 'student1', 1, 1, 1),
	('s2', 'student2', 2, 2, 2),
	('s3', 'student3', 3, 3, 3),
	('s4', 'student4', 4, 4, 4);
-- ID用シーケンス作成
CREATE SEQUENCE sample_id_seq START 1;
