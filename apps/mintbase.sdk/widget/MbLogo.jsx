const { src, width, customStyle } = props;

const Container = styled.div`
  ${customStyle}
`;

return (
  <Container>
    <Widget
      src="test.near/widget/MbIcon"
      props={{
        name: src || "mintbase",
        size: width || "128px",
      }}
    />
  </Container>
);
