const { Router } = VM.require(
  "${config_account}/widget/Mintbase.App.Router"
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
  config.layout?.src ?? "${config_account}/widget/Mintbase.App.Layout"
) || {
  Layout: () => <></>,
};

const CSS = styled.div`
  background: ${props.isDarkModeOn ? "#101223" : "#f3f5f9"};
  /* vars */
    --mb-blackblue: #070c2b;
    --mb-red: #ff2424;
    --mb-red-35: #3a1c2a;
    --mb-red-15: #ffdede;
    --gray-900: #101223;
    --gray-850: #1e2030;
    --gray-800: #282a3a;
    --gray-700: #404252;
    --gray-600: #5b5d6b;
    --gray-500: #777986;
    --gray-400: #9496a1;
    --gray-300: #b3b5bd;
    --gray-200: #d2d4da;
    --gray-150: #e8eaf0;
    --gray-100: #f3f4f8;
    --gray-50: #f9f9f9;
    --blue-300: #4f58a3;
    --blue-300-35: #c2c5dd;
    --blue-300-15: #ebedfb;
    --blue-100: #c5d0ff;
    --blue-100-35: #3f4254;
    --blue-100-15: #2b2e42;
    --purple-300: #8c4fe5;
    --purple-100: #e087ff;
    --orange-300: #ff6c3b;
    --orange-100: #ff9470;
    --success-300: #0a7d6c;
    --success-100: #9fed8f;
    --warning-300: #f2d413;
    --warning-100: #ffe855;
    --error-300: #c74c4c;
    --error-100: #ed5a5a;
  /* colour vars end */
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
        allProps={passProps}
      >
        <Content>
          <Router config={config.router} {...passProps} />
        </Content>
      </Layout>
    </Container>
  </CSS>
);
