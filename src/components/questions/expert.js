const expertQuestions = [
  /* ======================
        rank1（準1級レベル）
       ======================= */
  { level: "expert", rank: "1", kanji: "杣人", reading: "そまびと" },
  { level: "expert", rank: "1", kanji: "躊躇", reading: "ちゅうちょ" },
  { level: "expert", rank: "1", kanji: "汎用", reading: "はんよう" },
  { level: "expert", rank: "1", kanji: "膠着", reading: "こうちゃく" },
  { level: "expert", rank: "1", kanji: "逡巡", reading: "しゅんじゅん" },

  { level: "expert", rank: "1", kanji: "峻厳", reading: "しゅんげん" },
  { level: "expert", rank: "1", kanji: "詭計", reading: "きけい" },
  { level: "expert", rank: "1", kanji: "緻密", reading: "ちみつ" },
  { level: "expert", rank: "1", kanji: "敢行", reading: "かんこう" },
  { level: "expert", rank: "1", kanji: "彷徨", reading: "ほうこう、さまよう" },

  { level: "expert", rank: "1", kanji: "稟性", reading: "ひんせい" },
  { level: "expert", rank: "1", kanji: "弛緩", reading: "しかん" },
  { level: "expert", rank: "1", kanji: "慫慂", reading: "しょうよう" },
  { level: "expert", rank: "1", kanji: "艱え", reading: "なやましげ" },
  { level: "expert", rank: "1", kanji: "厳粛", reading: "げんしゅく" },

  { level: "expert", rank: "1", kanji: "彙報", reading: "いほう" },
  { level: "expert", rank: "1", kanji: "饗応", reading: "きょうおう" },
  { level: "expert", rank: "1", kanji: "稀覯書", reading: "きこうしょ" },
  { level: "expert", rank: "1", kanji: "遡行", reading: "そこう" },
  { level: "expert", rank: "1", kanji: "俯瞰", reading: "ふかん" },

  { level: "expert", rank: "1", kanji: "暫時", reading: "ざんじ" },
  { level: "expert", rank: "1", kanji: "頑迷", reading: "がんめい" },
  { level: "expert", rank: "1", kanji: "幽棲", reading: "ゆうせい" },
  { level: "expert", rank: "1", kanji: "焦眉", reading: "しょうび" },
  { level: "expert", rank: "1", kanji: "喚起", reading: "かんき" },

  { level: "expert", rank: "1", kanji: "稠密", reading: "ちゅうみつ" },
  { level: "expert", rank: "1", kanji: "潜藪", reading: "せんそう" },
  {
    level: "expert",
    rank: "1",
    kanji: "謹厳実直",
    reading: "きんげんじっちょく",
  },
  { level: "expert", rank: "1", kanji: "逼塞", reading: "ひっそく" },
  { level: "expert", rank: "1", kanji: "峨峨", reading: "がが" },

  { level: "expert", rank: "1", kanji: "偏頗", reading: "へんぱ" },
  { level: "expert", rank: "1", kanji: "巽", reading: "たつみ" },
  { level: "expert", rank: "1", kanji: "隘路", reading: "あいろ" },
  { level: "expert", rank: "1", kanji: "釣果", reading: "ちょうか" },
  { level: "expert", rank: "1", kanji: "偉丈夫", reading: "いじょうふ" },

  { level: "expert", rank: "1", kanji: "醇朴", reading: "じゅんぼく" },
  { level: "expert", rank: "1", kanji: "謁見", reading: "えっけん" },
  { level: "expert", rank: "1", kanji: "猥雑", reading: "わいざつ" },
  { level: "expert", rank: "1", kanji: "衒気", reading: "げんき" },
  { level: "expert", rank: "1", kanji: "夙昔", reading: "しゅくせき" },

  { level: "expert", rank: "1", kanji: "瑣末", reading: "さまつ" },
  { level: "expert", rank: "1", kanji: "据置", reading: "すえおき" },
  { level: "expert", rank: "1", kanji: "楚々", reading: "そそ" },
  { level: "expert", rank: "1", kanji: "膏肓", reading: "こうこう" },
  { level: "expert", rank: "1", kanji: "毀誉", reading: "きよ" },

  { level: "expert", rank: "1", kanji: "逼迫度", reading: "ひっぱくど" },
  { level: "expert", rank: "1", kanji: "幽邃", reading: "ゆうすい" },
  { level: "expert", rank: "1", kanji: "慇懃無礼", reading: "いんぎんぶれい" },
  { level: "expert", rank: "1", kanji: "高踏的", reading: "こうとうてき" },
  {
    level: "expert",
    rank: "1",
    kanji: "泥中の蓮",
    reading: "でいちゅうのはす",
  },

  /* =======================
        rank2（準1級〜1級）
       ======================= */
  { level: "expert", rank: "2", kanji: "佶屈", reading: "きっくつ" },
  { level: "expert", rank: "2", kanji: "嫋やか", reading: "たおやか" },
  { level: "expert", rank: "2", kanji: "瀟洒", reading: "しょうしゃ" },
  { level: "expert", rank: "2", kanji: "靉靆", reading: "あいたい" },
  { level: "expert", rank: "2", kanji: "蹉跌", reading: "さてつ" },

  { level: "expert", rank: "2", kanji: "冗漫", reading: "じょうまん" },
  { level: "expert", rank: "2", kanji: "鯑", reading: "かずのこ" },
  { level: "expert", rank: "2", kanji: "瑣事", reading: "さじ" },
  { level: "expert", rank: "2", kanji: "濠", reading: "ほり" },
  { level: "expert", rank: "2", kanji: "曖冥", reading: "あいめい" },

  { level: "expert", rank: "2", kanji: "錯簡", reading: "さっかん" },
  { level: "expert", rank: "2", kanji: "饕餮", reading: "とうてつ" },
  { level: "expert", rank: "2", kanji: "穹窿", reading: "きゅうりゅう" },
  { level: "expert", rank: "2", kanji: "冰解", reading: "ひょうかい" },
  { level: "expert", rank: "2", kanji: "罅", reading: "ひび" },

  { level: "expert", rank: "2", kanji: "麤", reading: "あらい" },
  { level: "expert", rank: "2", kanji: "纛", reading: "はたぼこ" },
  { level: "expert", rank: "2", kanji: "戛然", reading: "かつぜん" },
  { level: "expert", rank: "2", kanji: "悒鬱", reading: "ゆううつ" },
  { level: "expert", rank: "2", kanji: "椹", reading: "さわら" },

  { level: "expert", rank: "2", kanji: "寂寥", reading: "せきりょう" },
  { level: "expert", rank: "2", kanji: "閘門", reading: "こうもん" },
  { level: "expert", rank: "2", kanji: "欝憤", reading: "うっぷん" },
  { level: "expert", rank: "2", kanji: "狡猾", reading: "こうかつ" },
  { level: "expert", rank: "2", kanji: "殞命", reading: "いんめい" },

  { level: "expert", rank: "2", kanji: "矮躯", reading: "わいく" },
  { level: "expert", rank: "2", kanji: "嚢中", reading: "のうちゅう" },
  { level: "expert", rank: "2", kanji: "鬻ぐ", reading: "ひさぐ" },
  { level: "expert", rank: "2", kanji: "慴伏", reading: "しょうふく" },
  { level: "expert", rank: "2", kanji: "辮髪", reading: "べんぱつ" },

  { level: "expert", rank: "2", kanji: "靡く", reading: "なびく" },
  { level: "expert", rank: "2", kanji: "蓊鬱", reading: "おううつ" },
  { level: "expert", rank: "2", kanji: "溌剌", reading: "はつらつ" },
  { level: "expert", rank: "2", kanji: "邂逅", reading: "かいこう" },
  { level: "expert", rank: "2", kanji: "彳亍", reading: "てきちょく" },

  { level: "expert", rank: "2", kanji: "醴", reading: "あまざけ" },
  { level: "expert", rank: "2", kanji: "皺", reading: "しわ" },
  { level: "expert", rank: "2", kanji: "饑饉", reading: "ききん" },
  { level: "expert", rank: "2", kanji: "腆顔", reading: "てんがん" },
  { level: "expert", rank: "2", kanji: "悼詞", reading: "とうし" },

  /* =======================
        rank3（漢検1級：超難読）
       ======================= */
  { level: "expert", rank: "3", kanji: "躑躅", reading: "つつじ" },
  { level: "expert", rank: "3", kanji: "鷦鷯", reading: "みそさざい" },
  { level: "expert", rank: "3", kanji: "蝌蚪", reading: "おたまじゃくし" },
  { level: "expert", rank: "3", kanji: "蜉蝣", reading: "かげろう" },
  { level: "expert", rank: "3", kanji: "鸞鳳", reading: "らんぽう" },

  { level: "expert", rank: "3", kanji: "鱟", reading: "かぶとがに" },
  { level: "expert", rank: "3", kanji: "鰤", reading: "ぶり" },
  { level: "expert", rank: "3", kanji: "鷽", reading: "うそ" },
  { level: "expert", rank: "3", kanji: "螽斯", reading: "きりぎりす" },
  { level: "expert", rank: "3", kanji: "匏瓜", reading: "ほう" },

  { level: "expert", rank: "3", kanji: "罌粟", reading: "けし" },
  { level: "expert", rank: "3", kanji: "黔首", reading: "けんしゅ" },
  { level: "expert", rank: "3", kanji: "糴", reading: "かいよね" },
  { level: "expert", rank: "3", kanji: "貘", reading: "ばく" },
  { level: "expert", rank: "3", kanji: "鶸", reading: "ひわ" },

  { level: "expert", rank: "3", kanji: "鯢", reading: "さんしょううお" },
  { level: "expert", rank: "3", kanji: "膾", reading: "なます" },
  { level: "expert", rank: "3", kanji: "讌", reading: "うたげ" },
  { level: "expert", rank: "3", kanji: "黯然", reading: "あんぜん" },
  { level: "expert", rank: "3", kanji: "瓢鮎図", reading: "ひょうねんず" },

  { level: "expert", rank: "3", kanji: "鼯鼠", reading: "むささび" },
  { level: "expert", rank: "3", kanji: "鬣", reading: "たてがみ" },
  { level: "expert", rank: "3", kanji: "鱗雲", reading: "うろこぐも" },
  { level: "expert", rank: "3", kanji: "倏忽", reading: "しゅっこつ" },
  { level: "expert", rank: "3", kanji: "驢馬", reading: "ろば" },

  { level: "expert", rank: "3", kanji: "牝牡", reading: "めすおす" },
  { level: "expert", rank: "3", kanji: "蟠る", reading: "わだかまる" },
  { level: "expert", rank: "3", kanji: "鷭", reading: "ばん" },
  { level: "expert", rank: "3", kanji: "鷸", reading: "しぎ" },
  { level: "expert", rank: "3", kanji: "鱚", reading: "きす" },

  { level: "expert", rank: "3", kanji: "蚰蜒", reading: "げじげじ" },
  { level: "expert", rank: "3", kanji: "饕餮図", reading: "とうてつず" },
  { level: "expert", rank: "3", kanji: "黥刑", reading: "げいけい" },
  { level: "expert", rank: "3", kanji: "贔屓", reading: "ひいき" },
  { level: "expert", rank: "3", kanji: "鏖殺", reading: "おうさつ" },

  /* =======================
        BOSS（1級上位：激ムズ）
       ======================= */
  { level: "expert", rank: "BOSS", kanji: "麒麟", reading: "きりん" },
  { level: "expert", rank: "BOSS", kanji: "鬱蒼", reading: "うっそう" },
  { level: "expert", rank: "BOSS", kanji: "魍魎", reading: "もうりょう" },
  { level: "expert", rank: "BOSS", kanji: "饑餓", reading: "きが" },
  { level: "expert", rank: "BOSS", kanji: "靉霧", reading: "あいむ" },

  { level: "expert", rank: "BOSS", kanji: "驃騎", reading: "ひょうき" },
  { level: "expert", rank: "BOSS", kanji: "鸚鵡", reading: "おうむ" },
  { level: "expert", rank: "BOSS", kanji: "讖言", reading: "しんげん" },
  { level: "expert", rank: "BOSS", kanji: "懺悔", reading: "ざんげ" },
  { level: "expert", rank: "BOSS", kanji: "颶風", reading: "ぐふう" },

  { level: "expert", rank: "BOSS", kanji: "黠い", reading: "かしこい" },
  { level: "expert", rank: "BOSS", kanji: "嬋娟", reading: "せんけん" },
  { level: "expert", rank: "BOSS", kanji: "饕餮神", reading: "とうてつしん" },
  {
    level: "expert",
    rank: "BOSS",
    kanji: "驢鳴犬吠",
    reading: "ろめいけんばい",
  },
  { level: "expert", rank: "BOSS", kanji: "巫覡", reading: "ふげき" },

  { level: "expert", rank: "BOSS", kanji: "魃魈", reading: "ばつしょう" },
  { level: "expert", rank: "BOSS", kanji: "魑魅", reading: "ちみ" },
  { level: "expert", rank: "BOSS", kanji: "鯤鯨", reading: "こんげい" },
  { level: "expert", rank: "BOSS", kanji: "颯然", reading: "さつぜん" },
  { level: "expert", rank: "BOSS", kanji: "鐙", reading: "あぶみ" },

  { level: "expert", rank: "BOSS", kanji: "鰐", reading: "わに" },
  { level: "expert", rank: "BOSS", kanji: "麝香", reading: "じゃこう" },
  { level: "expert", rank: "BOSS", kanji: "酖毒", reading: "たんどく" },
  { level: "expert", rank: "BOSS", kanji: "懿徳", reading: "いとく" },
  { level: "expert", rank: "BOSS", kanji: "讐敵", reading: "しゅうてき" },

  { level: "expert", rank: "BOSS", kanji: "櫛比", reading: "しっぴ" },
  { level: "expert", rank: "BOSS", kanji: "巌嶺", reading: "がんれい" },
  { level: "expert", rank: "BOSS", kanji: "磊落", reading: "らいらく" },
  { level: "expert", rank: "BOSS", kanji: "鱗介", reading: "りんかい" },
  { level: "expert", rank: "BOSS", kanji: "鱷魚", reading: "がくぎょ" },

  { level: "expert", rank: "BOSS", kanji: "赧然", reading: "たんぜん" },
  { level: "expert", rank: "BOSS", kanji: "瞑目", reading: "めいもく" },
  { level: "expert", rank: "BOSS", kanji: "黠智", reading: "かつち" },
  { level: "expert", rank: "BOSS", kanji: "饗宴", reading: "きょうえん" },
  { level: "expert", rank: "BOSS", kanji: "巫術", reading: "ふじゅつ" },

  { level: "expert", rank: "BOSS", kanji: "驃勇", reading: "ひょうゆう" },
  { level: "expert", rank: "BOSS", kanji: "鷲掴み", reading: "わしづかみ" },
  { level: "expert", rank: "BOSS", kanji: "瀰漫", reading: "びまん" },
  { level: "expert", rank: "BOSS", kanji: "獰猛", reading: "どうもう" },
  {
    level: "expert",
    rank: "BOSS",
    kanji: "矜功自慢",
    reading: "きんこうじまん",
  },
];

export default expertQuestions;
