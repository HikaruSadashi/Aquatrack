package cmd

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/api"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/middleware"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/utils"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var (
	corsWrapper = cors.New(cors.Options{
		MaxAge:         int(10 * time.Minute / time.Second),
		AllowedHeaders: []string{"*"},
	})
	port    = "8081"
	addr    = "localhost:" + port
	service *api.Service
)

func newServerCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "server",
		Short: "Aqua Tracker",
		Run:   runServerCmd,
	}
}

func runServerCmd(cmd *cobra.Command, args []string) {
	dir, err := os.Getwd()
	if err != nil {
		logrus.Panicf("unable to get current directory: %w", err)
	}
	if err := godotenv.Load(filepath.Join(dir, "build", ".env")); err != nil && utils.FileExists(".env") {
		logrus.Panicf("unable to load .env: %w", err)
	}
	sigs := make(chan os.Signal)

	go func() {
		sig := <-sigs
		time.Sleep(5 * time.Second)
		log.Panic("Exiting server on", sig) // panic allowed deferred calls to run unlike cmd os.Exit -> make sense in this situation
	}()

	db, err := api.NewSQLDB()
	if err != nil {
		logrus.Panicf("unable to connect to database: %w", err)
	}

	service = api.NewService(api.NewMasterRepository(db))

	r := mux.NewRouter()
	r.Use(middleware.LoggingMiddleware)

	r.Path("/create").Methods(http.MethodPost).HandlerFunc(middleware.ErrorWrapper("/create", createHandler))
	r.Path("/list").Methods(http.MethodGet).HandlerFunc(middleware.ErrorWrapper("/list", listHandler))

	logrus.Printf("Listening on %s", addr)
	logrus.Panic(http.ListenAndServe(addr, corsWrapper.Handler(r)))
}
