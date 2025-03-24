export class ApiService {
    async classify(req: ClassificationRequest): Promise<ClassificationResponse> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await fetch(`${(window as any).config.ApiBase}/classify`, {
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
              has_family_history: req.has_family_history,
              has_high_calorie_diet: req.has_high_calorie_diet
            })
          })
        return await response.json() as ClassificationResponse
    }
}

export type Sex = 'male' | 'female'
export type Frequency = 'never' | 'sometimes' | 'frequently' | 'always'
export type Transportation = 'walking' | 'bike' | 'motorbike' | 'public_transportation' | 'automobile' 
export type ObesityLevel = "insufficient_weight" | "normal_weight" | "overweight_level_1" | "overweight_level_2" | "obesity_type_1" | "obesity_type_2" | "obesity_type_3"

interface ClassificationRequest {
  age: number
  sex: Sex
  weight: number
  height: number
  
  has_family_history: boolean
  has_high_calorie_diet: boolean
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

export interface ClassificationResponse {
    level: ObesityLevel
}
