import asyncio
from grpclib.server import Server
from scale.services import ScaleService

async def main():
    print("Loading the model...")
    ScaleService.load(model_path="./models/obs-v0.1.0.pkl")
    server = Server([ScaleService()])
    await server.start("127.0.0.1", 50051)
    print("Server starting at port 50051")
    await server.wait_closed()

if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())
