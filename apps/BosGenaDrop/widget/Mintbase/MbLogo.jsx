const { src, width, customStyle } = props;

const Container = styled.div`
  ${customStyle}
`;

return (
  <Container>
    <Widget
      src="bos.genadrop.near/widget/Mintbase.MbIcon"
      props={{
        name: src || "mintbase",
        size: width || "128px",
      }}
    />
  </Container>
);
