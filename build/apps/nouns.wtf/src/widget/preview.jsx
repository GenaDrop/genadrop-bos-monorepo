const title = props.title || "Lorem ipsum dolor sit amet.";
const text =
  props.text ||
  "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum vel temporibus voluptatibus et, illo neque sapiente tenetur. Dolorem ad nobis eum dicta? Ipsum nemo, earum dolorem vero blanditiis neque laudantium!";
const Title = styled.div`
  font-family: "Londrina Solid", sans-serif;
  font-size: 5rem;
  color: #14161b;
  margin: 4px 0 0;
  line-height: 110%;
`;
const Text = styled.div`
  font-size: 1.2rem;
  padding-top: 1rem;
  margin-bottom: 1rem;
`;
const Info = styled.div`
  font-size: 0.875em;
  color: var(--brand-warm-light-text);
  a {
    text-decoration: underline;
    color: var(--brand-warm-light-text);
  }
`;
const PreviewMedia = styled.div`
  width: 100%;
  min-height: 16em;
  height: 100%;
  background-color: black;
`;
return (
  <div
    className={`row ${
      props.mirror && "flex-row-reverse"
    } align-items-center container pt-5`}
  >
    <div className="col-lg-6 pl-2">
      <Title>{title}</Title>
      <Text>{text}</Text>
    </div>
    <div className="col-lg-6">
      {props.media ? (
        props.media
      ) : (
        <PreviewMedia
          height={"100%"}
          src="https://www.youtube.com/watch?v=lOzCA7bZG_k&t=148s"
        ></PreviewMedia>
      )}
      {props.mediaTooltip && <Info>{props.mediaTooltip}</Info>}
    </div>
  </div>
);
