.PHONY: database clean

database: database/create-db.js
	cd database && node create-db.js

clean:
	cd database && node drop-db.js
