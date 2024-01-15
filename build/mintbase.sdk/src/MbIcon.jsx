const [svg, setSVG] = useState("");

const name = props.name;
const color = props.color || "mb-blackblue";
const darkColor = props.darkColor;
const size = props.size || "24px";
const height = props.height || size;
const cutomStyle = props.cutomStyle || "";
const mode = props.mode;

const isCircle = name === "circle";

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${cutomStyle}
  img {
    width: ${isCircle ? "0.75rem" : size};
    height: ${isCircle ? "0.75rem" : height};
    border-radius: ${isCircle ? "50%" : "0"};
  }
`;

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const icons = "bafkreibonknhz4t4dj5kyfm4oghlv6ymmbyfk7b3a64bdkdxmqca56cpwq";

useEffect(() => {
  if (name) {
    asyncFetch(ipfsUrl(icons)).then((res) => {
      const icon = ipfsUrl(res?.body[name]);
      asyncFetch(icon).then((res) => {
        const svgBlob = new Blob([res?.body], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);
        setSVG(svgUrl);
      });
    });
  }
}, []);
return (
  <Container>
    <img src={svg} alt="" />
  </Container>
);
// className={`w-3 h-3 rounded-full bg-${color} dark:bg-${darkColor}`}

// className={`fill-current text-${color} dark:text-${darkColor}`}
