package api

import (
	"context"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/repository"
)

type Service struct {
	repo repository.MasterRepo
}

func NewService(repo repository.MasterRepo) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(ctx context.Context, rec entity.BCRecord) error {
	return s.repo.Create(ctx, rec)
}

func (s *Service) List(ctx context.Context, req entity.ReadRequest) ([]*entity.BCRecord, error) {
	return s.repo.List(ctx, req)
}
