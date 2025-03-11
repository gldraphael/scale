INPUT_DIR=../messages
OUTPUT_DIR=./src/scale/gen

mkdir -p $OUTPUT_DIR
protoc \
    -I $INPUT_DIR \
    --python_betterproto_out=$OUTPUT_DIR \
    $INPUT_DIR/scale_service.proto
