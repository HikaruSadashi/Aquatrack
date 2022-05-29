package pg

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/HikaruSadashi/Aquatrack/backend/pkg/entity"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/exception"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/repository"
	"github.com/HikaruSadashi/Aquatrack/backend/pkg/utils"
)

const bcColumns = "fish_breed_id, life_stage, species_name, water_body_type, water_body_name, x, y, observation_time"

type bcRecordRepo struct {
	db *sql.DB
}

func NewBCRecordRepo(db *sql.DB) repository.BCRepo {
	return &bcRecordRepo{
		db: db,
	}
}

func (bc *bcRecordRepo) Create(ctx context.Context, rec entity.BCRecord) error {
	q := `INSERT INTO bc (%s) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

	args := []any{
		rec.FishBreedID,
		rec.LifeStage,
		rec.SpeciesName,
		rec.WaterBodyType,
		rec.WaterBodyName,
		rec.X,
		rec.Y,
		rec.ObservationTime,
	}
	query := fmt.Sprintf(q, bcColumns)

	if _, err := bc.db.ExecContext(ctx, query, args...); err != nil {
		return exception.NewPQError(err, query, args)
	}

	return nil
}

func (bc *bcRecordRepo) List(ctx context.Context, req entity.ReadRequest) ([]*entity.BCRecord, error) {
	q := `SELECT %s FROM bc %sORDER BY observation_time OFFSET $? LIMIT $?`
	args := []any{}
	filter := "WHERE "

	if req.WaterBodyName != "" {
		filter += "water_body_name = $? "
		args = append(args, req.WaterBodyName)
	}
	if req.WaterBodyType != "" {
		if filter != "WHERE " {
			filter += "AND water_body_type = $? "
		} else {
			filter += "water_body_type = $? "
		}
		args = append(args, req.WaterBodyType)
	}
	if filter == "WHERE " {
		filter = ""
	}

	args = append(args, (req.PageNumber-1)*req.PageLimit, req.PageLimit)

	query := utils.ArgsAssigner(fmt.Sprintf(q, bcColumns, filter))

	rows, err := bc.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, exception.NewPQError(err, query, args)
	}

	records := []*entity.BCRecord{}

	for rows.Next() {
		var r entity.BCRecord
		if err := rows.Scan(
			&r.FishBreedID,
			&r.LifeStage,
			&r.SpeciesName,
			&r.WaterBodyType,
			&r.WaterBodyName,
			&r.X,
			&r.Y,
			&r.ObservationTime,
		); err != nil {
			return nil, exception.NewError(err)
		}

		records = append(records, &r)
	}

	return records, nil
}
