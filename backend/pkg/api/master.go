package api

import (
	"context"
	"database/sql"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/pg"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/repository"
)

type master struct {
	bc repository.BCRepo
}

func NewMasterRepository(db *sql.DB) repository.MasterRepo {
	return &master{
		bc: pg.NewBCRecordRepo(db),
	}
}

func (m *master) Create(ctx context.Context, rec entity.BCRecord) error {
	return m.bc.Create(ctx, rec)
}

func (m *master) List(ctx context.Context, req entity.ReadRequest) ([]*entity.BCRecord, error) {
	return m.bc.List(ctx, req)
}
