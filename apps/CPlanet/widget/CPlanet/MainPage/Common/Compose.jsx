const autocompleteEnabled = props.autocompleteEnabled ?? true;

if (state.image === undefined) {
  State.init({
    image: {},
    text: props.initialText || "",
    nftChainState: "Near",
    isChecked: false,
  });

  if (props.onHelper) {
    const extractMentions = (text) => {
      const mentionRegex =
        /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
      mentionRegex.lastIndex = 0;
      const accountIds = new Set();
      for (const match of text.matchAll(mentionRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
          match[1].length >= 2 &&
          match[1].length <= 64
        ) {
          accountIds.add(match[1].toLowerCase());
        }
      }
      return [...accountIds];
    };

    const extractHashtags = (text) => {
      const hashtagRegex = /#(\w+)/gi;
      hashtagRegex.lastIndex = 0;
      const hashtags = new Set();
      for (const match of text.matchAll(hashtagRegex)) {
        if (
          !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
          !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
        ) {
          hashtags.add(match[1].toLowerCase());
        }
      }
      return [...hashtags];
    };

    const extractMentionNotifications = (text, item) =>
      extractMentions(text || "")
        .filter((accountId) => accountId !== context.accountId)
        .map((accountId) => ({
          key: accountId,
          value: {
            type: "mention",
            item,
          },
        }));

    props.onHelper({
      extractHashtags,
      extractMentions,
      extractTagNotifications: extractMentionNotifications,
      extractMentionNotifications,
    });
  }
}

const chains = [
  {
    id: "137",
    name: "Polygon",
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  // {
  //   id: "43114",
  //   name: "Avax",
  //   url: "https://ipfs.near.social/ipfs/bafkreifhu5fytsjcmjluarfnu6kcdhaqz4rgdrbbzf6dlsmggqb7oi3w4e",
  // },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];
const accountId = context.accountId;

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

State.init({
  account: accountId,
});
const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}
const onChangeAccount = (account) => {
  State.update({
    account: account[0],
  });
};

const updateChain = (chain) => {
  State.update({ nftChainState: chain, nftTokenId: "", nftContractId: "" });
};

const content = (state.text ||
  state.image.cid ||
  state.nftContractId ||
  state.nftTokenId ||
  state.nftChainState) && {
  type: "md",
  text: state.text,
  image: state.image.cid ? { ipfs_cid: state.image.cid } : undefined,
  embeddedNFT: {
    contractId: state.nftContractId,
    tokenId: state.nftTokenId,
    chain: state.nftChainState,
  },
};

if (content && props.extraContent) {
  Object.assign(content, props.extraContent);
}

function autoCompleteAccountId(id) {
  let text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });
}

const onChange = (text) => {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(text);
  State.update({ text, showAccountAutocomplete });
};

const jContent = JSON.stringify(content);
if (props.onChange && jContent !== state.jContent) {
  State.update({
    jContent,
  });
  props.onChange({ content, isChecked: state.isChecked });
}
console.log("checked", isChecked);

const onCompose = () => {
  State.update({
    image: {},
    text: "",
    embeddedNFT: {},
  });
};

const [markdownEditor, setMarkdownEditor] = useState(false);

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  textarea {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  textarea::placeholder {
    padding-top: 4px;
    font-size: 20px;
  }

  textarea:focus::placeholder {
    font-size: inherit;
    padding-top: 0px;
  }

  &::after,
  textarea,
  iframe {
    width: 100%;
    padding: 8px 0;
    min-width: 1em;
    height: unset;
    min-height: 3em;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: 0px solid #eee;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  iframe {
    padding: 0;
  }

  textarea:focus,
  textarea:not(:empty) {
    border-bottom: 1px solid #eee;
    min-height: 5em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
  &.markdown-editor::after {
    padding-top: 66px;
    font-family: monospace;
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  border-bottom: 1px solid #eee;
  line-height: normal;
  display: flex;
  padding: 12px 12px 6px;

  .left {
    min-width: 40px;
    margin-right: 22px;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;
  }

  .up-buttons {
    margin-top: 6px;
    margin-left: -16px;

    @media screen and (max-width: 540px) {
      margin-left: -50px;
    }
  }
`;

const embedCss = `
.rc-md-editor {
  border: 0;
}
.rc-md-editor .editor-container>.section {
  border: 0;
}
.rc-md-editor .editor-container .sec-md .input {
  overflow-y: auto;
  padding: 8px 0 !important;
  line-height: normal;
}
`;

const EmbedNFT = styled.div`
  margin: 10px 2px;
  .attach-nft-label {
    border-radius: 32px;
    color: #b0b0b0;
    border: 1px solid #efefef;
    background: #f8f8f8;
    :hover,
    :focus,
    &:disabled {
      background: #d7dbde;
      outline: none;
      border: 1px solid #efefef;
      color: #000;
    }
  }
  .bottom-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    .compose {
      justify-self: flex-end;
      float: right;
    }
  }
`;

const Content = styled.div`
  // background-color: white;
  padding: 20px;
  border-radius: 0.5rem;
  margin-top: 2rem;
  // border: 4px solid rgba(13, 154, 255, 0.317);
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const Search = styled.div`
  margin-top: 12px;
  // justify-content: center;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  input {
    border-radius: 8px;
    flex-shrink: 0;
    height: 48px;
    width: 100%;
    background: #f8f8f8;
    overflow: hidden;
    color: #b0b0b0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 29.6px */
  }
`;

const Button = styled.div`
  background: transparent;
  font-weight: 600;
  cursor: pointer;
`;

const Input = styled.input`
  display: block;
  padding: 0.5em;
  width: 100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus {
    border: 1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  width: 100%;
`;
const SelectCard = styled.div`
  display: flex;
  padding: 1em;
  gap: 2em;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 100%;
  border-radius: 0.7em;
  height: 100%;
  @media screen and (max-width: 540px) {
    flex-wrap: wrap;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  .upload-image-button,
  .mkd-butn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    :hover,
    :focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }
`;

const handleCheckboxChange = () => {
  State.update({
    isChecked: !state.isChecked,
    isOpen: true,
    account: accountId,
  });
  props.onChange({ isChecked: state.isChecked });
};

const onClose = () => {
  State.update({
    isOpen: false,
    isChecked: false,
    nftChainState: "Near",
  });
};

if (state.isChecked === true) {
  setMarkdownEditor(false);
} else {
  State.update({
    nftTokenId: "",
    nftContractId: "",
  });
}

console.log(state.isChecked);

const onChangeContractID = (contractId) => {
  State.update({
    nftContractId: contractId,
  });
};

const onChangeTokenID = (tokenId) => {
  State.update({
    nftTokenId: tokenId,
  });
};
console.log(content);

return (
  <Wrapper>
    <div className="left">
      <Widget
        loading=""
        src="jgodwill.near/widget/CPlanet.MainPage.N.Post.Left"
        props={{ accountId: context.accountId }}
      />
    </div>
    <div className="right">
      <TextareaWrapper
        className={markdownEditor ? "markdown-editor" : ""}
        data-value={state.text || ""}
      >
        {markdownEditor ? (
          <Widget
            key={`markdown-editor-${markdownEditor}`}
            src="${alias_mob}/widget/MarkdownEditorIframe"
            props={{
              initialText: state.text,
              onChange,
              embedCss,
            }}
          />
        ) : (
          <textarea
            key="textarea"
            className="normal_input"
            value={state.text || ""}
            onInput={(event) => onChange(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Escape") {
                State.update({ showAccountAutocomplete: false });
              }
            }}
            placeholder={props.placeholder ?? "What's happening?"}
          />
        )}
        {autocompleteEnabled && state.showAccountAutocomplete && (
          <div className="pt-1 w-100 overflow-hidden">
            <Widget
              src="${alias_mob}/widget/AccountAutocomplete"
              props={{
                term: state.text.split("@").pop(),
                onSelect: autoCompleteAccountId,
                onClose: () => State.update({ showAccountAutocomplete: false }),
              }}
            />
          </div>
        )}
      </TextareaWrapper>
      <div className="up-buttons d-flex flex-row">
        <div className="flex-grow-1">
          <Actions>
            {!state.isChecked && (
              <IpfsImageUpload
                image={state.image}
                className="upload-image-button bi bi-image"
                title="Upload an image"
              />
            )}
            <button
              className="bi bi-code-square mkd-butn"
              title="Use the markdown Editor"
              onClick={() =>
                setMarkdownEditor(markdownEditor ? false : Date.now())
              }
            ></button>
          </Actions>
          <EmbedNFT>
            {state.isChecked && (
              <div>
                <Card>
                  <div className="d-flex align-center text-center gap-2">
                    <SelectCard>
                      <Card>
                        <div>Select a Chain</div>
                        <Widget
                          src="${config_account}/widget/CPlanet.ChainsDropdown"
                          props={{ chains: chains, updateChain }}
                        />
                      </Card>
                      {state.nftChainState === "Near" && (
                        <Card>
                          Near Wallet Address:
                          <Search>
                            <Typeahead
                              id="async-example"
                              className="type-ahead"
                              isLoading={isLoading}
                              labelKey="search"
                              minLength={1}
                              options={allWidgets}
                              onChange={(value) => onChangeAccount(value)}
                              placeholder={accountId}
                              allowNew
                            />
                          </Search>
                        </Card>
                      )}
                    </SelectCard>
                  </div>
                  {state.nftChainState === "Near" ? (
                    <div>
                      <div
                        className="p-2 rounded mt-3"
                        style={{
                          background: "#fdfdfd",
                          border: "solid 1px #dee2e6",
                          borderBottomLeftRadius: ".375rem",
                          borderBottomRightRadius: ".375rem",
                          minHeight: "9em",
                        }}
                      >
                        <div>
                          <div className="mt-2">
                            <Widget
                              src={`${config_account}/widget/GenaDrop.NFT.Selector`}
                              props={{
                                onChange: ({ contractId, tokenId }) => {
                                  State.update({
                                    contractId: contractId,
                                    tokenId: tokenId,
                                  });
                                  onChangeTokenID(tokenId);
                                  onChangeContractID(contractId);
                                },
                                accountId: state.account,
                                headingText: "Select an NFT to embed",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Card>
                      <h4>Enter the NFT details</h4>
                      <Card>
                        NFT Contract ID:
                        <Input
                          type="text"
                          onChange={(e) => onChangeContractID(e.target.value)}
                          value={state.nftContractId}
                        />
                      </Card>
                      <Card>
                        NFT Token Id:
                        <Input
                          type="text"
                          onChange={(e) => onChangeTokenID(e.target.value)}
                          value={state.nftTokenId}
                        />
                      </Card>
                    </Card>
                  )}
                </Card>
              </div>
            )}
            <div className="bottom-buttons">
              {!state.image.cid && (
                <div>
                  <input
                    type="checkbox"
                    className="btn-check attach-nft-btn"
                    id="btn-check-2"
                    checked={state.isChecked}
                    onChange={handleCheckboxChange}
                    autocomplete="off"
                  />
                  <label
                    className="btn btn-dark attach-nft-label"
                    for="btn-check-2"
                  >
                    {!state.isChecked ? (
                      <>
                        <i className="bi bi-paperclip attah-ico"></i> Attach an
                        NFT
                      </>
                    ) : (
                      <>
                        Remove NFT <i className="bi bi-x-lg"></i>
                      </>
                    )}
                  </label>
                </div>
              )}
              <div className="compose">
                {props.composeButton && props.composeButton(onCompose)}
              </div>
            </div>
          </EmbedNFT>
        </div>
      </div>
    </div>
  </Wrapper>
);
