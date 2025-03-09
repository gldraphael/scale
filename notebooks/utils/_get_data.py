import pandas

from constants import DATASET_CSV_PATH

def get_data(csv_path = DATASET_CSV_PATH) -> pandas.DataFrame:
    csv = pandas.read_csv(csv_path)
    csv.sex = csv.sex.astype('category')
    csv.has_family_history = csv.has_family_history.map(dict(yes=True, no=False))
    csv.freq_high_calorie_intake = csv.freq_high_calorie_intake.map(dict(yes=True, no=False))
    csv.food_bw_meals = csv.food_bw_meals.astype('category')
    csv.is_smoker = csv.is_smoker.map(dict(yes=True, no=False))
    csv.monitors_calories = csv.monitors_calories.map(dict(yes=True, no=False))
    csv.alcohol_freq = csv.alcohol_freq.astype('category')
    csv.transportation = csv.transportation.astype('category')
    csv.target_obs_level = csv.target_obs_level.astype('category')
    return csv
