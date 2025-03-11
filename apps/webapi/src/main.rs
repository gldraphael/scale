use std::{io::Error, net::{Ipv4Addr, SocketAddr}};
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
    #[derive(OpenApi)]
    #[openapi(
        info(
            title = "scale API", description = "Obesity class identifier"
        )
    )]
    struct ApiDoc;

    let (router, api) = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .merge(api::main_api::router())

        .split_for_parts();

    let router = router
        .merge(Scalar::with_url("/", api));

    let address = SocketAddr::from((Ipv4Addr::UNSPECIFIED, 8080));
    let listener = TcpListener::bind(&address).await?;
    axum::serve(listener, router.into_make_service()).await
}
