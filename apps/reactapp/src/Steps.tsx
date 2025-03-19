import { Flex, Text, Link, Button, Box, TextField, RadioGroup } from "@radix-ui/themes";
import { useState } from 'react';
import { ApiService, Frequency, ObesityLevel, Sex, Transportation } from "./services/ApiService";

export default function Steps({ githubUrl }: {githubUrl: string}){
    const [currentStep, setCurrentStep] = useState(0)

    const [age, setAge] = useState(18);
    const [sex, setSex] = useState<Sex>('male');
    const [height, setHeight] = useState(185);
    const [weight, setWeight] = useState(65);
    const [hasFamilyHistory, setHasFamilyHistory] = useState(false);

    const [waterIntake, setWaterIntake] = useState(2.5);
    const [monitorsCalories, setMonitorsCalories] = useState(false);
    const [numMainMeals, setNumMainMeals] = useState(3);
    const [foodBwMeals, setFoodBwMeals] = useState<Frequency>("frequently")
    const [numMainMealsWithVeg, setNumMainMealsWithVeg] = useState(0);

    const [isSmoker, setIsSmoker] = useState(false);
    const [screenTime, setScreenTime] = useState(2);
    const [alcoholFreq, setAlcoholFreq] = useState<Frequency>("sometimes")
    const [physicalActivityFreq, setPhysicalActivityFreq] = useState(1)
    const [travel, setTravel] = useState<Transportation>("automobile")

    const [response, setResponse] = useState<ObesityLevel|null>(null);
    
    const api = new ApiService()

    switch(currentStep) {
      case 0:
        return (
          <Flex direction="column" gap="4" p="4">
            <Text>
              This is an experimental classifier designed to predict obesity levels using a range of metrics beyond just height and weight.
            </Text>
            <Text>
              Details about the dataset, model training, and implementation are available <Link href={githubUrl}>here</Link>. 
            </Text>
            <Text>
              Feel free to play with different input values. 
            </Text>
            <Button autoFocus onClick={() => setCurrentStep(currentStep+1)}>Ok, I'm ready!</Button>
            
          </Flex>
        )
      case 1:
        return (
          <Flex direction="column" gap="4" p="4">
            <Text size="5"></Text>

          <Box>
            <label>Your age</label>
            <TextField.Root
              autoFocus
              type="number"
              min="12"
              max={120}
              defaultValue={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
              aria-label="Age"
            />
          </Box>

          <Box>
            <label>Sex</label>
            <RadioGroup.Root
              value={sex}
              onValueChange={val => setSex(val as Sex)}
              aria-label="Sex"
            >
              <RadioGroup.Item value="male">
                <label>Male</label>
              </RadioGroup.Item>
              <RadioGroup.Item value="female">
                <label>Female</label>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </Box>

          <Box>
            <label>Height (cm)</label>
            <TextField.Root
              type="number"
              min={100}
              max={200}
              defaultValue={height}
              onChange={(e) => setHeight(Number.parseInt(e.target.value))}
              aria-label="Height"
            />
          </Box>

          <Box>
            <label>Weight (kg)</label>
            <TextField.Root
              defaultValue={weight}
              onChange={(e) => setWeight(Number.parseInt(e.target.value))}
              aria-label="Weight"
            />
          </Box>

          <Box>
            <label>Does your family have a history of overweight or obesity, such as in your parents or other close relatives?</label>
            <RadioGroup.Root
              value={hasFamilyHistory.toString()}
              onValueChange={(val) => setHasFamilyHistory(val.toLowerCase() == 'true')}
              aria-label="Sex"
            >
              <RadioGroup.Item value='true'>
                <label>Yes</label>
              </RadioGroup.Item>
              <RadioGroup.Item value='false'>
                <label>No</label>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </Box>

            <Button onClick={() => setCurrentStep(currentStep+1)}>Next</Button>
          </Flex>
        )
      case 2:
        return (
          <Flex direction="column" gap="4" p="4">
            <Text size="5">Diet</Text> 

            <Box>
              <label>Do you monitor your calorie intake?</label>
              <RadioGroup.Root
                value={monitorsCalories.toString()}
                onValueChange={(val) => setMonitorsCalories(val.toLowerCase() == 'true')}
                aria-label="Do you monitor calories?"
              >
                <RadioGroup.Item value='true' autoFocus>
                  <label>Yes</label>
                </RadioGroup.Item>
                <RadioGroup.Item value='false'>
                  <label>No</label>
                </RadioGroup.Item>
              </RadioGroup.Root>
            </Box>

            
            <Box>
              <label>How many main meals do you typically eat in a day</label>
              <TextField.Root autoFocus
                type="number"
                min={1}
                max={5}
                defaultValue={numMainMeals}
                onChange={(e) => setNumMainMeals(Number.parseInt(e.target.value))}
                aria-label="Number of main meals"
              />
            </Box>

            <Box>
              <label>How many of these meals include vegetables?</label>
              <TextField.Root
                type="number"
                min={0}
                max={numMainMeals}
                defaultValue={numMainMealsWithVeg}
                onChange={(e) => setNumMainMealsWithVeg(Number.parseInt(e.target.value))}
                aria-label="Number of main meals with vegetables"
              />
            </Box>

            <Box>
              <label>Do you usually snack or eat anything between your main meals?</label>
              <RadioGroup.Root
                defaultValue={foodBwMeals}
                onValueChange={val => setFoodBwMeals(val as Frequency)}
                aria-label="Number of snack meals">
                  <RadioGroup.Item value="never"><label>Never</label></RadioGroup.Item>
                  <RadioGroup.Item value="sometimes"><label>Sometimes</label></RadioGroup.Item>
                  <RadioGroup.Item value="frequently"><label>Frequently</label></RadioGroup.Item>
                  <RadioGroup.Item value="always"><label>Always</label></RadioGroup.Item>
                </RadioGroup.Root>
            </Box>

            <Box>
              <label>How much water do you drink each day? (litres)</label>
              <TextField.Root
                type="number"
                min={0}
                max={5}
                defaultValue={waterIntake}
                onChange={(e) => setWaterIntake(Number.parseInt(e.target.value))}
                aria-label="Water intake"
              />
            </Box>

            <Button onClick={() => setCurrentStep(currentStep+1)}>Next</Button>
          </Flex>
        )
      case 3:
        return (
          <Flex direction="column" gap="4" p="4">
            <Text size="5">Lifestyle</Text>                         

            <Box>
              <label>Do you smoke?</label>
              <RadioGroup.Root
                value={isSmoker.toString()}
                onValueChange={(val) => setIsSmoker(val.toLowerCase() == 'true')}
                aria-label="Do you smoke?"
              >
                <RadioGroup.Item value='true'>
                  <label>Yes</label>
                </RadioGroup.Item>
                <RadioGroup.Item value='false'>
                  <label>No</label>
                </RadioGroup.Item>
              </RadioGroup.Root>
            </Box>

            <Box>
              <label>How often do you consume alcohol?</label>
              <RadioGroup.Root
                value={alcoholFreq}
                onValueChange={val => setAlcoholFreq(val as Frequency)}
                aria-label="Alcohol consumption frequency"
              >
                <RadioGroup.Item value="never"><label>Never</label></RadioGroup.Item>
                <RadioGroup.Item value="sometimes"><label>Sometimes</label></RadioGroup.Item>
                <RadioGroup.Item value="frequently"><label>Frequently</label></RadioGroup.Item>
                <RadioGroup.Item value="always"><label>Always</label></RadioGroup.Item>
              </RadioGroup.Root>
            </Box>

            <Box>
            <label>How often do you engage in physical activity?</label>
            <TextField.Root
              type="number"
              min={0}
              max={3}
              autoFocus
              defaultValue={physicalActivityFreq}
              onChange={(e) => setPhysicalActivityFreq(Number.parseInt(e.target.value))}
              aria-label="Age"
            />
          </Box>

            <Box>
              <label>What's your daily screen-time across all devices? (hours)</label>
              <TextField.Root
                type="number"
                min={0}
                max={4}
                defaultValue={screenTime}
                onChange={(e) => setScreenTime(Number.parseInt(e.target.value))}
                aria-label="Screen time per day"
              />
            </Box>

            <Box>
              <label>How do you usually travel?</label>
              <RadioGroup.Root
                value={travel}
                onValueChange={val => setTravel(val as Transportation)}
                aria-label="Travel"
              >
                <RadioGroup.Item value="walking"><label>Walking</label></RadioGroup.Item>
                <RadioGroup.Item value="public_transportation"><label>Public transportation</label></RadioGroup.Item>
                <RadioGroup.Item value="bike"><label>Bike</label></RadioGroup.Item>
                <RadioGroup.Item value="motorbike"><label>Motorbike</label></RadioGroup.Item>
                <RadioGroup.Item value="automobile"><label>Automobile</label></RadioGroup.Item>
              </RadioGroup.Root>
            </Box>
            <Button onClick={
              async () => {
                  setResponse((await api.classify({
                    age: age,
                    food_bw_meals: foodBwMeals,
                    sex: sex,
                    weight: weight,
                    height: height,
                    alcohol_freq: alcoholFreq,
                    is_smoker: isSmoker,
                    monitors_calories: monitorsCalories,
                    num_meals: numMainMeals,
                    veg_in_meals: numMainMealsWithVeg,
                    physical_act_freq: physicalActivityFreq,
                    screen_time: screenTime,
                    transportation: travel,
                    water_intake: waterIntake
                  })).level)
                  setCurrentStep(currentStep + 1)
                }
              }>Submit</Button>
          </Flex>
        )
      case 4:
        return(
          <Flex direction="column">
            <Box height="200px">
              {response}
            </Box>
          </Flex>
        )
        
      default:
        setCurrentStep(0)
        return
    }
};
