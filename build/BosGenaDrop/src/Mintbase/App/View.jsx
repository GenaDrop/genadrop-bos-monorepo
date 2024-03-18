const { Router } = VM.require(
  "bos.genadrop.near/widget/Mintbase.App.Router"
) || {
  Router: () => <></>,
};

const { config, ...passProps } = props;

if (!config) return <></>;

if (!config) {
  return (
    <p>
      unable to load config:{" "}
      {typeof config === object ? JSON.stringify(config) : config}
    </p>
  );
}

const { Layout } = VM.require(
  config.layout?.src ?? "bos.genadrop.near/widget/Mintbase.App.Layout"
) || {
  Layout: () => <></>,
};

const CSS = styled.div`
  background: ${props.isDarkModeOn ? "#101223" : "#f3f5f9"};
  .button {
  }

  .input {
  }

  .layout {
    border: 4px solid var(--main-color);
  }

  .content {
  }

  .footer {
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

// const Template = config.Template ?? (({children}) => <>{children}</>);

return (
  <CSS style={config.theme}>
    <Container>
      <Layout
        {...(config.layout?.props ?? { variant: "standard" })}
        blocks={config.blocks}
        isHome={passProps}
      >
        <Content>
          <Router config={config.router} {...passProps} />
        </Content>
      </Layout>
    </Container>
  </CSS>
);
