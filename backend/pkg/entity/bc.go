package entity

type BCRecord struct {
	FishBreedID     string  `json:"fish_breed_id" db:"fish_breed_id"`
	LifeStage       string  `json:"life_stage" db:"life_stage"` // string for now
	SpeciesName     string  `json:"species_name" db:"species_name"`
	WaterBodyType   string  `json:"water_body_type" db:"water_body_type"` // string for now
	WaterBodyName   string  `json:"water_body_name" db:"water_body_name"`
	X               float64 `json:"x" db:"x"`
	Y               float64 `json:"y" db:"y"`
	ObservationTime string  `json:"observation_time" db:"observation_time"`
}
