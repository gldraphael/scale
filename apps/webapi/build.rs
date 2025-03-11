fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::compile_protos("../messages/scale_service.proto")?;
    Ok(())
}
