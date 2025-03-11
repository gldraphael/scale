import asyncio
from scale.gen.dev.galdin.scale import ClassifyObesityLevelRequest, ClassifyObesityLevelResponse, ScaleServiceBase, ObesityLevel
from grpclib.server import Server


class ScaleService(ScaleServiceBase):
    async def classify_obesity_level(self, request: ClassifyObesityLevelRequest) -> ClassifyObesityLevelResponse:
        return ClassifyObesityLevelResponse(level=ObesityLevel.NORMAL_WEIGHT)

async def main():
    server = Server([ScaleService()])
    await server.start("127.0.0.1", 50051)
    await server.wait_closed()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
