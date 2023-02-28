# sqlbyte

interactive SQL playground & lesson creator

## Roadmap

- Create various examples of SQL lessons
- Allow custom lesson creation with a file upload (i preferrably do *not* want to host a server)
- Generate fake data ([faker.js](https://fakerjs.dev/guide/usage.html)) && custom table sets 
- Good UI

## Example Query (testing)

```sql
CREATE TABLE Byte (id INTEGER, name TEXT);

INSERT INTO Byte VALUES (100, "One Hundred");
INSERT INTO Byte VALUES (200, "Two Hundred");
INSERT INTO Byte VALUES (300, "Three Hundred");

SELECT * FROM Byte WHERE id > 100;
```