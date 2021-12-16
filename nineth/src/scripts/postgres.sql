DROP TABLE IF EXISTS languages;

CREATE TABLE languages (
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
   name TEXT NOT NULL,
   extension TEXT NOT NULL
);

INSERT INTO languages (name, extension) VALUES ('JavaScript', '.js'), ('Ruby', '.rb'), ('Python', '.py');

SELECT * FROM languages;

SELECT * FROM languages WHERE name='JavaScript';

UPDATE languages SET name='C#', extension='.cs' WHERE id=2;
