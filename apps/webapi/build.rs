fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::configure()
        .build_server(false)
        .enum_attribute(".", "#[derive(strum_macros::FromRepr)]")
        .compile_protos(&["../messages/scale_service.proto"], &["../messages"])?;
    Ok(())
}
