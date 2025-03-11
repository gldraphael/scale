class CategoryMapper:
    
    def __init__(self):
        self._map = {
            'female': 0,
            'male': 1,
            'always': 2,
            'frequently': 3,
            'never': 4,
            'sometimes': 5,
            'automobile': 6,
            'bike': 7,
            'motorbike': 8,
            'public_transportation': 9,
            'walking': 10,
            'insufficient_weight': 11,
            'normal_weight': 12,
            'obesity_type_1': 13,
            'obesity_type_2': 14,
            'obesity_type_3': 15,
            'overweight_level_1': 16,
            'overweight_level_2': 17,
        }
        self._reverse_map = {v: k for k, v in self._map.items()}


    def encode(self, category: str) -> int:
        # Ignore non-string values
        if not isinstance(category, str):
            return category
        # Throw for unexpected strings
        if category not in self._map:
            raise ValueError(f"Unknown category: {category}")

        return self._map[category]


    def decode(self, code: int) -> str:
        if code not in self._reverse_map:
            raise ValueError(f"Unknown code: {code}")

        return self._reverse_map[code]
