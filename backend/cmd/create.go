package cmd

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/exception"
)

func createHandler(w http.ResponseWriter, r *http.Request) error {
	var rec entity.BCRecord
	if err := json.NewDecoder(r.Body).Decode(&rec); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return exception.NewError(err)
	}

	if err := service.Create(context.Background(), rec); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return err
	}

	w.WriteHeader(http.StatusOK)
	return nil
}
