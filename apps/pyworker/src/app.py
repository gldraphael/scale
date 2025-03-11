import asyncio
from scale.gen.dev.galdin.scale import ClassifyObesityLevelRequest, ClassifyObesityLevelResponse, ScaleServiceBase, ObesityLevel, Sex
from grpclib.server import Server


class ScaleService(ScaleServiceBase):
    async def classify_obesity_level(self, request: ClassifyObesityLevelRequest) -> ClassifyObesityLevelResponse:
        prediction = ObesityLevel.NORMAL_WEIGHT
        if request.sex == Sex.MALE:
            prediction = ObesityLevel.OVERWEIGHT_LEVEL_1
        return ClassifyObesityLevelResponse(level=prediction)

async def main():
    server = Server([ScaleService()])
    await server.start("127.0.0.1", 50051)
    await server.wait_closed()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
