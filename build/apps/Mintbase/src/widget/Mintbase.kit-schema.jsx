const data = {
  name: "",
};
const kit = {
  core: {
    MbIcon: {
      preview: (
        <IconsContainer>
          {icons.map((icon) => (
            <div className="icon">
              <Widget
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
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
        src={"${"${config_account}/widget/" + display}"}
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
            const &#123; typographyClasses &#125; =
            VM.require('bos.genadrop.near/widget/Theme');
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
    MbArrowMenu: {
      props: {
        isActive: false,
        title: "Explore",
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
            src="bos.genadrop.near/widget/Mintbase.MbArrowMenu"
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
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
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
                src="bos.genadrop.near/widget/Mintbase.MbIcon"
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
    MbNetworkMenu: {
      props: {
        isOpen: true,
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
  },
};
