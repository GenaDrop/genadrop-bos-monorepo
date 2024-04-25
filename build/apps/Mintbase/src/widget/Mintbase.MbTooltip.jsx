const { text, component, place, customStyle } = props;
const TooltipContent = styled.div("Tooltip.Content")`
  opacity:1;
  color: #fff;
  font-family: AuthenticSans-90,sans-serif;
  line-height: 13px;
  max-height: 28px;
  background: rgba(0,0,0,0.6);
  font-size: 12px;
  border-radius: 4px;
  max-height: 28px;
  padding: 8px;
  width: auto;
  white-space: nowrap;
  pointer-events: none;
  z-index:9999;
  ${customStyle || ""}
`;
const TooltipArrow = styled.div("Tooltip.Arrow")`
    fill:rgba(0,0,0,0.6);
`;
const MbTooltip = () => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{component}</Tooltip.Trigger>
        <TooltipContent side={place || "top"} sideOffset={5}>
          {text}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
return { MbTooltip };
