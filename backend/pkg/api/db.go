package api

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// NewSQLDB returns a new sql database.
func NewSQLDB() (*sql.DB, error) {
	return sql.Open("postgres", getDBConnectionString())
}

func getDBConnectionString() string {
	url := os.Getenv("DB_URL")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	options := os.Getenv("DB_OPTIONS")
	// There is a lot more that should be done here like switching between dev/prod environment.
	return fmt.Sprintf("postgresql://%s:%s@%s/%s?%s", user, password, url, dbName, options)
}
