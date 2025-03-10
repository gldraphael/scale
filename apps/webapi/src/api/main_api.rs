use axum::{
    http::StatusCode, Json, debug_handler
};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

pub(crate) fn router() -> OpenApiRouter {
    return OpenApiRouter::new().routes(routes!(classify));
}

#[utoipa::path(
    post,
    path = "/classify",
    responses(
        (status = 200, body = [ClassificationResult])
    )
)]
#[debug_handler]
async fn classify(Json(_req): Json<ClassificationRequest>) 
     -> (StatusCode, Json<ClassificationResult>) {  
    (StatusCode::OK, Json(ClassificationResult {
        level: ObesityLevel::NormalWeight
    }))
}

#[derive(Deserialize, ToSchema)]
struct ClassificationRequest {
    sex: Sex,
    age: u8,
    height: f32,
    weight: f32,
    veg_in_meals: f32,
    num_meals: u8,
    food_bw_meals: FoodBetweenMeals,
    is_smoker: bool,
    water_intake: f32,
    monitors_calories: bool,
    physical_act_freq: f32,
    screen_time: f32,
    alcohol_freq: AlcoholFrequency,
    transportation: Transportation
}
#[derive(Serialize, ToSchema)]
struct ClassificationResult {
    level: ObesityLevel
}

    
#[derive(Deserialize, ToSchema)]
enum Sex {
    #[serde(rename = "female")] Female, 
    #[serde(rename = "male")]   Male
}
#[derive(Deserialize, ToSchema)]
enum FoodBetweenMeals {
    #[serde(rename = "always")]     Always, 
    #[serde(rename = "frequently")] Frequently, 
    #[serde(rename = "sometimes")]  Sometimes, 
    #[serde(rename = "never")]      Never
}
#[derive(Deserialize, ToSchema)]
enum AlcoholFrequency {
    #[serde(rename = "always")]     Always, 
    #[serde(rename = "frequently")] Frequently, 
    #[serde(rename = "sometimes")]  Sometimes, 
    #[serde(rename = "never")]      Never
}
#[derive(Deserialize, ToSchema)]
enum Transportation {
    #[serde(rename = "automobile")] Automobile, 
    #[serde(rename = "bike")]       Bike, 
    #[serde(rename = "motorbike")]  Motorbike,
    #[serde(rename = "public_transportation")] PublicTransportation, 
    #[serde(rename = "walking")]    Walking
}

#[derive(Serialize, ToSchema)]
enum ObesityLevel {
    #[serde(rename = "insufficient_weight")] InsufficientWeight, 
    #[serde(rename = "normal_weight")]       NormalWeight, 
    #[serde(rename = "overweight_level_1")]  OverweightLevel1, 
    #[serde(rename = "overweight_level_2")]  OverweightLevel2,
    #[serde(rename = "obesity_type_1")]      ObesityType1, 
    #[serde(rename = "obesity_type_2")]      ObesityType2, 
    #[serde(rename = "obesity_type_3")]      ObesityType3, 
}
