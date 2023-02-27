# sqlbyte

interactive SQL playground & lesson creator

## Example Query (testing)

```
CREATE TABLE Byte (id INTEGER, name TEXT);

INSERT INTO Byte VALUES (100, "One Hundred");
INSERT INTO Byte VALUES (200, "Two Hundred");
INSERT INTO Byte VALUES (300, "Three Hundred");

SELECT * FROM Byte WHERE id > 100;
```