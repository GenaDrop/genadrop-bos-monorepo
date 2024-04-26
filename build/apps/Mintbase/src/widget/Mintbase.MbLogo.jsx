const { src, width, customStyle } = props;
const Container = styled.div`
  ${customStyle}
`;
const MbLogo = () => {
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
};
return { MbLogo };
