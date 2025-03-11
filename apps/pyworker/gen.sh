INPUT_DIR=../messages
OUTPUT_DIR=./src/scale/gen

mkdir -p $OUTPUT_DIR
python -m grpc_tools.protoc           \
        --proto_path=$INPUT_DIR       \
        --python_out=$OUTPUT_DIR      \
        --grpc_python_out=$OUTPUT_DIR \
    $INPUT_DIR/*.proto
