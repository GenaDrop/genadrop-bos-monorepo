const { typographyClasses } = VM.require(
  "bos.genadrop.near/widget/Mintbase.Theme"
);
const LoadingInfoBox = ({ size }) => {
  return (
    <Container>
      <div className={`info-card ${size}`}>
        <div className={`title-wrapper ${size}`}>
          <TitleLoader />
        </div>
        <RightLoader>
          <div></div>
        </RightLoader>
      </div>
    </Container>
  );
};
const {
  title,
  titleIcon,
  description,
  descriptionImage,
  upperIcon,
  isNumber,
  lowerLeftText,
  isLink,
} = props;
const descriptionIcon = props.descriptionIcon || "none";
const size = props.size || "medium";
const loading = props.loading || false;
const isBigDescription = props.isBigDescription || true;
const mode = props.mode || Storage.get("mode");
const IsDarkModeOn = mode === "dark";
if (loading) return <LoadingInfoBox size={size} />;
const getDescriptionFont = () => {
  if (size === "small") {
    return isBigDescription && isNumber ? "p-big-90" : "p-small-90";
  }
  return isBigDescription && isNumber ? "p-sub-90" : "p-big-90";
};
const getTitleFont = () => {
  if (size === "small") {
    return "cap-big-90";
  }
  return "p-small-90";
};
const linkStyle = `
 
`;
const Container = styled.div`
  .info-card {
    border-radius: 0.25rem;
    background: ${IsDarkModeOn ? "var(--gray-800)" : "var(--gray-50)"};
    &.small,
    &.medium,
    &.big {
      padding: 8px;
      min-height: 46px;
      @media (min-width: 480px) {
        min-height: 72px;
        padding: 12px;
      }
    }
    @media (min-width: 976px) {
      .info-card.small {
        min-width: 160px;
      }
    }
    .title-wrapper {
      display: flex;
      position: relative;
      align-items: center;
      ${titleIcon ? "gap: 12px;" : "justify-content: space-between;"}
    }
    .loading-info {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      justify-content: space-between;
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    }
    .title-wrapper.medium,
    .title-wrapper.big {
      padding-bottom: 12px;
    }
    .title-wrapper.small {
      padding-bottom: 8px;
    }
  }
  &.link {
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    :hover {
      background: ${IsDarkModeOn ? "var(--blue-100-15)" : "var(--blue-300-15)"};
    }
  }
`;
const Title = styled.div`
  color: ${IsDarkModeOn ? "var(--gray-300)" : "var(--gray-700)"};
  ${typographyClasses[getTitleFont()]}
`;
const UpperIcon = styled.div`
  position: absolute;
  right: 0;
  margin-top: 4px;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DescriptionImage = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  .img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin-left: 12px;
  .description-rt {
    display: flex;
    ${lowerLeftText ? "" : "width: 100%;"}
    >div {
      vertical-align: middle;
      ${typographyClasses[getDescriptionFont()]}
      ${isLink
        ? `color: ${IsDarkModeOn ? "var(--blue-100)" : "var(--blue-300)"};
           cursor: pointer;`
        : `color: ${IsDarkModeOn ? "white" : "black"};`} 
        
      ${lowerLeftText
        ? "display: inline-flex;"
        : `
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; 
      `}
    }
  }
`;
const LowerLeftText = styled.div`
  ${typographyClasses["p-med-90"]}
  color: ${IsDarkModeOn ? "var(--gray-300)" : "var(--gray-700)"};
`;
const TitleLoader = styled.div`
  border-radius: 0.25rem;
  width: 4rem;
  height: 1rem;
  background-color: var(--gray-600);
`;
const RightLoader = styled.div`
  display: flex;
  margin: 0 12px;
  align-items: center;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  > div {
    border-radius: 0.25rem;
    width: 66.666667%;
    height: 1.5rem;
    background-color: var(--gray-600);
  }
`;
const MbInfoCard = () => {
  return (
    <Container>
      <div className={`info-card ${size} ${isLink ? "link" : ""}`}>
        <div className={`title-wrapper ${size}`}>
          {titleIcon && titleIcon}
          <Title>{title}</Title>
          {upperIcon && <UpperIcon>{upperIcon}</UpperIcon>}
        </div>
        <DescriptionWrapper>
          {descriptionIcon !== "none" && !descriptionImage && (
            <Widget
              src="bos.genadrop.near/widget/Mintbase.MbIcon"
              props={{
                name: descriptionIcon,
                size: "24px",
                color: "blue-300",
                darkColor: "blue-100",
              }}
            />
          )}
          {descriptionImage && descriptionIcon === "none" && (
            <div>
              <DescriptionImage>
                <img src={descriptionImage} />
              </DescriptionImage>
            </div>
          )}
          <Description>
            {description && (
              <div className="description-rt">
                <div>{description}</div>
              </div>
            )}
            {lowerLeftText && <LowerLeftText>{lowerLeftText}</LowerLeftText>}
          </Description>
        </DescriptionWrapper>
      </div>
    </Container>
  );
};
return { MbInfoCard };
