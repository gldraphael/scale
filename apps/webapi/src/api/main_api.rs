use axum::{
    http::StatusCode, Json, debug_handler
};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use gen::ClassifyObesityLevelRequest;
use gen::scale_service_client::ScaleServiceClient;

mod gen {
    tonic::include_proto!("dev.galdin.scale");
}

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
async fn classify(Json(req): Json<ClassificationRequest>) 
     -> (StatusCode, Json<ClassificationResult>) {  
        let mut client = ScaleServiceClient::connect("http://host.docker.internal:50051").await.unwrap();
        let request = tonic::Request::new( ClassifyObesityLevelRequest{
            age: req.age.into(),
            num_meals: req.num_meals as u32,
            food_bw_meals: gen::FoodBetweenMeals::Sometimes.into(),
            sex: gen::Sex::Female.into(),
            height: req.height,
            weight: req.weight,
            physical_act_freq: req.physical_act_freq,
            veg_in_meals: req.veg_in_meals,
            is_smoker: req.is_smoker,
            water_intake: req.water_intake,
            monitors_calories: req.monitors_calories,
            screen_time: req.screen_time
        });
        
        let response = client.classify_obesity_level(request).await.unwrap();
        // let level = ObesityLevel::from(response.get_ref().level);
        return (StatusCode::OK, Json(ClassificationResult{
            level: ObesityLevel::NormalWeight
        }));
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
    #[serde(rename = "insufficient_weight")] InsufficientWeight = 0, 
    #[serde(rename = "normal_weight")]       NormalWeight       = 1, 
    #[serde(rename = "overweight_level_1")]  OverweightLevel1   = 2, 
    #[serde(rename = "overweight_level_2")]  OverweightLevel2   = 3,
    #[serde(rename = "obesity_type_1")]      ObesityType1       = 4, 
    #[serde(rename = "obesity_type_2")]      ObesityType2       = 5, 
    #[serde(rename = "obesity_type_3")]      ObesityType3       = 6, 
}
