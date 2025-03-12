use std::{io::Error, net::{Ipv4Addr, SocketAddr}};
use config::{Config, FileFormat};
use tokio::net::TcpListener;
use utoipa::OpenApi;
use utoipa_axum::router::OpenApiRouter;
use utoipa_scalar::{Scalar, Servable};

mod gen {
    tonic::include_proto!("dev.galdin.scale");
}

pub mod api;

#[tokio::main]
async fn main() -> Result<(), Error> {

    let settings = Config::builder()
        .add_source(config::File::with_name("settings").format(FileFormat::Yaml))
        .add_source(
            config::Environment::with_prefix("scale")
                .try_parsing(true)
        )
        .build()
        .unwrap();
    
    #[derive(OpenApi)]
    #[openapi(
        info(
            title = "scale API", description = "Obesity class identifier"
        )
    )]
    struct ApiDoc;

    let (router, api) = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .merge(api::main_api::router(settings.clone()))
        .split_for_parts();


    let router = router
        .merge(Scalar::with_url("/", api));


    let port = settings.get_int("server_port").unwrap() as u16;
    let address = SocketAddr::from((Ipv4Addr::UNSPECIFIED, port));
    let listener = TcpListener::bind(&address).await?;
    println!("Starting the server at port {}", port);
    axum::serve(listener, router.into_make_service()).await
}
