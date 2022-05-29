package repository

import (
	"context"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
)

type BCRepo interface {
	Create(context.Context, entity.BCRecord) error
	List(ctx context.Context, req entity.ReadRequest) ([]*entity.BCRecord, error)
}
