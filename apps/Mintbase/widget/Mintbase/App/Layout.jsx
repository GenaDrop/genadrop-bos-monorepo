const data = fetch(`https://httpbin.org/headers`);
const gatewayURL = data?.body?.headers?.Origin ?? "";

const Container = gatewayURL.includes("near.org")
  ? styled.div`
      width: 100%;
    `
  : styled.div`
      position: fixed;
      inset: 73px 0px 0px;
      width: 100%;
      overflow-y: scroll;
    `;
return {
  Layout: ({ variant, blocks, children, isHome }) => {
    switch (variant) {
      case "standard": {
        const { Header, Footer } = blocks;
        return (
          <Container>
            <div
              className="layout"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <Header isHome={isHome.page === "home"} />
              <div
                className="content"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {children}
              </div>
              <Footer />
            </div>
          </Container>
        );
      }
    }
  },
};
