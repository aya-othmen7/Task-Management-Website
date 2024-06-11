--  créer une base de données nommée "todolist"
CREATE DATABASE todolist;

-- Créer la table tasks pour stocker les tâches
CREATE TABLE `react_crud`.`tasks`
(
    `id` int NOT NULL auto_increment,
    `name` varchar(255),
    `time` time,
    `date` date,
    PRIMARY KEY (id)
);
