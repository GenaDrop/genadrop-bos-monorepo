const { MbLogo } = VM.require("${config_account}/widget/Mintbase.MbLogo");
// const { MbChip } = VM.require("${config_account}/widget/Mintbase.MbChip");
const { ListRowContent } = VM.require(
  "${config_account}/widget/Mintbase.ListRowContent"
);
const { MbAction } = VM.require("${config_account}/widget/Mintbase.MbAction");

const { MbArrowMenu } = VM.require(
  "${config_account}/widget/Mintbase.MbArrowMenu"
);
const { MbCharCounter } = VM.require(
  "${config_account}/widget/Mintbase.MbCharCounter"
);
const { MbCheckbox } = VM.require(
  "${config_account}/widget/Mintbase.MbCheckbox"
);
const { MbDropdownHoverMenu } = VM.require(
  "${config_account}/widget/Mintbase.MbDropdownHoverMenu"
);

const { MbInfoCard } = VM.require(
  "${config_account}/widget/Mintbase.MbInfoCard"
);

const { MbModal } = VM.require("${config_account}/widget/Mintbase.MbModal");
const { MbNetworkMenu } = VM.require(
  "${config_account}/widget/Mintbase.MbNetworkMenu"
);
const { MbPill } = VM.require("${config_account}/widget/Mintbase.MbPill");
const { MbRadioButton } = VM.require(
  "${config_account}/widget/Mintbase.MbRadioButton"
);
const { MbRowList } = VM.require("${config_account}/widget/Mintbase.MbRowList");
const { MbRowSelectList } = VM.require(
  "${config_account}/widget/Mintbase.MbRowSelectList"
);
// const { MbSwitch } = VM.require("${config_account}/widget/Mintbase.MbSwitch");
// const { MbTabs } = VM.require("${config_account}/widget/Mintbase.MbTabs");
const { MbTag } = VM.require("${config_account}/widget/Mintbase.MbTag");
const { MbTooltip } = VM.require("${config_account}/widget/Mintbase.MbTooltip");
const { RadioButton } = VM.require(
  "${config_account}/widget/Mintbase.RadioButton"
);
const {
  cssColors,
  colors,
  typographyClasses,
  getFontType,
  getCharsCounterSize,
  getInputLabelFontType,
} = VM.require("${config_account}/widget/Mintbase.Theme");

const { MbRoutes, MbFooterRoutes } = VM.require(
  "${config_account}/widget/Mintbase.App.Navbar.NavRoutes"
);
// const { RowSelectList } = VM.require(
//   "${config_account}/widget/Mintbase.RowSelectList"
// );
// const { TablePagination } = VM.require(
//   "${config_account}/widget/Mintbase.TablePagination"
// );
// const { MbActionTextField } = VM.require(
//   "${config_account}/widget/Mintbase.MbActionText"
// );
// const { MbMetaCard } = VM.require(
//   "${config_account}/widget/Mintbase.MbMetaCard"
// );
// const { MbTable } = VM.require("${config_account}/widget/Mintbase.MbTable");
// const { MbInput } = VM.require("${config_account}/widget/Mintbase.MbInput");
// const { MbButton } = VM.require("${config_account}/widget/Mintbase.MbButton");
// const { MbDropdownMenu } = VM.require(
//   "${config_account}/widget/Mintbase.MbDropdownMenu"
// );
// const { MbIcon } = VM.require("${config_account}/widget/Mintbase.MbIcon");

const { LinkTree } = VM.require("${config_account}/widget/Mintbase.MbLinkTree");

return {
  //   MbChip,
  ListRowContent,
  MbAction,
  MbActionTextField,
  MbRoutes,
  MbArrowMenu,
  MbCharCounter,
  MbCheckbox,
  MbDropdownHoverMenu,
  MbInfoCard,
  MbFooterRoutes,
  // MbMetaCard,
  MbModal,
  MbNetworkMenu,
  MbPill,
  MbRadioButton,
  MbRowList,
  MbRowSelectList,
  // MbSwitch,
  MbTable,
  // MbTabs,
  MbTag,
  LinkTree,
  MbTooltip,
  RadioButton,
  cssColors,
  colors,
  typographyClasses,
  getFontType,
  getCharsCounterSize,
  getInputLabelFontType,
};
