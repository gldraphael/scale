import scale.gen.classify_obesity_level_request_pb2
import scale.gen.classify_obesity_level_request_pb2_grpc
import scale.gen.obesity_level_pb2
import scale.gen.obesity_level_pb2_grpc

class ScaleService(scale.gen.scale_service_pb2_grpc.ScaleService):
    def ClassifyObesityLevel(self, request, context):
        return 1
