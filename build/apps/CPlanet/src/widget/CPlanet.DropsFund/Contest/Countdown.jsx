const startTime = props.startTime ?? 1692936687000; //1692964800; // change august 25
const endTime = props.endTime ?? 1694560422000; // 1694347200000; // sep 10 // 1694575484
const tupe = props.type ?? "";
State.init({
  days: "-",
  hours: "-",
  minutes: "-",
  seconds: "-",
  title: "",
});
const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};
const formatTime = (time) => (time < 10 ? `0${time}` : time);
const timer = setInterval(() => {
  const now = new Date().getTime();
  const start = new Date(parseInt(startTime)).getTime();
  const end = new Date(parseInt(endTime)).getTime();
  let title = "";
  let diff;
  if (now < start)
    diff = new Date(parseInt(start)).getTime() - new Date().getTime();
  else if (now > start && now < end)
    diff = new Date(parseInt(end)).getTime() - new Date().getTime();
  else diff = 0;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);
  if (now < start) title = <>BOS HACKS STARTS</>;
  else if (now > start && now < end) title = <>BOS HACKS SUBMISSION</>;
  else {
    title = <>{type} is ended</>;
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  }
  State.update({
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    title: title,
  });
  clearInterval(timer);
}, 1000);
const CountDown = styled.div`
  p {
    color: #000;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    margin: 0;
    margin-top: 10px;
    margin-right: 3px;
    line-height: normal;
  }
`;
return (
  <CountDown>
    <p>
      {state.days}D {state.hours}H : {state.minutes}M : {state.seconds}S
    </p>
  </CountDown>
);
