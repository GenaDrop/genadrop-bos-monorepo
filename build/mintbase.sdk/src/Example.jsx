const [imgs, setImgs] = useState([]);
// asyncFetch(
//   "https://ipfs.near.social/ipfs/bafkreia3qo4vaox6mxjflxz2tw3jzlquhdafoxzlhmgnhc5wk3wrfmghgm"
// ).then((res) => console.log(res));

const uploadFileUpdateState = (body) => {
  console.log(body);
  // asyncFetch("https://ipfs.near.social/add", {
  //   method: "POST",
  //   headers: { Accept: "application/json" },
  //   body,
  // }).then((res) => {
  //   const cid = res.body.cid;
  //   const newimgs = imgs;
  //   newimgs.push({ [body.name.split(".svg")[0]]: cid });
  //   setImgs(newimgs);
  //   console.log(imgs);
  // });
};
// console.log(imgs);

const filesOnChange = (files) => {
  if (files) {
    // State.update({ img: { uploading: true, cid: null } });
    // console.log(files);
    files.map((file, idx) => uploadFileUpdateState(file));
    // uploadFileUpdateState(files[0]);
  }
};

const icons = [
  {
    like_filled: "bafkreif4fqcevu7lzdf43qwbnquvguybw4kq23p4yaxqxcasr7nhekvdsq",
  },
  {
    order_by: "bafkreih6ksbqsm3eqqaacutuhspwaslk7soshme4xys7px7f3kpsfcmt5a",
  },
  {
    "nearsocial-icon":
      "bafkreicyea77kb5zilz74vtc5pvyzkcdtaxybyi6dfk23o2ia7gz7rsmku",
  },
  {
    paras_badge_dark:
      "bafkreicubuyaztt5ngz6ucga2sjeephzs3nsm3lfdg4pavwscinqgxt7hu",
  },
  {
    mintbase_light_badge:
      "bafkreif4gskyku55ccjgyfx4tzvckpjacx2unkd36zwg2vksh6e5z7e5uu",
  },
  {
    fullscreen_exit:
      "bafkreidlmhrigyhshb24n4yqrnywyjlb2ue6hvha7j46ququopijmtlylu",
  },
  {
    discord: "bafkreiczebvcuxymdtfbi4ih3eia5bfqhmjrordrt5gbmmqfwimbf7gqze",
  },
  {
    fewfar_badge_dark_1:
      "bafkreifzjzsrkt3dbdgoi5i6dmo43hfzart5zspbxle6vre3vl4m4geyfe",
  },
  {
    coins: "bafkreiflssmsuuspcfi4qavy7dldotelupmd36qkqxfl66gl6gssi6enci",
  },
  {
    paras_badge_light:
      "bafkreiblbfxmyhjmp55qh3cqugtcoqohdgjsrd3ecx3dn7cjjjan3rph74",
  },
  {
    mintbase_dark_badge:
      "bafkreie4sshw4qgqqd7ome5lfgcfqyxoaowgj2n6ylipb2uhvcvxuo4pku",
  },
  {
    more: "bafkreiaa3cjdvzkwwihf535qh7wyz2jp5kdc2od353qoin4bpk524c3vgq",
  },
  {
    forward: "bafkreidwp65t4bqrh7v2huou2tzi7dkzalgivsbyyk3sffgm75unbbakxi",
  },
  {
    link: "bafkreichfodyjsyxfodesdzxdnxcw4b4c5zdibszi4m527fylkuzj33qnu",
  },
  {
    multiply: "bafkreigo7ldbjo3esdnytfky2hq4k7j5vnvmfxfmpuzd6n6x5qxcfss2mu",
  },
  {
    hand_shake: "bafkreibybkctg4wsldlazmrlqtol4s5knjrkkxd7whgdzrdi3kdinsw6jq",
  },
  {
    linkedin: "bafkreiddx77sqfwsc536z6busr2qtqtxzhnn4dd3quqqfbkajmozehddlq",
  },
  {
    file: "bafkreihhnvjxz4wpeyh3iul5764hnwmdqmfsp36rjizb55f5o2wtcriqyu",
  },
  {
    hand_coins: "bafkreifnj7yj444vjpm53kdhoka45x3kvo3w5wpqq3jov26fwjvlaygqtu",
  },
  {
    compare_arrows:
      "bafkreid2q4juln6zr4xn7omlddchwcihhkqq6exqwtios2kjzuh7i56wi4",
  },
  {
    fullscreen: "bafkreidpqjceq643rhoftqqpuhpbrhiyb4eqpov45zamc6lyeimcu7qjme",
  },
  {
    instagram: "bafkreidw3hdlgxoicn5vo66jddyks3grf3r447tkqzbyvhkt6egnggf4si",
  },
  {
    image_not_supported:
      "bafkreiddlczuvrr2fkunl6uqunmt6jxjemenagjv7zzyq2qxfgw2birlxa",
  },
  {
    house: "bafkreicjomwgilefe6fq4rrj2yalm67e45kiiucwmi3tgbzeuvbwz6vzlm",
  },
  {
    editions: "bafkreid3ltxlgtvsv7jruukvgruxsgqnwwf3imke2g5xiceotfy6zzrvjq",
  },
  {
    fewfar_badge_dark:
      "bafkreibqsy75m2a2l7sm2sm6mo7szc6i4hapkqm4ovaygjwdiioyj7pjx4",
  },
  {
    mintbase: "bafkreiah7rvt5wahfkahkiw6hqrlvchaiofc3b3745ookm5anqvydz37qa",
  },
  {
    edit: "bafkreiazbd7rdhdmndwhulh3zl23y3pkw4bq2ytvdagplg2sanphedpcci",
  },
  {
    near: "bafkreifywzwywwfgi2wxttoclo7avuxz5ckeyu7nzk2xkxo6gwbtykosma",
  },
  {
    medium: "bafkreiabmmnshuammkgewfhlh3f3wekkq5w3x4anpr3ydnch2ajutcqphe",
  },
  {
    "nearsocial-long":
      "bafkreidpyqfbrcugzd5yswmhacjxevihbm3mrvhb3zddhx7camspnotj6q",
  },
  {
    github: "bafkreigzj7xklyao6bw66azye4tdmahvll2jlwzyhjse6563ere55lqxi4",
  },
  {
    open_new_tab: "bafkreibhclv7nza73dygjdsh2fgorr6kvurymhuzan7vqrub4quo4khqa4",
  },
  {
    "arrow_back_small - Copy":
      "bafkreid6ejcdga57u2nbi4pbrvz43zvhvftt2podsfbepnn3jidz4ewgly",
  },
  {
    flash: "bafkreidto66ydm447jux64tu5qkc5xyjdfoglt2vd6qmquoz6bju4e5zem",
  },
  {
    notifications:
      "bafkreidexgeinbxwaaapx2o2e3tyx6keso62p6a3ew5vygnqwmkqyfa7s4",
  },
  {
    moon: "bafkreifbdg4xakj2eaeow5edtve47l6hrdizliov5jhzhqwbrw5332752m",
  },
  {
    arrow_forward:
      "bafkreib6jlcn6qg6d6foyjqr6p43eulg3jghskxcsx2ki2upmjklwqlyze",
  },
  {
    filters: "bafkreigb723p6lzyyp3bnwjklm3ayo3thursrha2kcbyto55kp5mvylygi",
  },
  {
    fewfar_badge_light_1:
      "bafkreidkwvpidqqv3e2pmbzy535mhw3rz4cc2uqjktidk7ufuvcoxgyd4e",
  },
  {
    copy: "bafkreidbeujwvtpzjy3zcgt33hq53yn427t2s3ipd2hli42hjpttdrrhxm",
  },
  {
    eye: "bafkreibtye6bpyk2lldolnntpedx6sml5xt7q2z6cbbe2lpn7oa2mgruzu",
  },
  {
    fewfar_badge_light:
      "bafkreig2cesfaabemaomvilxrfaq24yvkhpapaspu2xdajpotxvlaryysm",
  },
  {
    menu: "bafkreigez65lbpxl7qln7bget7j6c6bbsnsain3wwm6ym4rfpkx35mjjsm",
  },
  {
    image: "bafkreib6hij6r6sws2t4ex2yqjma3v7t4swanoojyllyekfpmjraycou5i",
  },
  {
    info: "bafkreib36njvvwj27hzoojh6otglsamk7f4k7v7e4x3xkysuiyi6pl2plm",
  },
  {
    credit_card: "bafkreid2maqdxbzrw2jzzwjmlzfxklcqbq5kcg6nqw7m2vo2pvj2bquh2i",
  },
  {
    arrow_back: "bafkreia72rg662h5zal6r3fnib5ywligz2nlzbyk7mwl3bxbmg3ikjhwaa",
  },
  {
    faders: "bafkreidqg2ca7mvpkxnnghq7bmzaxroj7tv3vsxxagto6z7jg5blt3zvpe",
  },
  {
    download: "bafkreiega3eb72krhfeoj7oqpcbclacc5tqc4xdbqizx6e4s3vt53wlgoe",
  },
  {
    check: "bafkreiaqp25mab54cjd5y64yuwfjcse5m7joel47mkg4iitislf6p47pr4",
  },
  {
    facebook: "bafkreigxcaxri64h5qcz4gbkf7dvcjbexjg6ul2uc4ql3vtagjmdspd4hi",
  },
  {
    arrow_drop_down:
      "bafkreifjaq5x2jpkmo4xu6sldzb5h4cjmgythccnr5k4dlaxbriikgw2ny",
  },
  {
    arrow_back_big:
      "bafkreifdgf7cb6ritdbh7rozxxh5cwmnlnngkjrfnas2gz2kfh6udnetui",
  },
  {
    pause: "bafkreie2y6pls3dpe7ejhhrog5vfnb3tp55qt6xllnshp7qytrth3xoiia",
  },
  {
    arrow_drop_up:
      "bafkreigkjcolcm6zvbvfx5edkb742mmeppeho3jwh6bgnmwt7zwb2mrhw4",
  },
  {
    like: "bafkreifo2wtu4arzz7nthcpebmfp3c42wrybuhkesubjbasvtorwohqo7a",
  },
  {
    book: "bafkreia33mkbmf5jtle357ok7ihns7wyv5puiibqhc543p4jrxryr7iskq",
  },
  {
    arrow_expand_more:
      "bafkreihr5nbfj5nw5subw6bank6j34nlaegd6c4b3tjt74efongfaxygby",
  },
  {
    arrow_diagonal:
      "bafkreifz4gosczmuwcpzcttxfvp4niltmplsvvxbwanedv3uujmb74b5la",
  },
  {
    block: "bafkreihqf2qfdgdx42hpsvndttcj6yz3n2mcjygxj76zwfvyamopltn36a",
  },
  {
    hand_raise: "bafkreihbkrobk7jteyjy3cjgtbvccaigjb6a7p6m544oarrlvfudcow5fa",
  },
  {
    chartpie: "bafkreieycnu7apdqbahaqslkq5huj6bd7vgxawbc7cjnva32bmgtyns3bm",
  },
  {
    backspace: "bafkreig6cxtzd3nx7actslyn5bddv5ppfmyedpb7ghbfg6pfz3633ymuie",
  },
  {
    burn: "bafkreiesl3jgla3iqnfyurda2mthuu2vl5ix7dgwzf5gljvtrn2htst7uy",
  },
  {
    arrow_expand_less:
      "bafkreibs4woypozor7cjpc4br6eu3nyv6kqqcc637ee27yzobrd5d2ouau",
  },
  {
    apollo42_badge_light:
      "bafkreibnakuexdhzca3nn4edpsghesrlhiz33md5b5477sshg7lfawyzym",
  },
  {
    close: "bafkreihcpigwh2fs4ssz4ry3t2s7dpngvmrnxwtg7dw37r4ewido3l37se",
  },
  {
    report: "bafkreiebxor7mokgmy4zmuge5hof2yjncnjbkraghmpr7bz5g7byweicyy",
  },
  {
    pinterest: "bafkreigsyfjtbc23d3ofsssep44o4r2bnb4qnslc3jkokylfyvffsp4mom",
  },
  {
    search: "bafkreic74jemomt5rxwcyyid7fj2kab2fo3phyutejo2u24tivnvtu56pq",
  },
  {
    error: "bafkreigcupbyzmolfroczdc7numhybqq2gh5uufmer6kwxxl3p6jz4ofdu",
  },
  {
    audio: "bafkreiaivj5jivs57fbqwnxnkc5nspa473gcz3zgi2x4b7adbxd4jpnyki",
  },
  {
    arrow_forward_big:
      "bafkreidxexv4kxhmag4jenytdzbqgqbwgzm7jowllfxbctdloxzrhgjjvm",
  },
  {
    shift: "bafkreieeacxv6eugwql6cqvrj62ld7bn4xfriu7ur55wcnikgjrygn52p4",
  },
  {
    arrow_up: "bafkreibvgpoqiyc6x72af7y74yt44nw3aahn2zqjelgwdvk375fiekvure",
  },
  {
    shield_check: "bafkreic3igrnu5blpu5gm3zlqs7uio3ec3yglnga6kwslxqzinqp45av6i",
  },
  {
    robot: "bafkreic4v64priiw6qwidvaagfk7dih766m66schvntwbujzln7tfioiky",
  },
  {
    send: "bafkreihlg2cbklj4o2zdu62yfuaqutoxqdmaoysvxr7d7yozlcmz25xin4",
  },
  {
    delete: "bafkreifryizbivvy3iqfn2nodi5njzixwc4spkwjzeipxfvgy7upeymofa",
  },
  {
    simple_credit_card:
      "bafkreid23sbjfn6e4oocbn3nxadelfcte2f4qngni7k34em4b56b7i4c2a",
  },
  {
    satori_badge_light:
      "bafkreiea4hk3tojcsn5kdnblindha2q5sbat224a4cn27rogdbqlmexmfm",
  },
  {
    arrow_forward_small:
      "bafkreifwu5kumootfixwqnfe6cklvfhxe7vb36brbw6xps2i577dkrqw2a",
  },
  {
    play: "bafkreianyqn3p2mccpqxtgdsvhsgwghxpmcbp6umfcfzvmrziuafncvgb4",
  },
  {
    arrow_back_small:
      "bafkreid6ejcdga57u2nbi4pbrvz43zvhvftt2podsfbepnn3jidz4ewgly",
  },
  {
    simple_share: "bafkreian3azpoybjoapi6eibbkn6ukrzxdcwidjsorcuh2f46ovll7ypz4",
  },
  {
    telegram: "bafkreicr3mgynwhdlkitnkz2ep6dmuc6lnhdpu5se5cu2jcki2qzcth64e",
  },
  {
    tenk_badge_light:
      "bafkreiew6czg7oxfv75r3v4yzrrmnby3u3h3j65v6ikoxhhkuj57bbujfu",
  },
  {
    success: "bafkreidmq53salfcsve23fzyu6u6yxip67cobnwryk5h42iqyowqrfuoqm",
  },
  {
    sell: "bafkreif3223ih7in4fttd5a3a42bfj3y6tnoqw7zenljyufrjp4fqalj3u",
  },
  {
    threed: "bafkreico4k5kek2uouqckkqhb3hggpqikoflhz72dmy6a7sduon3wit2ne",
  },
  {
    stables: "bafkreib7l55zztcfl2cot3edhgu6k3uakqpzf6qfojqklv4tjyn4nneivy",
  },
  {
    share: "bafkreic2gs4rodad6rklmzlysyguez4woovaj3ojk3qnoncvkyl3uug5yu",
  },
  {
    select_arrows:
      "bafkreifb4g4cacraapqhoauliug3h3n7r4yl6yutf5a6eiqvgeouw6z3be",
  },
  {
    terminal: "bafkreihig7avwubj2iy4elnirblcyzyyp4gbssn6l2gn6mihujtrveltuy",
  },
  {
    apollo42_badge_dark:
      "bafkreia3qo4vaox6mxjflxz2tw3jzlquhdafoxzlhmgnhc5wk3wrfmghgm",
  },
  {
    sun: "bafkreigxkaho4g6wojjjvqcyns2ozeadkls24yedptxzhrbao6ghwhwvhq",
  },
  {
    ticket: "bafkreiady3l32kjexneduhrtrc26flibujvwtorx6ljtpyh2zw6uxg4zxu",
  },
  {
    unlink: "bafkreia2tdgyvknpi4znmak3buetfj4bumuc6f4uf56g57fvspwqzd2ciq",
  },
  {
    verified: "bafkreibblgpeviegl5pioom6hjm5ac62yiuk7oojvy36ups5b5z2rs3b7i",
  },
  {
    usdt: "bafkreia2vmpeo2jskybgm47gpbn2usysrva6mv6ovwh4ixftvd5hhlq46u",
  },
  {
    satori_badge_dark:
      "bafkreibgedft66zylkc75xhkfnq2t5qzgz74teykxhtqbwgp4wfrmcrbpi",
  },
  {
    rocket: "bafkreihxhdnjd3hop7kbrwziau6zo5bvfjjlxinugcsbgeq4dk2ba5cku4",
  },
  {
    twitter: "bafkreib5ldb77n46ufygwx4i6nnsa4snytabwywvy2756r7lqfh6dziluu",
  },
  {
    wallet: "bafkreigkfxm3nvci6nhpfaarq7zoy5rrqqsxjnu3czciwg62cik4ulekki",
  },
  {
    web: "bafkreicimfw3ws3nncrfetfqw2yzsefqasf4sjpkk26pkyfyluk6qatfey",
  },
  {
    youtube: "bafkreibnmj4vpxjj6r7hw6rck2f7ygfr3g7zxsrgogfzfm4squpzl4v3yy",
  },
  {
    usdc: "bafkreigzmgrev73okqmr2kikmmlvtlwdugwzyatrwhjhaejzy6o7vcvgu4",
  },
  {
    video: "bafkreiflkpx23w6dy4qimqxptwcsuvtcc6je774uzbjhjc4fzmv4hgevni",
  },
  {
    tenk_badge_dark:
      "bafkreiayy5twe4aiiyzs7k27xhrraheu7hxusitggacckwub7zha3o5uy4",
  },
];

const object = Object.assign({}, ...icons);
console.log(object);

return (
  <div className="d-inline-block">
    {state.img ? (
      <img
        class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview"
      />
    ) : (
      ""
    )}

    <Files
      multiple={true}
      // accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.img?.uploading ? <> Uploading </> : "Upload an Image"}
    </Files>
  </div>
);
