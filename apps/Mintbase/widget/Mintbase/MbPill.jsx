const pillTemplate = props?.pillTemplate;
const text = props?.text;

const mode = props.mode || Storage.get("mode");
const isDarkModeOn = mode === "dark";

const COLORS = {
  BLACK: "black",
  PURPLE: "purple",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  ORANGE: "orange",
};
const getColor = () => {
  switch (pillTemplate) {
    case COLORS.BLACK:
      return "black";
    case COLORS.PURPLE:
      return "purple";
    case COLORS.BLUE:
      return "blue";
    case COLORS.GREEN:
      return "green";
    case COLORS.RED:
      return "red";
    case COLORS.ORANGE:
      return "orange";
  }
};

const Pill = styled.div`
  padding: 1.25rem;
  border-radius: 0.25rem;
  display: inline-block;
  width: auto;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  &.black {
    background-color: ${isDarkModeOn
      ? "#4f58a3"
      : "#d1d5db"}; /* bg-gray-700 or bg-gray-300 */
    background-color: ${isDarkModeOn
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(255, 255, 255, 0.2)"}; /* bg-opacity-10 or bg-opacity-20 */
    color: ${isDarkModeOn
      ? "#ffffff"
      : "#000000"}; /* text-white or text-black */
  }
  &.purple {
    background-color: ${isDarkModeOn
      ? "#a78bfb"
      : "#d6bcfa"}; /* bg-purple-300 or bg-purple-100 */
    background-color: ${isDarkModeOn
      ? "rgba(167, 139, 251, 0.1)"
      : "rgba(214, 188, 250, 0.2)"}; /* bg-opacity-10 or bg-opacity-20 */
    color: ${isDarkModeOn
      ? "#b794f4"
      : "#9f7aea"}; /* text-purple-300 or text-purple-100 */
  }
  &.blue {
    background-color: ${isDarkModeOn
      ? "#BFDBFE"
      : "#93C5FD"}; /* bg-blue-100 or bg-blue-300 */
    background-color: ${isDarkModeOn
      ? "rgba(59, 130, 246, 0.2)"
      : "rgba(66, 153, 225, 0.1)"}; /* dark:bg-opacity-20 or bg-opacity-10 */
    color: ${isDarkModeOn
      ? "#4299E1"
      : "#2563EB"}; /* text-blue-100 or text-blue-300 */
  }
  &.green {
    background-color: ${isDarkModeOn
      ? "#C6F6D5"
      : "#6EE7B7"}; /* bg-success-100 or bg-success-300 */
    background-color: ${isDarkModeOn
      ? "rgba(16, 185, 129, 0.2)"
      : "rgba(110, 231, 183, 0.1)"}; /* dark:bg-opacity-20 or bg-opacity-10 */
    color: ${isDarkModeOn
      ? "#38A169"
      : "#4FD1C5"}; /* text-success-100 or text-success-300 */
  }
  &.red {
    background: ${isDarkModeOn
      ? "rgba(251, 191, 36, 0.2)"
      : "rgba(254, 190, 86, 0.1)"}; /* bg-error-100 or bg-error-300 */
    color: ${isDarkModeOn
      ? "#E53E3E"
      : "#DC2626"}; /* text-error-100 or text-error-300 */
  }
  &.orange {
    background-color: ${isDarkModeOn
      ? "rgba(251, 191, 36, 0.2)"
      : "rgba(254, 190, 86, 0.1)"}; /* bg-opacity-20 or bg-opacity-10 */
    background-color: ${isDarkModeOn
      ? "#FBD38D"
      : "#FEC880"}; /* dark:bg-orange-100 or bg-orange-300 */
    color: ${isDarkModeOn
      ? "#F97316"
      : "#FB923C"}; /* text-orange-100 or text-orange-300 */
  }
  .text {
    font-family: "AUTHENTIC Sans 130", sans-serif;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    @media (min-width: 480px) {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

const MbPill = () => {
  return (
    <div>
      <Pill className={`${getColor()}`}>
        <div className="text">{text}</div>
      </Pill>
    </div>
  );
};

return { MbPill };
