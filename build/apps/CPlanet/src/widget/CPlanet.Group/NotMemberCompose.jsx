const text =
  props.text ??
  "Only owners of this NFT collection can post, comment and repost";
const groupId = props.groupId;
const buttonText = props.buttonText ?? "Subscribe to Premium";
const Wrapper = styled.div`
  border-bottom: 1px solid #eee;
  margin: 0 -12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .mintbase {
    height: 1.5em;
  }
  .paras {
    height: 1.2em;
  }
  .tradeport {
    height: 1.2em;
  }
`;
const Locked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ratio-1x1"
    style={{ height: "4em" }}
    viewBox="0 0 16 16"
    fill="#bbb"
  >
    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.764a3 3 0 0 0-4.989 2.497 2.01 2.01 0 0 0-.743.739H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Z" />
    <path d="M9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
  </svg>
);
const Mintbase = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="mintbase"
    viewBox="0 0 694.65 182.6"
  >
    <path d="M279.58,42.49V139.9H268V58.64L245.21,139.9H216.66L193.84,58.64V139.9H182.29V42.49h18.09l24.91,86.83h11.29l24.91-86.83Z" />
    <path d="M299.34,42.49h11.13V55.3H299.34Zm0,27.69h11.13V139.9H299.34Z" />
    <path d="M380.32,89.39V139.9H369.19v-47c0-8.49-3.9-14.75-13.08-14.75S340,84.38,340,95v45H328.83V70.18H340v8.63A22.87,22.87,0,0,1,359.72,68.1C370.72,68.1,380.32,75.33,380.32,89.39Z" />
    <path d="M402,119.86V80.2h-9.18v-10h9.32V52.79h11V70.18H428.6v10H413.16v39.38c0,9.32,3.89,11.41,10.29,11.41h5.85v10h-6C411.76,141,402,138.5,402,119.86Z" />
    <path d="M493.86,92.45v25.18c0,14.47-9.32,24.35-22.26,24.35-7.94,0-14.89-3.48-18.09-8.76v6.68H442.38V42.49h11.13V76.86c3.2-5.28,10.15-8.76,18.09-8.76C484.54,68.1,493.86,78,493.86,92.45Zm-11.13.83c0-10.15-6.12-15.16-14.61-15.16s-14.61,5-14.61,15.16V116.8c0,10.15,6.12,15.16,14.61,15.16s14.61-5,14.61-15.16Z" />
    <path d="M560.93,70.18V139.9H549.8v-6.68c-3.2,5.28-10.16,8.76-18.09,8.76-12.94,0-22.27-9.88-22.27-24.35V92.45c0-14.47,9.33-24.35,22.27-24.35,7.93,0,14.89,3.48,18.09,8.76V70.18ZM549.8,116.8V93.28c0-10.15-6.13-15.16-14.61-15.16s-14.61,5-14.61,15.16V116.8c0,10.15,6.12,15.16,14.61,15.16S549.8,127,549.8,116.8Z" />
    <path d="M577.21,117.63v-2.22h11.13v2.64c0,9.18,5.43,13.91,15.44,13.91,6.4,0,13.5-1.94,13.5-9.73,0-7.38-5.56-9.47-16.7-13-13.49-4.17-22.4-8.2-22.4-20.73,0-15.72,14.06-20.45,24.77-20.45,11.83,0,24.63,6,24.63,22v3.2H616.45V90.36c0-9.6-7.1-12.24-13.78-12.24-7.23,0-13.08,3.06-13.08,9.46,0,6.82,6.82,9,16,11.82,14.61,4.32,23.1,9.33,23.1,22.27,0,15.44-13.08,20.31-25.32,20.31C587.64,142,577.21,133.91,577.21,117.63Z" />
    <path d="M654.29,108.59v7.65c0,9.46,5.85,15.72,14.61,15.72,9.05,0,14.61-4.87,14.61-14.33h11.14c0,16.42-9.74,24.35-25.75,24.35-15.44,0-25.74-9.74-25.74-24.49V92.59c0-14.75,10.3-24.49,25.74-24.49s25.75,9.74,25.75,24.49v16Zm0-14.75V100h29.22V93.84c0-9.46-5.84-15.72-14.61-15.72S654.29,84.38,654.29,93.84Z" />
    <path d="M125.14,69.86H112.48V21.21a21.28,21.28,0,1,0-8.56,17V69.86H55.08A21.21,21.21,0,0,0,33.87,91.07c0,.16,0,.31,0,.46h0v48.64H21.21a21.22,21.22,0,1,0,21.21,21.42h0V148.73H74.27a21.19,21.19,0,1,0,17-8.56H42.43v-32.1A21.19,21.19,0,0,0,72.08,78.41h31.84V91.27h0a21.21,21.21,0,1,0,21.21-21.41Zm-33.87-36a12.66,12.66,0,1,1,12.65-12.66A12.68,12.68,0,0,1,91.27,33.87Zm12.65,127.52a12.66,12.66,0,1,1-12.65-12.66A12.66,12.66,0,0,1,103.92,161.39ZM21.21,174a12.66,12.66,0,1,1,12.66-12.65A12.66,12.66,0,0,1,21.21,174Zm33.87-70.31A12.66,12.66,0,1,1,67.74,91.07,12.67,12.67,0,0,1,55.08,103.73Zm70.06,0a12.66,12.66,0,1,1,12.65-12.66A12.68,12.68,0,0,1,125.14,103.73Z" />
  </svg>
);
const Paras = (
  <svg
    className="paras"
    viewBox="0 0 80 19"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M27.8185 18.223L27.4999 17.0833C27.4018 17.1649 27.2956 17.2426 27.1812 17.3161C26.1355 18.0269 24.6813 18.3823 22.8185 18.3823C21.0538 18.3823 19.6486 18.0636 18.6029 17.4264C17.5571 16.7891 17.0342 15.6168 17.0342 13.9092C17.0342 12.3079 17.5653 11.1723 18.6274 10.5024C19.6976 9.83247 21.3561 9.4975 23.6028 9.4975H27.218V9.05633C27.218 8.10045 26.9647 7.41826 26.4582 7.00977C25.9517 6.59311 25.2736 6.38477 24.4239 6.38477C23.6559 6.38477 23.0023 6.5686 22.4631 6.93624C21.9239 7.30389 21.589 7.88803 21.4582 8.68868L17.3406 7.53673C17.5857 6.20504 18.3128 5.20831 19.522 4.54655C20.7393 3.88479 22.3079 3.5539 24.2278 3.5539C27.0056 3.5539 28.9051 4.12988 29.9263 5.28184C30.9476 6.43379 31.4582 8.07186 31.4582 10.196V18.223H27.8185ZM27.218 13.897V11.9852H24.4852C23.276 11.9852 22.4468 12.1364 21.9974 12.4387C21.5563 12.741 21.3357 13.2107 21.3357 13.848C21.3357 14.4771 21.5358 14.9509 21.9362 15.2695C22.3365 15.58 22.9778 15.7352 23.8602 15.7352C24.8324 15.7352 25.633 15.5514 26.2621 15.1838C26.8994 14.8161 27.218 14.3872 27.218 13.897Z"></path>
    <path d="M43.0744 10.8823C43.0744 9.06041 42.8661 7.87169 42.4494 7.31614C42.0409 6.75242 41.4691 6.47056 40.7338 6.47056C39.8841 6.47056 39.206 6.76876 38.6995 7.36516C38.2746 7.87169 38.0295 8.43542 37.9642 9.05633V18.223H33.7485V3.68871H37.7803L37.8661 5.08576C37.907 5.04491 37.9478 5.00815 37.9887 4.97547C39.0916 4.03593 40.5377 3.56616 42.3269 3.56616C44.2632 3.56616 45.5744 4.16256 46.2607 5.35537C46.947 6.54 47.2901 8.38231 47.2901 10.8823H43.0744Z"></path>
    <path d="M59.9157 18.223L59.597 17.0833C59.499 17.1649 59.3928 17.2426 59.2784 17.3161C58.2327 18.0269 56.7784 18.3823 54.9157 18.3823C53.151 18.3823 51.7458 18.0636 50.7 17.4264C49.6543 16.7891 49.1314 15.6168 49.1314 13.9092C49.1314 12.3079 49.6624 11.1723 50.7245 10.5024C51.7948 9.83247 53.4533 9.4975 55.7 9.4975H59.3152V9.05633C59.3152 8.10045 59.0619 7.41826 58.5554 7.00977C58.0488 6.59311 57.3707 6.38477 56.5211 6.38477C55.7531 6.38477 55.0995 6.5686 54.5603 6.93624C54.0211 7.30389 53.6861 7.88803 53.5554 8.68868L49.4378 7.53673C49.6829 6.20504 50.41 5.20831 51.6191 4.54655C52.8364 3.88479 54.4051 3.5539 56.325 3.5539C59.1028 3.5539 61.0023 4.12988 62.0235 5.28184C63.0447 6.43379 63.5553 8.07186 63.5553 10.196V18.223H59.9157ZM59.3152 13.897V11.9852H56.5823C55.3732 11.9852 54.5439 12.1364 54.0946 12.4387C53.6534 12.741 53.4328 13.2107 53.4328 13.848C53.4328 14.4771 53.633 14.9509 54.0333 15.2695C54.4337 15.58 55.075 15.7352 55.9573 15.7352C56.9296 15.7352 57.7302 15.5514 58.3593 15.1838C58.9965 14.8161 59.3152 14.3872 59.3152 13.897Z"></path>
    <path d="M72.9902 18.3455C71.0131 18.3455 69.3914 18.0514 68.1251 17.4632C66.8587 16.8667 66.0376 15.8823 65.6618 14.5097L69.3628 13.1617C69.5262 14.0277 69.9347 14.6445 70.5883 15.0122C71.25 15.3717 72.0262 15.5514 72.9167 15.5514C73.8481 15.5514 74.567 15.4248 75.0736 15.1715C75.5801 14.9182 75.8334 14.5547 75.8334 14.0808C75.8334 13.4844 75.527 13.0963 74.9142 12.9166C74.3097 12.7287 73.317 12.5326 71.9363 12.3284C69.7059 12.0343 68.121 11.589 67.1814 10.9926C66.2419 10.3962 65.7721 9.3627 65.7721 7.89212C65.7721 6.38886 66.4176 5.29409 67.7084 4.60782C69.0074 3.92155 70.7231 3.57841 72.8554 3.57841C74.9224 3.57841 76.5074 3.87253 77.6103 4.46076C78.7214 5.04083 79.4445 5.98445 79.7794 7.29163L76.2133 8.61516C76.0417 7.83084 75.6618 7.25895 75.0736 6.89948C74.4935 6.53183 73.7296 6.34801 72.7819 6.34801C71.8832 6.34801 71.1806 6.4869 70.6741 6.76467C70.1757 7.04245 69.9265 7.40193 69.9265 7.8431C69.9265 8.41499 70.2492 8.77855 70.8947 8.93378C71.5482 9.08901 72.5327 9.26058 73.8481 9.44848C75.9886 9.72626 77.549 10.1715 78.5294 10.7843C79.5098 11.3888 80 12.4101 80 13.848C80 15.4738 79.3668 16.6298 78.1005 17.3161C76.8423 18.0024 75.1389 18.3455 72.9902 18.3455Z"></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.45097 18.3823L0 0L10.3553 1.83823C10.7955 1.95407 11.2031 2.0472 11.5784 2.13296C12.9897 2.45543 13.9444 2.67359 14.4607 3.60292C15.1143 4.77122 15.4411 6.20912 15.4411 7.91663C15.4411 9.63231 15.1143 11.0743 14.4607 12.2426C13.8071 13.4109 12.4387 13.995 10.3553 13.995H5.87007L6.72791 18.3823H2.45097ZM3.799 3.799L9.3876 4.78089C9.62517 4.84277 9.84513 4.89252 10.0477 4.93832C10.8093 5.11057 11.3246 5.2271 11.6032 5.72351C11.9559 6.34755 12.1323 7.11561 12.1323 8.02767C12.1323 8.9441 11.9559 9.71434 11.6032 10.3384C11.2505 10.9624 10.5119 11.2745 9.3876 11.2745H6.8347L5.29625 11.1519L3.799 3.799Z"
    ></path>
  </svg>
);
const Tradeport = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="tradeport"
    viewBox="0 0 1401 352"
    fill="currentColor"
  >
    <path d="M121.656 67.0055L146.887 92.4641L41.2313 199.072L16 173.613L121.656 67.0055Z" />
    <path d="M241.504 187.934L266.736 213.392L161.08 320L135.848 294.541L241.504 187.934Z" />
    <path d="M216.273 92.4641L241.504 117.923L101.155 259.536L75.9242 234.077L216.273 92.4641Z" />
    <path d="M301.429 127.47L276.197 152.928L181.58 57.4586L206.811 32L301.429 127.47Z" />
    <path d="M465.078 242.847H503.997V142.155H544.405V109.144H424.856V142.155H465.078V242.847Z" />
    <path d="M611.421 143.077C610.862 142.892 609.931 142.892 609 142.892H606.766C595.779 142.892 584.606 150.269 580.696 162.625V143.63H544.384V242.847H581.627V193.976C581.627 180.698 590.193 177.01 602.11 177.01C605.648 177.01 608.628 177.563 611.421 178.116V143.077Z" />
    <path d="M684.384 179.96C641.928 182.911 618.093 192.317 618.093 215.553C618.093 233.258 634.293 245.245 653.845 245.245C667.997 245.245 680.474 241.003 687.922 229.938V242.847H722.558C721.44 234.733 720.696 222.93 720.696 212.787V203.013L720.882 184.018C721.44 150.822 700.771 140.126 672.094 140.126C639.135 140.126 622.003 158.199 620.513 176.825H652.542C653.845 168.158 659.99 164.1 669.487 164.1C677.494 164.1 684.384 166.313 684.384 177.194V179.96ZM685.688 201.353C685.688 216.66 677.494 220.533 667.811 220.533C659.059 220.533 655.521 215.738 655.521 211.496C655.521 202.828 665.763 199.693 685.688 198.402V201.353Z" />
    <path d="M809.098 157.461C804.629 148.794 793.829 141.417 778.932 141.417C756.587 141.417 735.172 158.937 735.172 193.239C735.172 227.541 756.587 245.245 778.932 245.245C793.829 245.245 804.629 237.868 809.098 229.2V242.847H846.341V109.144H809.098V157.461ZM810.402 193.239C810.402 208.177 802.767 217.766 792.339 217.766C781.725 217.766 775.022 207.255 775.022 193.239C775.022 179.223 781.725 168.895 792.339 168.895C802.767 168.895 810.402 178.301 810.402 193.239Z" />
    <path d="M917.975 245.429C949.258 245.429 966.017 224.037 970.486 209.468H935.479C933.244 214.816 925.795 218.32 918.533 218.32C906.802 218.32 899.726 211.865 898.422 201.722H970.673C973.093 167.236 951.307 139.942 916.299 139.942C885.946 139.942 862.297 160.228 862.297 191.948C862.297 223.115 882.594 245.429 917.975 245.429ZM918.719 165.207C926.727 165.207 936.782 169.449 937.713 181.251H898.981C901.402 169.449 910.898 165.207 918.719 165.207Z" />
    <path d="M987.393 109.144V242.847H1026.31V199.324H1042.33C1077.52 199.324 1103.96 190.657 1103.96 154.326C1103.96 117.996 1077.52 109.144 1042.33 109.144H987.393ZM1045.86 140.31C1057.04 140.31 1063.55 144.552 1063.55 154.326C1063.55 163.916 1057.04 168.158 1045.86 168.158H1026.31V140.31H1045.86Z" />
    <path d="M1164.35 168.158C1173.85 168.158 1181.11 174.612 1181.11 193.054C1181.11 211.496 1173.85 217.766 1164.35 217.766C1154.86 217.766 1147.59 211.496 1147.59 193.054C1147.59 174.612 1154.86 168.158 1164.35 168.158ZM1164.35 245.245C1193.96 245.245 1219.47 227.909 1219.47 193.054C1219.47 158.383 1193.96 140.679 1164.35 140.679C1134.37 140.679 1109.23 158.383 1109.23 193.054C1109.23 227.909 1134.37 245.245 1164.35 245.245Z" />
    <path d="M1301.9 143.077C1301.34 142.892 1300.41 142.892 1299.48 142.892H1297.24C1286.26 142.892 1275.08 150.269 1271.17 162.625V143.63H1234.86V242.847H1272.1V193.976C1272.1 180.698 1280.67 177.01 1292.59 177.01C1296.13 177.01 1299.1 177.563 1301.9 178.116V143.077Z" />
    <path d="M1323.82 143.63H1303.71V166.867H1323.82V212.972C1323.82 240.266 1333.31 242.847 1360.87 242.847H1386.57V217.951H1368.32C1363.29 217.951 1361.06 216.844 1361.06 211.127V166.867H1386.57V143.63H1361.06V116.336H1323.82V143.63Z" />
  </svg>
);
return (
  <Wrapper className="d-flex align-items-center flex-row p-2">
    <div className="me-3">{Locked}</div>
    <div className="flex-grow-1">
      <p>{text}</p>
      <div className="d-flex flex-wrap gap-2">
        <a
          className="btn btn-outline-primary rounded-5 text-nowrap"
          href={`/mintbase.near/widget/nft-marketplace?contracts=${groupId}&affiliateAccount=mob.near`}
        >
          Buy on {Mintbase}
        </a>
        <a
          className="btn btn-outline-primary rounded-5 text-nowrap"
          href={`https://paras.id/collection/${groupId}`}
        >
          Buy on {Paras}
        </a>
        <a
          className="btn btn-outline-primary rounded-5 text-nowrap"
          href={`https://www.tradeport.xyz/near/collection/${groupId}`}
        >
          Buy on {Tradeport}
        </a>
      </div>
    </div>
  </Wrapper>
);
