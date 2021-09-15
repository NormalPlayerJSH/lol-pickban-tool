export interface ChampData {
  id: string;
  key: string;
  name: string;
}

export const currentVersion = "11.17.1";

export const ChampMeta: { [x: number]: ChampData } = {
  0: { id: "None", key: "0", name: "선택하지 않음" },
  1: { id: "Annie", key: "1", name: "애니" },
  2: { id: "Olaf", key: "2", name: "올라프" },
  3: { id: "Galio", key: "3", name: "갈리오" },
  4: { id: "TwistedFate", key: "4", name: "트위스티드 페이트" },
  5: { id: "XinZhao", key: "5", name: "신 짜오" },
  6: { id: "Urgot", key: "6", name: "우르곳" },
  7: { id: "Leblanc", key: "7", name: "르블랑" },
  8: { id: "Vladimir", key: "8", name: "블라디미르" },
  9: { id: "Fiddlesticks", key: "9", name: "피들스틱" },
  10: { id: "Kayle", key: "10", name: "케일" },
  11: { id: "MasterYi", key: "11", name: "마스터 이" },
  12: { id: "Alistar", key: "12", name: "알리스타" },
  13: { id: "Ryze", key: "13", name: "라이즈" },
  14: { id: "Sion", key: "14", name: "사이온" },
  15: { id: "Sivir", key: "15", name: "시비르" },
  16: { id: "Soraka", key: "16", name: "소라카" },
  17: { id: "Teemo", key: "17", name: "티모" },
  18: { id: "Tristana", key: "18", name: "트리스타나" },
  19: { id: "Warwick", key: "19", name: "워윅" },
  20: { id: "Nunu", key: "20", name: "누누와 윌럼프" },
  21: { id: "MissFortune", key: "21", name: "미스 포츈" },
  22: { id: "Ashe", key: "22", name: "애쉬" },
  23: { id: "Tryndamere", key: "23", name: "트린다미어" },
  24: { id: "Jax", key: "24", name: "잭스" },
  25: { id: "Morgana", key: "25", name: "모르가나" },
  26: { id: "Zilean", key: "26", name: "질리언" },
  27: { id: "Singed", key: "27", name: "신지드" },
  28: { id: "Evelynn", key: "28", name: "이블린" },
  29: { id: "Twitch", key: "29", name: "트위치" },
  30: { id: "Karthus", key: "30", name: "카서스" },
  31: { id: "Chogath", key: "31", name: "초가스" },
  32: { id: "Amumu", key: "32", name: "아무무" },
  33: { id: "Rammus", key: "33", name: "람머스" },
  34: { id: "Anivia", key: "34", name: "애니비아" },
  35: { id: "Shaco", key: "35", name: "샤코" },
  36: { id: "DrMundo", key: "36", name: "문도 박사" },
  37: { id: "Sona", key: "37", name: "소나" },
  38: { id: "Kassadin", key: "38", name: "카사딘" },
  39: { id: "Irelia", key: "39", name: "이렐리아" },
  40: { id: "Janna", key: "40", name: "잔나" },
  41: { id: "Gangplank", key: "41", name: "갱플랭크" },
  42: { id: "Corki", key: "42", name: "코르키" },
  43: { id: "Karma", key: "43", name: "카르마" },
  44: { id: "Taric", key: "44", name: "타릭" },
  45: { id: "Veigar", key: "45", name: "베이가" },
  48: { id: "Trundle", key: "48", name: "트런들" },
  50: { id: "Swain", key: "50", name: "스웨인" },
  51: { id: "Caitlyn", key: "51", name: "케이틀린" },
  53: { id: "Blitzcrank", key: "53", name: "블리츠크랭크" },
  54: { id: "Malphite", key: "54", name: "말파이트" },
  55: { id: "Katarina", key: "55", name: "카타리나" },
  56: { id: "Nocturne", key: "56", name: "녹턴" },
  57: { id: "Maokai", key: "57", name: "마오카이" },
  58: { id: "Renekton", key: "58", name: "레넥톤" },
  59: { id: "JarvanIV", key: "59", name: "자르반 4세" },
  60: { id: "Elise", key: "60", name: "엘리스" },
  61: { id: "Orianna", key: "61", name: "오리아나" },
  62: { id: "MonkeyKing", key: "62", name: "오공" },
  63: { id: "Brand", key: "63", name: "브랜드" },
  64: { id: "LeeSin", key: "64", name: "리 신" },
  67: { id: "Vayne", key: "67", name: "베인" },
  68: { id: "Rumble", key: "68", name: "럼블" },
  69: { id: "Cassiopeia", key: "69", name: "카시오페아" },
  72: { id: "Skarner", key: "72", name: "스카너" },
  74: { id: "Heimerdinger", key: "74", name: "하이머딩거" },
  75: { id: "Nasus", key: "75", name: "나서스" },
  76: { id: "Nidalee", key: "76", name: "니달리" },
  77: { id: "Udyr", key: "77", name: "우디르" },
  78: { id: "Poppy", key: "78", name: "뽀삐" },
  79: { id: "Gragas", key: "79", name: "그라가스" },
  80: { id: "Pantheon", key: "80", name: "판테온" },
  81: { id: "Ezreal", key: "81", name: "이즈리얼" },
  82: { id: "Mordekaiser", key: "82", name: "모데카이저" },
  83: { id: "Yorick", key: "83", name: "요릭" },
  84: { id: "Akali", key: "84", name: "아칼리" },
  85: { id: "Kennen", key: "85", name: "케넨" },
  86: { id: "Garen", key: "86", name: "가렌" },
  89: { id: "Leona", key: "89", name: "레오나" },
  90: { id: "Malzahar", key: "90", name: "말자하" },
  91: { id: "Talon", key: "91", name: "탈론" },
  92: { id: "Riven", key: "92", name: "리븐" },
  96: { id: "KogMaw", key: "96", name: "코그모" },
  98: { id: "Shen", key: "98", name: "쉔" },
  99: { id: "Lux", key: "99", name: "럭스" },
  101: { id: "Xerath", key: "101", name: "제라스" },
  102: { id: "Shyvana", key: "102", name: "쉬바나" },
  103: { id: "Ahri", key: "103", name: "아리" },
  104: { id: "Graves", key: "104", name: "그레이브즈" },
  105: { id: "Fizz", key: "105", name: "피즈" },
  106: { id: "Volibear", key: "106", name: "볼리베어" },
  107: { id: "Rengar", key: "107", name: "렝가" },
  110: { id: "Varus", key: "110", name: "바루스" },
  111: { id: "Nautilus", key: "111", name: "노틸러스" },
  112: { id: "Viktor", key: "112", name: "빅토르" },
  113: { id: "Sejuani", key: "113", name: "세주아니" },
  114: { id: "Fiora", key: "114", name: "피오라" },
  115: { id: "Ziggs", key: "115", name: "직스" },
  117: { id: "Lulu", key: "117", name: "룰루" },
  119: { id: "Draven", key: "119", name: "드레이븐" },
  120: { id: "Hecarim", key: "120", name: "헤카림" },
  121: { id: "Khazix", key: "121", name: "카직스" },
  122: { id: "Darius", key: "122", name: "다리우스" },
  126: { id: "Jayce", key: "126", name: "제이스" },
  127: { id: "Lissandra", key: "127", name: "리산드라" },
  131: { id: "Diana", key: "131", name: "다이애나" },
  133: { id: "Quinn", key: "133", name: "퀸" },
  134: { id: "Syndra", key: "134", name: "신드라" },
  136: { id: "AurelionSol", key: "136", name: "아우렐리온 솔" },
  141: { id: "Kayn", key: "141", name: "케인" },
  142: { id: "Zoe", key: "142", name: "조이" },
  143: { id: "Zyra", key: "143", name: "자이라" },
  145: { id: "Kaisa", key: "145", name: "카이사" },
  147: { id: "Seraphine", key: "147", name: "세라핀" },
  150: { id: "Gnar", key: "150", name: "나르" },
  154: { id: "Zac", key: "154", name: "자크" },
  157: { id: "Yasuo", key: "157", name: "야스오" },
  161: { id: "Velkoz", key: "161", name: "벨코즈" },
  163: { id: "Taliyah", key: "163", name: "탈리야" },
  164: { id: "Camille", key: "164", name: "카밀" },
  166: { id: "Akshan", key: "166", name: "아크샨" },
  201: { id: "Braum", key: "201", name: "브라움" },
  202: { id: "Jhin", key: "202", name: "진" },
  203: { id: "Kindred", key: "203", name: "킨드레드" },
  222: { id: "Jinx", key: "222", name: "징크스" },
  223: { id: "TahmKench", key: "223", name: "탐 켄치" },
  234: { id: "Viego", key: "234", name: "비에고" },
  235: { id: "Senna", key: "235", name: "세나" },
  236: { id: "Lucian", key: "236", name: "루시안" },
  238: { id: "Zed", key: "238", name: "제드" },
  240: { id: "Kled", key: "240", name: "클레드" },
  245: { id: "Ekko", key: "245", name: "에코" },
  246: { id: "Qiyana", key: "246", name: "키아나" },
  254: { id: "Vi", key: "254", name: "바이" },
  266: { id: "Aatrox", key: "266", name: "아트록스" },
  267: { id: "Nami", key: "267", name: "나미" },
  268: { id: "Azir", key: "268", name: "아지르" },
  350: { id: "Yuumi", key: "350", name: "유미" },
  360: { id: "Samira", key: "360", name: "사미라" },
  412: { id: "Thresh", key: "412", name: "쓰레쉬" },
  420: { id: "Illaoi", key: "420", name: "일라오이" },
  421: { id: "RekSai", key: "421", name: "렉사이" },
  427: { id: "Ivern", key: "427", name: "아이번" },
  429: { id: "Kalista", key: "429", name: "칼리스타" },
  432: { id: "Bard", key: "432", name: "바드" },
  497: { id: "Rakan", key: "497", name: "라칸" },
  498: { id: "Xayah", key: "498", name: "자야" },
  516: { id: "Ornn", key: "516", name: "오른" },
  517: { id: "Sylas", key: "517", name: "사일러스" },
  518: { id: "Neeko", key: "518", name: "니코" },
  523: { id: "Aphelios", key: "523", name: "아펠리오스" },
  526: { id: "Rell", key: "526", name: "렐" },
  555: { id: "Pyke", key: "555", name: "파이크" },
  777: { id: "Yone", key: "777", name: "요네" },
  875: { id: "Sett", key: "875", name: "세트" },
  876: { id: "Lillia", key: "876", name: "릴리아" },
  887: { id: "Gwen", key: "887", name: "그웬" },
};

export const sortedList = Object.keys(ChampMeta).sort((l, r) => {
  if (
    ChampMeta[l as unknown as number].name >
    ChampMeta[r as unknown as number].name
  )
    return 1;
  return -1;
});

export const champWatching: { [x: number]: "left" | "right" } = {
  0: "left",
  1: "left",
  2: "left",
  3: "right",
  4: "left",
  5: "left",
  6: "left",
  7: "right",
  8: "right",
  9: "right",
  10: "right",
  11: "left",
  12: "left",
  13: "right",
  14: "left",
  15: "left",
  16: "left",
  17: "left",
  18: "left",
  19: "left",
  20: "left",
  21: "left",
  22: "left",
  23: "right",
  24: "right",
  25: "left",
  26: "left",
  27: "right",
  28: "left",
  29: "right",
  30: "left",
  31: "left",
  32: "left",
  33: "left",
  34: "left",
  35: "left",
  36: "left",
  37: "left",
  38: "left",
  39: "right",
  40: "left",
  41: "left",
  42: "right",
  43: "left",
  44: "right",
  45: "right",
  48: "left",
  50: "left",
  51: "left",
  53: "left",
  54: "left",
  55: "left",
  56: "left",
  57: "left",
  58: "left",
  59: "left",
  60: "right",
  61: "left",
  62: "left",
  63: "right",
  64: "left",
  67: "left",
  68: "left",
  69: "left",
  72: "left",
  74: "left",
  75: "left",
  76: "left",
  77: "left",
  78: "right",
  79: "left",
  80: "right",
  81: "left",
  82: "right",
  83: "right",
  84: "right",
  85: "right",
  86: "left",
  89: "left",
  90: "right",
  91: "left",
  92: "left",
  96: "left",
  98: "left",
  99: "left",
  101: "left",
  102: "left",
  103: "left",
  104: "left",
  105: "left",
  106: "left",
  107: "left",
  110: "right",
  111: "left",
  112: "left",
  113: "right",
  114: "left",
  115: "left",
  117: "left",
  119: "left",
  120: "left",
  121: "right",
  122: "left",
  126: "left",
  127: "left",
  131: "left",
  133: "left",
  134: "left",
  136: "right",
  141: "right",
  142: "left",
  143: "left",
  145: "left",
  147: "left",
  150: "right",
  154: "left",
  157: "left",
  161: "left",
  163: "left",
  164: "right",
  166: "left",
  201: "left",
  202: "left",
  203: "right",
  222: "left",
  223: "left",
  234: "right",
  235: "left",
  236: "right",
  238: "left",
  240: "right",
  245: "left",
  246: "left",
  254: "left",
  266: "right",
  267: "left",
  268: "left",
  350: "left",
  360: "left",
  412: "left",
  420: "right",
  421: "left",
  427: "right",
  429: "left",
  432: "right",
  497: "right",
  498: "right",
  516: "left",
  517: "right",
  518: "left",
  523: "right",
  526: "right",
  555: "right",
  777: "left",
  875: "left",
  876: "right",
  887: "left",
};

export default ChampMeta;
