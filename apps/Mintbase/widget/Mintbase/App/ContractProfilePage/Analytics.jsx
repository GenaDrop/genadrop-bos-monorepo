const { MbChart } = VM.require("${config_account}/widget/components") || {
  MbChart: () => <></>,
};

const { getStoreNFTs } = VM.require(
  "${config_account}/widget/Mintbase.utils.sdk"
);
const { MbInputField } = VM.require(
  "${config_account}/widget/Mintbase.MbInput"
) || {
  MbInputField: () => <></>,
};
const darkColors = {
  page_bg: "rgb(25,33,50)",
  horizen_bg: "#fff",
  header_bg: "rgb(49,62,89)",
  sideBar: {
    sideBar_bg: "rgb(49,62,89)",
    sideBar_color: "#fff",
  },
  footer: {
    titlenelowBackground: "var(--blue-300, #4f58a3)",
    titleBackground: "#fff",
    fromBackground: "rgb(55,72,107)",
    toBackground: "rgb(55,72,107)",
    belowBackground: "rgb(210, 202, 250)",
  },
  dynamic_header: {
    afterbrandcolor: "",
    color1brand: "#fff",
    color2brand: "rgb(210, 202, 250)",
    colordescription: "rgb(210, 202, 250)",
    background:
      "radial-gradient(circle, #313e59 0%, rgba(230,230,231,0.01) 0%, rgb(49,62,89) 100%, rgb(49,62,89) 100%, rgb(49,62,89) 100%, rgba(46,52,90,1) 100%);",
  },
  search_sbt: {
    section_bg: "transparent",
    card_bg: "transparent)",
    search_btn_bg: "rgb(49,62,89)",
    search_btn_bg_hover: "rgba(49,62,89,0.8)",
    search_btn_text: "rgb(255,255,255)",
    input_bg: "rgb(49,62,89)",
    input_bg_hover: "rgba(49,62,89,0.8)",
    input_text_color: "rgb(255,255,255)",
    input_border: "rgba(49,62,89,0.8)",
    table_bg: "transparent",
    table_color: "rgb(255,255,255)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(255,255,255)",
    table_striped_bg: "",
    table_hover_color: "rgb(255,255,255)",
    table_hover_bg: "",
  },
  sbt_info: {
    section_bg: "transparent",
    card_bg: "rgb(49, 62, 89)",
    card_title_color: "var(--blue-300, #4f58a3)",
    card_content_color: "#fff",
  },
  tab_sbt: {
    backgroundColor: "rgb(49,62,89)",
    textColor: "#fff",
    headerColor: "var(--blue-300, #4f58a3)",
    numberColor: "#fff",
  },
  sbt_area: {
    section_bg: "transparent",
    card_bg: "rgb(49, 62, 89)",
    card_title_color: "var(--blue-300, #4f58a3)",
  },
  table_pagination: {
    table_bg: "rgb(49,62,89)",
    table_color: "rgb(255,255,255)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(255,255,255)",
    table_striped_bg: "",
    table_hover_color: "rgb(255,255,255)",
    table_hover_bg: "",
    btn_border: "rgb(25,33,50)",
    btn_bg: "rgb(49,62,89)",
    btn_bg_active: "rgb(25,33,50)",
    btn_color: "#fff",
    input_bg: "#2f3b54",
  },
  election: {
    textColor: "rgb(255,255,255)",
  },
  piePercentage: {
    text: "#f79bd3",
    filled: "#d2cafa",
    empty: "#f79bd3",
  },
  chart: {
    title: "#fff",
    subtitle: "rgba(255,255,255,0.7)",
    xAxis: "rgb(255,255,255)",
    yAxis: "#fff",
    legend: "rgba(255,255,255,0.7)",
    legendHover: "rgb(255,255,255)",
    rangeSelector: {
      labels: "rgba(255,255,255,0.7)",
      inputColor: "rgb(255,255,255)",
      btn_bg: "rgba(25,33,50,0.3)",
      btn_color: "rgba(255,255,255,0.7)",
      btn_hover_bg: "rgba(25,33,50,0.5)",
      btn_hover_color: "rgba(255,255,255,0.8)",
      btn_active_bg: "rgba(25,33,50,0.8)",
      btn_active_color: "rgb(255,255,255)",
    },
  },
  spinnerColors: ["#6F61C0", "#241468"],
  chartColor: [
    "#F79BD3",
    "#82ca9d",
    "#A084E8",
    "#EA1179",
    "#F79BD3",
    "#A084E8",
    "#241468",
    "#9F0D7F",
  ],
};
const lightColors = {
  page_bg: "rgb(241,242,245)",
  horizen_bg: "#391b86",
  header_bg: "rgb(210, 202, 250)",
  sideBar: {
    sideBar_bg: "rgb(210, 202, 250)",
    sideBar_color: "#fff",
  },
  footer: {
    titlenelowBackground: "var(--blue-300, #4f58a3)",
    titleBackground: "#fff",
    fromBackground: "rgb(210, 202, 250)",
    toBackground: "rgb(210, 202, 250)",
    belowBackground: "var(--blue-300, #4f58a3)",
  },
  dynamic_header: {
    afterbrandcolor: "#789efb",
    color1brand: "#000",
    color2brand: "var(--blue-300, #4f58a3)",
    colordescription: "var(--blue-300, #4f58a3)",
    background:
      "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
  },
  search_sbt: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "",
    search_btn_bg: "rgb(210, 202, 250)",
    search_btn_bg_hover: "rgba(210, 202, 250,0.8)",
    search_btn_text: "rgb(0,0,0)",
    input_bg: "rgba(210, 202, 250,0.2)",
    input_bg_hover: "rgba(210, 202, 250,0.4)",
    input_text_color: "rgb(0,0,0)",
    input_border: "rgba(210, 202, 250,0.4)",
    table_bg: "transparent",
    table_color: "rgb(0,0,0)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(0,0,0)",
    table_striped_bg: "",
    table_hover_color: "rgb(0,0,0)",
    table_hover_bg: "",
  },
  sbt_info: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "rgb(255, 255, 255)",
    card_title_color: "var(--blue-300, #4f58a3)",
    card_content_color: "#000",
  },
  tab_sbt: {
    backgroundColor: "rgb(210, 202, 250)",
    textColor: "#fff",
    headerColor: "var(--blue-300, #4f58a3)",
    numberColor: "#fff",
  },
  sbt_area: {
    section_bg: "rgb(235, 231, 253)",
    card_bg: "rgb(255, 255, 255)",
    card_title_color: "var(--blue-300, #4f58a3)",
  },
  table_pagination: {
    table_bg: "rgb(255,255,255)",
    table_color: "rgb(0,0,0)",
    table_border_color: "",
    table_accent_bg: "",
    table_striped_color: "rgb(0,0,0)",
    table_striped_bg: "",
    table_hover_color: "rgb(0,0,0)",
    table_hover_bg: "",
    btn_border: "#000",
    btn_border: "var(--blue-300, #4f58a3)",
    btn_bg: "#fff",
    btn_bg_active: "rgb(235, 231, 253)",
    btn_color: "#000",
  },
  election: {
    textColor: "rgb(0,0,0)",
  },
  piePercentage: {
    text: "var(--purple-300, #8c4fe5",
    filled: "#391b86",
    empty: "var(--purple-300, #8c4fe5",
  },
  chart: {
    title: "rgba(0,0,0,1)",
    subtitle: "rgba(0,0,0,0.7)",
    xAxis: "rgba(0,0,0,1)",
    yAxis: "rgba(0,0,0,1)",
    legend: "rgba(0,0,0,0.7)",
    legendHover: "rgba(0,0,0,1)",
    rangeSelector: {
      labels: "rgba(0,0,0,0.7)",
      inputColor: "rgba(0,0,0,0.5)",
      btn_bg: "rgba(0,0,0,0.3)",
      btn_color: "rgba(0,0,0,0.8)",
      btn_hover_bg: "rgba(0,0,0,0.4)",
      btn_hover_color: "rgba(0,0,0,1)",
      btn_active_bg: "rgb(235, 231, 253)",
      btn_active_color: "rgba(0,0,0,1)",
    },
  },
  spinnerColors: ["#241468", "#82ca9d"],
  chartColor: [
    "#A084E8",
    "#82ca9d",
    "#F79BD3",
    "#A084E8",
    "#241468",
    "#EA1179",
    "#9F0D7F",
  ],
};
const themeColor = !props.isDarkModeOn ? lightColors : darkColors;

const getUniqueAddressProps = (
  data,
  dateKey,
  serieses,
  colors,
  chartOption
) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [
      new Date(d[dateKey]).getTime(),
      d[series.key],
    ]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "",
      legend: true,
      stacking: "false",
      ...chartOption,
    },

    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const Analytics = ({ contractId, isDarkModeOn }) => {
  const Card = styled.div`
    padding: 2em;
    gap: 2em;
    width: 100%;
    margin: 10px auto;
  `;

  const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 24px;
    border-radius: 0.7em;
    width: 100%;
    margin-top: 1em;
  `;

  const [uniqueAddresses, setUniqueAddresses] = useState([]);
  const [mintedData, setMintedData] = useState([]);
  const [listedData, setListedData] = useState([]);
  const [soldData, setSoldData] = useState([]);
  const [months, setMonths] = useState(12);

  function subtractMonthsAndFormat(numOfMonths) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - numOfMonths);

    // Format the date in YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const fetchData = ({ type, monthsToSubtract }) => {
    const formattedStartDate = subtractMonthsAndFormat(monthsToSubtract);

    const currentDate = new Date();
    const formattedEndDate = currentDate.toISOString().split("T")[0];

    return asyncFetch(
      `https://mb-analytics-tmp-z3w7d7dnea-ew.a.run.app/${type}?resolution=daily&start=${formattedStartDate}&end=${formattedEndDate}&nft_contract_id=${contractId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((result) => result.body);
  };
  useEffect(() => {
    fetchData({ type: "unique_account_ids", monthsToSubtract: months })
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        const structuredListedData = getUniqueAddressProps(
          data,
          "year_month_day",
          [
            {
              key: "unique_account_ids",
              seriesName: "Unique Account",
              type: "areaspline",
              id: 1,
            },
            {
              key: "interactions_count",
              seriesName: "Interactions",
              type: "areaspline",
              id: 2,
            },
          ],
          themeColor.chartColor,
          {
            title: "Unique addresses",
            stacking: "normal",
          }
        );
        setUniqueAddresses(structuredListedData);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchData({ type: "listed", monthsToSubtract: months })
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        const structuredListedData = getUniqueAddressProps(
          data,
          "year_month_day",
          [
            {
              key: "listers_count",
              seriesName: "Liters Count",
              type: "areaspline",
              id: 1,
            },
            {
              key: "lists_count",
              seriesName: "Lists Count",
              type: "areaspline",
              id: 2,
            },
          ],
          themeColor.chartColor,
          {
            title: "Listed",
            stacking: "normal",
          }
        );
        setListedData(structuredListedData);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchData({ type: "minted", monthsToSubtract: months })
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        const structuredListedData = getUniqueAddressProps(
          data,
          "year_month_day",
          [
            {
              key: "minters_count",
              seriesName: "Minters Count",
              type: "areaspline",
              id: 1,
            },
            {
              key: "mints_count",
              seriesName: "Mints Count",
              type: "areaspline",
              id: 2,
            },
          ],
          themeColor.chartColor,
          {
            title: "Minted",
            stacking: "normal",
          }
        );
        setMintedData(structuredListedData);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchData({ type: "sold", monthsToSubtract: months })
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        const structuredSoldData = getUniqueAddressProps(
          data,
          "year_month_day",
          [
            {
              key: "sellers_count",
              seriesName: "Sellers Count",
              type: "areaspline",
              id: 1,
            },
            {
              key: "buyers_count",
              seriesName: "Buyers Count",
              type: "areaspline",
              id: 2,
            },
          ],
          themeColor.chartColor,
          {
            title: "Sold",
            stacking: "normal",
          }
        );
        setSoldData(structuredSoldData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [months]);
  const WrapCards = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 24px;
  `;

  console.log("uniqueAddresses", uniqueAddresses);
  console.log("mintedData", mintedData);

  const analyticsData = [
    {
      title: "Unique Addresses",
      data: uniqueAddresses,
    },
    {
      title: "Minted",
      data: mintedData,
    },
    {
      title: "Listed",
      data: listedData,
    },
    {
      title: "Sold",
      data: soldData,
    },
  ];

  return (
    <WrapCards>
      {" "}
      <Card
        className="input"
        style={{ background: isDarkModeOn ? "#404252" : "#fff" }}
      >
        <MbInputField
          id="months"
          placeholder={months}
          type="text"
          label="Months"
          error={false}
          className="input-field"
          value={months}
          isDarkModeOn={isDarkModeOn}
          onChange={(e) => setMonths(e.target.value)}
        />
      </Card>
      {analyticsData ? (
        analyticsData.map((data, index) => (
          <div
            key={index}
            style={{ background: isDarkModeOn ? "#404252" : "#fff" }}
          >
            <Widget
              src="${config_account}/widget/Mintbase.MbMixChart"
              props={{ ...data.data }}
            />
          </div>
        ))
      ) : (
        <div>
          <h5>Loading Charts</h5>
          <div className={`w-100 d-block mt-2`}>
            <Widget
              src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
              props={{ ...spinnerColors }}
            />
          </div>{" "}
        </div>
      )}
    </WrapCards>
  );
};

return <Analytics {...props} />;
