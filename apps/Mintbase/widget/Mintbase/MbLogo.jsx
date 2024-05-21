const { src, width, customStyle } = props;

const Container = styled.div`
  ${customStyle}
`;

const MbLogo = () => {
  return (
    <Container>
      <Widget
        src="${config_account}/widget/Mintbase.MbIcon"
        props={{
          name: src || "mintbase",
          size: width || "128px",
        }}
      />
    </Container>
  );
};

return { MbLogo };
