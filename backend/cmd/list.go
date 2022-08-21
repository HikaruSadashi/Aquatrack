package cmd

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/exception"
)

func listHandler(w http.ResponseWriter, r *http.Request) error {
	var req entity.ReadRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return exception.NewError(err)
	}

	records, err := service.List(context.Background(), req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return err
	}

	if err := json.NewEncoder(w).Encode(&records); err != nil {
		return exception.NewError(err)
	}

	w.WriteHeader(http.StatusOK)
	return nil
}
