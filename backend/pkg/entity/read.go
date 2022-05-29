package entity

type ReadRequest struct {
	PageNumber    int    `json:"page_number"`
	PageLimit     int    `json:"page_limit"`
	WaterBodyType string `json:"water_body_type"`
	WaterBodyName string `json:"water_body_name"`
}
