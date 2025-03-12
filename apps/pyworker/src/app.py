import asyncio
from grpclib.server import Server
from scale.services import ScaleService
from config import settings

async def main():
    
    print(f"Loading model: {settings.model_path}")
    ScaleService.load(model_path=settings.model_path)
    
    server = Server([ScaleService()])
    print(f"Starting server at: {settings.server.host}:{settings.server.port}")
    await server.start(settings.server.host, settings.server.port)
    await server.wait_closed()

if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.run_until_complete(main())
