export class ApiService {
    async classify(req: ClassificationRequest): Promise<ClassificationResponse> {
        const response = await fetch('http://localhost:8808/classify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              age: req.age,
              height: req.height,
              weight: req.weight,
              alcohol_freq: req.alcohol_freq,
              food_bw_meals: req.food_bw_meals,
              is_smoker: req.is_smoker,
              monitors_calories: req.monitors_calories,
              num_meals: req.num_meals,
              physical_act_freq: req.physical_act_freq,
              screen_time: req.screen_time,
              sex: req.sex,
              transportation: req.transportation,
              veg_in_meals: req.veg_in_meals,
              water_intake: req.water_intake,
            })
          })
        return await response.json() as ClassificationResponse
    }
}

export type Sex = 'male' | 'female'
export type Frequency = 'never' | 'sometimes' | 'frequently' | 'always'
export type Transportation = 'walking' | 'bike' | 'motorbike' | 'public_transportation' | 'automobile' 
export type ObesityLevel = "insufficient_weight" | "normal_weight" | "overweight_level_1" | "overweight_level_2" | "overweight_level_3" | "obesity_type_1" | "obesity_type_1" | "obesity_type_3"

interface ClassificationRequest {
  age: number
  sex: Sex
  weight: number
  height: number

  monitors_calories: boolean
  num_meals: number
  veg_in_meals: number
  food_bw_meals:  Frequency
  alcohol_freq: Frequency
  water_intake: number

  is_smoker: boolean
  physical_act_freq: number
  screen_time: number
  transportation: Transportation
}

interface ClassificationResponse {
    level: ObesityLevel
}
