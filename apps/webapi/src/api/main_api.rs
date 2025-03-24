use axum::{
    http::StatusCode, Json, extract::State, debug_handler
};
use config::Config;
use serde::{Deserialize, Serialize};
use strum_macros::FromRepr;
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use gen::ClassifyObesityLevelRequest;
use gen::scale_service_client::ScaleServiceClient;

mod gen {
    tonic::include_proto!("dev.galdin.scale");
}

pub(crate) fn router(config: Config) -> OpenApiRouter {
    return OpenApiRouter::new()
        .routes(routes!(classify))
        .with_state(config);
}

#[utoipa::path(
    post,
    path = "/classify",
    responses(
        (status = 200, body = [ClassificationResult])
    )
)]
#[debug_handler]
async fn classify(State(config): State<Config>, Json(req): Json<ClassificationRequest>) 
     -> (StatusCode, Json<ClassificationResult>) {  
        let classifier_host = config
            .get_string("classifier_host")
            .unwrap();
        let mut client = ScaleServiceClient::connect(classifier_host).await.unwrap();
        let request = tonic::Request::new( ClassifyObesityLevelRequest{
            age: req.age.into(),
            num_meals: req.num_meals as u32,
            food_bw_meals: gen::Frequency::from_repr(req.food_bw_meals as i32).unwrap().into(),
            sex: gen::Sex::from_repr(req.sex as i32).unwrap().into(),
            height: req.height,
            weight: req.weight,
            physical_act_freq: req.physical_act_freq,
            veg_in_meals: req.veg_in_meals,
            is_smoker: req.is_smoker,
            water_intake: req.water_intake,
            monitors_calories: req.monitors_calories,
            screen_time: req.screen_time,
            alcohol_freq: gen::Frequency::from_repr(req.alcohol_freq as i32).unwrap().into(),
            transportation: gen::Transportation::from_repr(req.transportation as i32).unwrap().into(),
            has_family_history: req.has_family_history,
            freq_high_calorie_intake: req.has_high_calorie_diet
        });
        
        let response = client.classify_obesity_level(request).await.unwrap();
        return (StatusCode::OK, Json(ClassificationResult{
            level: ObesityLevel::from_repr(response.get_ref().level as usize).unwrap()
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
    transportation: Transportation,
    has_family_history: bool,
    has_high_calorie_diet: bool
}

#[derive(Serialize, ToSchema)]
struct ClassificationResult {
    level: ObesityLevel
}

    
#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
enum Sex {
    Male = 0,
    Female = 1, 
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
enum FoodBetweenMeals {
    Never = 0,
    Sometimes = 1, 
    Frequently = 2, 
    Always = 3, 
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
enum AlcoholFrequency {
    Never = 0,
    Sometimes = 1, 
    Frequently = 2, 
    Always = 3,
}

#[derive(Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
enum Transportation {
    Automobile, 
    Bike, 
    Motorbike,
    PublicTransportation, 
    Walking
}

#[derive(Serialize, ToSchema, FromRepr)]
#[serde(rename_all = "snake_case")]
enum ObesityLevel {
    InsufficientWeight = 0, 
    NormalWeight       = 1, 
    #[serde(rename = "overweight_level_1")]  OverweightLevel1   = 2, 
    #[serde(rename = "overweight_level_2")]  OverweightLevel2   = 3,
    #[serde(rename = "obesity_type_1")]      ObesityType1       = 4, 
    #[serde(rename = "obesity_type_2")]      ObesityType2       = 5, 
    #[serde(rename = "obesity_type_3")]      ObesityType3       = 6, 
}
