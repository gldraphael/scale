from concurrent import futures
import logging

import grpc

from scale.gen import scale_service_pb2_grpc
from scale.services import ScaleService


def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    scale_service_pb2_grpc.add_ScaleServiceServicer_to_server(ScaleService.ScaleService(), server)
    server.add_insecure_port(f"[::]: {port}")
    server.start()
    print(f"Server started. Listening on port {port}")
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
