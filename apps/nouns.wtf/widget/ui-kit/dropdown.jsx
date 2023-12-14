const [dropdownToggle, setDropdownToggle] = useState(false);

const title = props.title || "dropdown";
const selectStyle = props.style || "";
const menuStyle = props.menuStyle || "";
const dropdownStyle = props.dropdownStyle || "";
const options = props.options || [
  { label: "item 1", url: "/" },
  { label: "item 2", url: "/" },
  { label: "item 3", url: "/" },
];

const Dropdown = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  width: fit-content;
  .toggleTitle {
    display: flex;
    align-items: center;
    cursor: pointer;
    ${selectStyle}
    .dropdownIcon {
      height: 1em;
      width: fit-content;
      margin-left: 0.5rem;
      ${dropdownStyle}
    }
  }
  .toggleMenu {
    width: 100%;
    text-align: left;
    background-clip: padding-box;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-top: 0.125rem;
    top: 100%;
    position: absolute;
    display: none;
    flex-direction: column;
    > a {
      padding: 0.5rem 1rem;
      width: 100%;
      white-space: nowrap;
      border-bottom: 1.5px solid #e2e3e8;
      color: #5f5f5f;
      font-weight: 700;
      text-decoration: none;
      :last-child {
        border: none;
      }
    }
    ${menuStyle}
  }
`;

const Arrowdown = () => (
  <svg
    style={{ transform: dropdownToggle ? "rotate(180deg)" : "rotate(0deg)" }}
    className="dropdownIcon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--> */}
    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
  </svg>
);

return (
  <Dropdown
    onClick={() => {
      setDropdownToggle(!dropdownToggle);
    }}
  >
    <div className="toggleTitle">
      {title} <Arrowdown />
    </div>
    <div
      className="toggleMenu"
      style={{ display: dropdownToggle ? "flex" : "none" }}
    >
      {options?.map((option) => (
        <a
          href={option.url}
          key={option.label}
          target="_blank"
          rel="noreferrer"
        >
          {option.label}
        </a>
      ))}
    </div>
  </Dropdown>
);
