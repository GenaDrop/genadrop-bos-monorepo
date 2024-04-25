const [display, setDisplay] = useState("Colors");
const [currentTab, setTab] = useState("Preview");
const [mode, setMode] = useState("light");
const [icons, setIcons] = useState([]);
const [input, setInput] = useState("");
// MbModal
const accountId = props.accountId || "bos.genadrop.near";
const [open, setOpen] = useState(true);
const { cssColors, colors, typographyClasses } = VM.require(
  `${accountId}/widget/Mintbase.Theme`
);
const isDarkModeOn = mode === "dark";
const tabs = ["Preview", "Docs"];
const Theme = styled.div`
  ${cssColors}
`;
const TableBodyContents = [
  {
    amount: "557.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "237 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "2 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "3.4 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "557.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "557.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "5 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "17.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "107.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "227.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "307.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
  {
    amount: "237.6 N",
    account: "mintbase.near",
    created: "1 hour ago",
    expired: "1 day",
    tx: "...",
  },
];
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${isDarkModeOn ? "#333333" : "white"};
  .left-nav {
    text-align: left;
    background: ${isDarkModeOn ? "#2F2F2F" : "#f6f9fc"};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    > .title {
      font-weight: 600;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: rgb(153, 153, 153);
      padding: 0.5rem 1rem;
    }
    > .item {
      padding: 0.5rem 1rem;
      font-size: 14px;
      cursor: pointer;
      transition: all 300ms ease-in-out;
      color: ${isDarkModeOn ? "white" : "black"};
      :hover {
        background: #1ea8fd79;
        color: white;
      }
      &.active {
        background: #1ea7fd;
        color: white;
      }
    }
  }
  .view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    .top-nav {
      padding: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: auto;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      margin-bottom: 2rem;
      div {
        font-weight: 500;
        border-bottom: 1px solid transparent;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        color: ${isDarkModeOn ? "#999999" : "black"};
        :hover {
          border-color: #1ea7fd;
          color: #1ea7fd;
        }
        &.active {
          border-color: #1ea7fd;
          color: #1ea7fd;
        }
      }
    }
  }
`;
const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  > .title {
    font-size: 1.5rem;
    font-weight: 500;
    width: 100%;
    color: ${isDarkModeOn ? "#999999" : "black"};
  }
  > .icon {
    display: flex;
    width: 128px;
    height: 128px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 10px;
    border-radius: 6px;
    border: 1px solid black;
    background: rgb(243, 244, 248);
    overflow: hidden;
    > div:first-child {
      margin: auto;
    }
    .name {
      background: rgb(210, 212, 218);
      width: 100%;
      padding: 0.5rem 0;
      text-align: center;
    }
  }
`;
const Color = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${isDarkModeOn ? "white" : "black"};
  .color {
    background: ${(props) => props.hex};
    width: 120px;
    height: 120px;
  }
  .label {
    font-weight: 500;
  }
`;
const radioButtons = [
  { label: "Radio button 1", value: "radio1", id: "radio1" },
  { label: "Radio button 2", value: "radio2", id: "radio2" },
];
const ColorPreview = (
  <IconsContainer>
    {Object.keys(colors)?.map((key) => (
      <>
        <div className="title">{key}</div>
        {colors[key]?.map((color) => (
          <Color hex={color.hex}>
            <div className="color" />
            <div className="label">{color.label}</div>
            <div className="value">{color.hex}</div>
          </Color>
        ))}
      </>
    ))}
  </IconsContainer>
);
const Typography = styled.div`
  margin-top: 10px;
  ${(props) => props.typographyStyle}
`;
const TypographyContainer = Object.keys(typographyClasses).map((typography) => (
  <Typography typographyStyle={typographyClasses[typography]}>
    {typography}
  </Typography>
));
const kit = {
  core: {
    MbIcon: {
      preview: (
        <IconsContainer>
          {icons.map((icon) => (
            <div className="icon">
              <Widget
                src={`${accountId}/widget/Mintbase.MbIcon`}
                props={{
                  name: icon,
                  size: "34px",
                }}
              />
              <div className="name">{icon}</div>
            </div>
          ))}
        </IconsContainer>
      ),
      docs: `<Widget
      src={"${`${accountId}/widget/Mintbase.` + display}"}
      props={{
        name: "Icon Name",
        color: "",
        darkColor:"",
        size: "34px",
        height:"34px",
        cutomStyle:"",
        mode:"dark"
      }}
  />`,
    },
    Colors: {
      preview: ColorPreview,
      docs: ColorPreview,
    },
    Typography: {
      preview: TypographyContainer,
      docs: (
        <div>
          <div>
            {" "}
            const &#123; typographyClasses &#125; = VM.require('{accountId}
            /widget/Mintbase.Theme');
          </div>
          <div>
            const Container = styled.div`
            &#123;typographyClasses[className]&#125; `
          </div>
        </div>
      ),
    },
  },
  compoennts: {
    MbAction: {
      props: {
        state: "disabled",
        size: "big",
        children: <div>See Transaction</div>,
      },
    },
    MbActionText: {
      props: {
        // text, icons size
        size: "big",
        text: "https://mintbase.io",
        // text to copy
        copyText: "https://mintbase.io",
        // link icon, new tab
        iconTab: false,
        // copy icon
        iconCopy: false,
        link: "https://mintbase.io",
        modee: "dark",
      },
    },
    MbRadioButton: {
      props: {
        children: radioButtons?.map((btn) => (
          <Widget
            src={`${accountId}/widget/Mintbase.RadioButton`}
            props={{
              id: btn.id,
              label: btn.label,
              value: btn.value,
              onChange: (e) => {
                console.log(this.value);
                if (e.target.checked) {
                }
              },
            }}
          />
        )),
      },
    },
    MbArrowMenu: {
      props: {
        isActive: false,
        title: "Explore",
      },
    },
    MbSwitch: {
      props: {
        id: "switch1",
        checked: true,
        onChange: (e) => console.log(e),
      },
    },
    MbDropdownHoverMenu: {
      props: {
        children: (
          <div>
            <div>Activity</div>
            <div>Analytics</div>
            <div>Accounts</div>
            <div>Top Affiliates</div>
          </div>
        ),
        dropdownButton: (
          <Widget
            src={`${accountId}/widget/Mintbase.MbArrowMenu`}
            props={{
              isActive: false,
              title: "Explore",
            }}
          />
        ),
      },
    },
    MbDropdownMenu: {
      props: {
        isOpen: true,
        items: [
          {
            content: "Docs",
            icon: (
              <Widget
                src={`${accountId}/widget/Mintbase.MbIcon`}
                props={{
                  name: "open_new_tab",
                  size: "16px",
                }}
              />
            ),
          },
          {
            content: "Developer",
            icon: (
              <Widget
                src={`${accountId}/widget/Mintbase.MbIcon`}
                props={{
                  name: "open_new_tab",
                  size: "16px",
                }}
              />
            ),
          },
        ],
      },
    },
    MbCheckbox: {
      props: {
        label: "Checkbox 1",
        id: "checked",
        onChange: (e) => !e.target.checked,
      },
    },
    MbChip: {
      props: {
        label: "Art",
        disabled: false,
        isChecked: true,
        handleClick: (e) => {
          !e.target.checked;
        },
      },
    },
    MbNetworkMenu: {
      props: {
        isOpen: true,
        isInline: true,
        options: [
          {
            label: "NEAR TESTNET",
            value: "testnet",
            indicator: (
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#F59E0B",
                }}
              />
            ),
          },
          {
            label: "NEAR MAINNET",
            value: "mainnet",
            indicator: (
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#0A7D6C",
                }}
              />
            ),
          },
          {
            label: "ETHEREUM",
            value: "ethereum",
            indicator: (
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#4F58A3",
                }}
              />
            ),
          },
        ],
      },
    },
    MbAccordion: {
      props: {
        title: "Header Title",
        isOpen: false,
        isFixedAccordion: true,
        extraIcon: {},
        isVerifiedToken: true,
        children: (
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        ),
      },
    },
    MbTabs: {
      props: {
        tabLabels: ["NFTs", "Active auctions", "Latest Listings"],
        tabsWithFilters: [
          {
            tab: "NFTs",
            extraFilter: "Show only listed",
            onChangeExtraFilter: (value) => console.log(value),
            isExtraFilterSelected: true,
          },
        ],
        filterOptions: {
          label: "Order by",
          defaultOptionId: "newest",
          options: [
            { label: "Newest", id: "newest" },
            { label: "Oldest", id: "oldest" },
            { label: "Cheapest", id: "cheapest" },
            {
              label: "Most expensive",
              id: "most-expensive",
            },
          ],
        },
      },
    },
    MbRowList: {
      props: {
        elements: [
          {
            id: "mintbase1.near",
            isDisabled: true,
            content: (
              <Widget
                src={`${accountId}/widget/Mintbase.ListRowContent`}
                props={{
                  image: "https://i.imgur.com/gu26H6Z.png",
                  text: "mintbase1.near",
                }}
              />
            ),
          },
        ],
        deleteRow: () => null,
        addMinters: () => null,
        removeMinters: (ids) => console.log("remove", ids),
        dropDownItems: [
          {
            content: <span>Generate QR Code</span>,
            onClick: () => console.log("asdasd"),
          },
          {
            content: <span>Create Deeplink</span>,
            onClick: () => console.log("asdasd"),
          },
        ],
      },
    },
    MbTag: {
      props: {
        children: "See Transactions",
        removeTag: () => console.log("removing tags"),
      },
    },
    MbRowSelectList: {
      props: {
        elements: [
          {
            id: "mintbase1.near",
            isDisabled: true,
            content: (
              <Widget
                src={`${accountId}/widget/Mintbase.ListRowContent`}
                props={{
                  image: "https://i.imgur.com/gu26H6Z.png",
                  text: "mintbase1.near",
                }}
              />
            ),
          },
          {
            id: "mintbase2.near",
            isDisabled: false,
            content: (
              <Widget
                src={`${accountId}/widget/Mintbase.ListRowContent`}
                props={{
                  image: "https://i.imgur.com/gu26H6Z.png",
                  text: "mintbase2.near",
                }}
              />
            ),
          },
          {
            id: "mintbase3.near",
            isDisabled: false,
            content: (
              <Widget
                src={`${accountId}/widget/Mintbase.ListRowContent`}
                props={{
                  image: "https://i.imgur.com/gu26H6Z.png",
                  text: "mintbase3.near",
                }}
              />
            ),
          },
        ],
        deleteRow: () => null,
        addMinters: () => null,
        removeMinters: (ids) => console.log("remove", ids),
        dropDownItems: [
          {
            content: <span>Generate QR Code</span>,
            onClick: () => console.log("asdasd"),
          },
          {
            content: <span>Create Deeplink</span>,
            onClick: () => console.log("asdasd"),
          },
        ],
      },
    },
    MbTable: {
      props: {
        title: "Trading History",
        hasLabel: true,
        headerProps: (
          <tr id="headers">
            <td>Offer</td>
            <td>From</td>
            <td>Created</td>
            <td>Expires</td>
            <td>TX</td>
          </tr>
        ),
        loading: false,
        bodyProps: TableBodyContents.map((elm, index) => {
          return (
            <tr key={index}>
              <td>{elm.amount}</td>
              <td>{elm.account}</td>
              <td>{elm.created}</td>
              <td>{elm.expired}</td>
              <td>{elm.tx}</td>
            </tr>
          );
        }),
      },
    },
    MbTooltip: {
      props: {
        text: "Tooltip text!",
        component: <span>Tooltip</span>,
        place: "right",
      },
    },
    MbLogo: { props: { src: "mintbase" } },
    MbButton: {
      props: {
        label: "Primary",
        state: "active",
        size: "medium",
        btnType: "secondary",
        dropDownItems: undefined,
      },
    },
    MbModal: {
      props: {
        open,
        setOpen,
        onClose: null,
        topTitle: "Top Title",
        children: "Text",
        topElement: <div style={{ marginRight: "8px" }}>Help</div>,
        topElementFirst: true,
      },
    },
    MbPill: {
      props: {
        text: "Mint",
        pillTemplate: "blue",
      },
    },
    MbCharCounter: {
      props: {
        maxChars: 5,
        counter: 0,
      },
    },
    MbInput: {
      props: {
        id: "testset",
        required: true,
        placeholder: "Enter Address",
        label: "Address",
        hasPercentageLabel: true,
        value: input,
        onChange: (e) => {
          setInput(e.target.value);
        },
        type: "text",
        hasIcon: false,
        maxChars: 20,
      },
    },
    MbInfoCard: {
      props: {
        title: "Title",
        titleIcon: false,
        description: "description goes here",
        descriptionImage: null,
        descriptionIcon: "mintbase_dark_badge",
        upperIcon: null,
        isNumber: false,
      },
    },
  },
};
const iconsIpfs =
  "https://ipfs.near.social/ipfs/bafkreibonknhz4t4dj5kyfm4oghlv6ymmbyfk7b3a64bdkdxmqca56cpwq";
useEffect(() => {
  asyncFetch(iconsIpfs).then((res) => {
    const icon = Object.keys(res?.body);
    setIcons(icon);
  });
}, []);
useEffect(() => {
  Storage.set("mode", mode);
}, [mode]);
return (
  <Theme>
    <Container>
      <div className="left-nav">
        <div className="title">Cores</div>
        {Object.keys(kit.core).map((key) => (
          <div
            className={`${key === display ? "active" : ""} item`}
            onClick={() => setDisplay(key)}
            key={key}
          >
            {key}
          </div>
        ))}
        <div className="title">Components</div>
        {Object.keys(kit.compoennts).map((key) => (
          <div
            className={`${key === display ? "active" : ""} item`}
            onClick={() => setDisplay(key)}
            key={key}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="view">
        <div className="top-nav">
          {tabs.map((tab) => (
            <div
              onClick={() => setTab(tab)}
              className={currentTab === tab && "active"}
            >
              {tab}
            </div>
          ))}
          |{" "}
          <div onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            <Widget
              src={`${accountId}/widget/Mintbase.MbIcon`}
              props={{
                name: "moon",
                customStyle:
                  mode === "dark" &&
                  "border-bottom:1px solid #1ea7fd !important;",
                size: "22px",
              }}
            />
          </div>
        </div>
        <div style={{ paddingLeft: "1rem" }}>
          {currentTab === "Preview" &&
            (Object.keys(kit.compoennts).includes(display) ? (
              <Widget
                src={`${accountId}/widget/Mintbase.` + display}
                props={kit.compoennts[display].props}
              />
            ) : (
              kit.core[display].preview
            ))}
          {currentTab === "Docs" &&
            (Object.keys(kit.compoennts).includes(display)
              ? `<Widget
              src={"${`${accountId}/widget/Mintbase.` + display}
              props={${JSON.stringify(
                kit.compoennts[display].props,
                ndivl,
                " "
              )}}
          />`
              : kit.core[display].docs)}
        </div>
      </div>
    </Container>
  </Theme>
);
