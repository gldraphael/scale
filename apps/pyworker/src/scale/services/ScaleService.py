from pandas import DataFrame
from sklearn.ensemble import RandomForestClassifier
from dev.galdin.scale import ClassifyObesityLevelRequest, ClassifyObesityLevelResponse, ScaleServiceBase, ObesityLevel, Sex
from scale.services.CategoryMapper import CategoryMapper
from joblib import load

class ScaleService(ScaleServiceBase):
    
    __feature_names = ['sex','age','height','weight','has_family_history','freq_high_calorie_intake','veg_in_meals','num_meals','food_bw_meals','is_smoker','water_intake','monitors_calories','physical_act_freq','screen_time','alcohol_freq','transportation']
    __mapper = CategoryMapper()
    __clf: RandomForestClassifier = None
    
    def load(model_path: str):
        with open(model_path, "rb") as f:
            ScaleService.__clf = load(f)
    
    async def classify_obesity_level(self, request: ClassifyObesityLevelRequest) -> ClassifyObesityLevelResponse:
        if ScaleService.__clf is None:
            raise ValueError("The model was not loaded. Did you call ScaleService.load()?")
        
        user_input_values = [request.sex.name.lower(),request.age,request.height,request.weight,request.has_family_history,request.freq_high_calorie_intake,request.veg_in_meals,request.num_meals,request.food_bw_meals.name.lower(),request.is_smoker,request.water_intake,request.monitors_calories,request.physical_act_freq,request.screen_time,request.alcohol_freq.name.lower(),request.transportation.name.lower()]
        print(user_input_values)
        encoded_user_input_values = [ScaleService.__mapper.encode(i) for i in user_input_values]
        model_input = DataFrame([encoded_user_input_values], columns=ScaleService.__feature_names)
        
        prediction: str = ScaleService.__mapper.decode(ScaleService.__clf.predict(model_input)[0])
        
        return ClassifyObesityLevelResponse(level=ObesityLevel.from_string(prediction.upper()))
