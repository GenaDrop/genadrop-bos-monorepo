const [svg, setSVG] = useState("");
const [testSvg, setTestSvg] = useState("");

const name = props.name;
const color = props.color || "mb-blackblue";
const darkColor = props.darkColor;
const size = props.size || "24px";
const height = props.height || size;
const customStyle = props.customStyle || "";
const mode = props.mode;

const isCircle = name === "circle";

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${customStyle}
  img {
    width: ${isCircle ? "0.75rem" : size};
    height: ${isCircle ? "0.75rem" : height};
    border-radius: ${isCircle ? "50%" : "0"};
  }
`;

const test = "bafkreigpzpmxr64tukzkmuokfxwrzmjeqsehy3cb6ma73s6ugqyqevqnyy";

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
    // asyncFetch(ipfsUrl(test)).then((res) => {
    //   console.log(res?.body[name]);
    //   setTestSvg(res?.body[name]);
    // });
  }
}, []);

// useEffect(() => {}, [svgUrl]);
return (
  <Container>
    {/* {testSvg} */}
    <img src={svg} alt={svg} />
  </Container>
);
// className={`w-3 h-3 rounded-full bg-${color} dark:bg-${darkColor}`}

// className={`fill-current text-${color} dark:text-${darkColor}`}
