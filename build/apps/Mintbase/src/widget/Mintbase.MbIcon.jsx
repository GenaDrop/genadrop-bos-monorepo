const [svg, setSVG] = useState("");
const [testSvg, setTestSvg] = useState("");
const name = props.name;
const color = props.color || "mb-blackblue";
const darkColor = props.darkColor;
const size = props.size || "24px";
const height = props.height || size;
const customStyle = props.customStyle || "";
const isCircle = name === "circle";
let filter = () => {
  switch (color) {
    case "mb-blackblue":
      return "invert(10%) sepia(8%) saturate(4650%) hue-rotate(192deg) brightness(95%) contrast(109%)";
    case "mb-white":
      return "invert(100%) sepia(1%) saturate(255%) hue-rotate(24deg) brightness(114%) contrast(100%)";
    case "mb-black":
      return "invert(0%) sepia(6%) saturate(25%) hue-rotate(224deg) brightness(107%) contrast(107%)";
    case "mb-blue-300":
      return " invert(36%) sepia(10%) saturate(3250%) hue-rotate(196deg) brightness(93%) contrast(88%)";
    case "mb-blue-100":
      return "invert(80%) sepia(18%) saturate(1534%) hue-rotate(192deg) brightness(105%) contrast(104%)";
    case "mb-red":
      return "invert(76%) sepia(68%) saturate(2071%) hue-rotate(191deg) brightness(102%) contrast(97%)";
    default:
      return "";
  }
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  ${customStyle}
  img {
    width: ${isCircle ? "0.75rem" : size};
    height: ${isCircle ? "0.75rem" : height};
    border-radius: ${isCircle ? "50%" : "0"};
    filter: ${filter};
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
  }
}, []);
// useEffect(() => {}, [svgUrl]);
return (
  <Container>
    {/* {testSvg} */}
    <img src={svg} alt={svg} />
  </Container>
);
