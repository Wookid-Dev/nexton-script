# Nexton

---

1. First step, I created a dockerised postgresdb, using the next command:
    1. `docker run --name postgres-nexton -d -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=user123 -e POSTGRES_DB=nexton postgres`
2. After that using pgadmin we accessed our server, why PgAdmin? I like it because it is simple.
    1. `host: localhost`
    2. `port: 5432`
    3. `maintenance db: nexton`
    4. `username: user`
    5. `password: user123`
3.  Downloaded the files/tables you sent, and using the next script I created the tables.
    
    ```jsx
    CREATE TABLE jobs (
      id INT NOT NULL PRIMARY KEY,
      occupation VARCHAR,
      date_range VARCHAR,
      skills TEXT,
      current_job BOOLEAN,
      occupation_title VARCHAR,
      start_date TIMESTAMP,  
      end_date TIMESTAMP NULL,  
      candidate_id INT  
    ) 
    
    CREATE TABLE candidates (
      id INT,
      education_id INT,
      title VARCHAR,
      description VARCHAR
      dateRange VARCHAR,
      candidate_id INT
    );
    
    CREATE TABLE education (
      education_id INT,
      title VARCHAR,
      description VARCHAR,
      dateRange VARCHAR
      candidate_id INT NOT NULL
    );
    
    ```
    
4. So to import data, in PgAdmin we can just click on the table and then just go into import data it will automatically load it for you  instead of using `COPY` 
    
5. Now addressing the first point of the requirements
    1. “build an SQL solution (Function, View, Query, etc) that allows me to get all candidates without a current job”
        
        ```jsx
        CREATE OR REPLACE VIEW candidates_without_current_job AS
        SELECT *
        FROM public.candidates
        WHERE hire_flag = '0';
        
        ```
        
6. Now we move into the script, to run it we must install the deps (TS and pg)
    1. `npm i` 

7. Now we can just do `npm start` to run the script and thats it.

Note: Keep in mind that to be able to run the script you will need to run the view above, have tables named as in the script and have the same db config.