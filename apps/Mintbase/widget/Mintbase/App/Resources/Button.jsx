const StyledButton = styled.button`
  all: unset;
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  font-family: "Poppins", sans-serif;

  transition: all 300ms;

  ${(props) =>
    props.type === "icon" &&
    `
    display: flex;
    width: 40px;
    height: 40px;
    padding: 0px;
    flex-shrink: 0;
    font-size: 16px;
    border-radius: 50%;
  `}

  /* Colors based on variant prop */
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--button-primary-bg, #fe5051)";
      case "outline":
        return `var(--button-outline-bg, ${
          props?.isDarkModeOn ? "#21242c" : "#fff"
        })`;
      case "secondary":
        return "var(--button-secondary-bg, #23242B)";
      case "transparent":
        return "transparent";
      case "danger":
        return "var(--button-danger-bg, #fd2a5c)";
      default:
        return "var(--button-default-bg, #23242B)";
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--button-primary-color, #fff)";
      case "outline":
        return `var(--button-outline-color,  ${
          props?.isDarkModeOn ? "#fff" : "#000"
        })`;
      case "secondary":
        return "var(--button-secondary-color, #CDD0D5)";
      case "danger":
        return "var(--button-danger-hover-bg, #fff)";
      default:
        return "var(--button-default-color, #white)";
    }
  }};

  border: ${(props) =>
    props.variant === "outline"
      ? `1px solid var(--stroke-color,  ${
          props?.isDarkModeOn ? "#b0b0b0" : "#ccc"
        })`
      : ""};

  /* Hover states */
  &:hover:not(:disabled) {
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "var(--button-primary-hover-bg, #fe5051)";
        case "outline":
          return "var(--button-outline-hover-bg, #fe5051)";
        case "danger":
          return "var(--button-danger-hover-bg, #fd2a5c";
        default:
          return "var(--button-default-hover-bg, #17181c)";
      }
    }};
    color: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "#fff";
        case "outline":
          return "#fff";
        case "danger":
          return "var(--button-danger-hover-bg, #fd2a5c";
        default:
          return "var(--button-default-hover-bg, #17181c)";
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`;

function Button({
  id,
  disabled,
  loading,
  children,
  variant,
  type,
  onClick,
  className,
  target,
  linkClassName,
  href,
  noLink,
  style,
  ...restProps
}) {
  className = className + (disabled ? " disabled" : "");
  if (href && noLink) {
    return (
      <a
        href={href}
        className={linkClassName}
        style={{ textDecoration: "none" }}
        target={target}
        onClick={(e) => e.stopPropagation()}
      >
        <StyledButton
          id={id}
          key={`ButtonLink-${type ?? "Normal"}-${variant ?? "Default"}-${id}`}
          className={className}
          variant={variant}
          disabled={disabled}
          type={type}
          style={style}
          href={href}
          {...restProps}
        >
          {children}
        </StyledButton>
      </a>
    );
  }

  if (href) {
    return (
      <Link
        to={href}
        className={linkClassName}
        style={{ textDecoration: "none" }}
        target={target}
        onClick={(e) => e.stopPropagation()}
      >
        <StyledButton
          id={id}
          key={`ButtonLink-${type ?? "Normal"}-${variant ?? "Default"}-${id}`}
          className={className}
          disabled={disabled}
          variant={variant}
          type={type}
          style={style}
          href={href}
          {...restProps}
        >
          {children}
        </StyledButton>
      </Link>
    );
  }

  return (
    <StyledButton
      id={id}
      disabled={disabled || loading}
      key={`Button-${type ?? "Normal"}-${variant ?? "Default"}-${id}`}
      className={className}
      variant={variant}
      type={type}
      style={style}
      onClick={onClick}
      {...restProps}
    >
      {children}
      {loading ? (
        <span
          className="spinner-border spinner-border-sm mr-2"
          role="status"
          aria-hidden="true"
        ></span>
      ) : null}
    </StyledButton>
  );
}

return { Button };
