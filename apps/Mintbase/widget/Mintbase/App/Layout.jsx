return {
  Layout: ({ variant, blocks, children, isHome, ...props }) => {
    console.log("layout: ", props);
    switch (variant) {
      case "standard": {
        const { Header, Footer } = blocks;
        return (
          <div
            className="layout"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <Header isHome={isHome?.page === "home"} {...props} />
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
        );
      }
    }
  },
};
