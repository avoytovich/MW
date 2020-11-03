const selectLanguages = [
  {
    locale: 'ar',
    name: 'Arabic',
    localName: 'العربية',
  },
  {
    locale: 'ar-AE',
    name: 'Arabic (United Arab Emirates)',
    localName: '(العربية (الإمارات',
  },
  {
    locale: 'ar-BH',
    name: 'Arabic (Bahrain)',
    localName: '(العربية (البحرين',
  },
  {
    locale: 'ar-DZ',
    name: 'Arabic (Algeria)',
    localName: '(العربية (الجزائر',
  },
  {
    locale: 'ar-EG',
    name: 'Arabic (Egypt)',
    localName: '(العربية (مصر',
  },
  {
    locale: 'ar-IQ',
    name: 'Arabic (Iraq)',
    localName: '(العربية (العراق',
  },
  {
    locale: 'ar-JO',
    name: 'Arabic (Jordan)',
    localName: '(العربية (الأردن',
  },
  {
    locale: 'ar-KW',
    name: 'Arabic (Kuwait)',
    localName: '(العربية (الكويت',
  },
  {
    locale: 'ar-LB',
    name: 'Arabic (Lebanon)',
    localName: '(العربية (لبنان',
  },
  {
    locale: 'ar-LY',
    name: 'Arabic (Libya)',
    localName: '(العربية (ليبيا',
  },
  {
    locale: 'ar-MA',
    name: 'Arabic (Morocco)',
    localName: '(العربية (المغرب',
  },
  {
    locale: 'ar-OM',
    name: 'Arabic (Oman)',
    localName: '(العربية (سلطنة عمان',
  },
  {
    locale: 'ar-QA',
    name: 'Arabic (Qatar)',
    localName: '(العربية (قطر',
  },
  {
    locale: 'ar-SA',
    name: 'Arabic (Saudi Arabia)',
    localName: '(العربية (السعودية',
  },
  {
    locale: 'ar-SD',
    name: 'Arabic (Sudan)',
    localName: '(العربية (السودان',
  },
  {
    locale: 'ar-SY',
    name: 'Arabic (Syria)',
    localName: '(العربية (سوريا',
  },
  {
    locale: 'ar-TN',
    name: 'Arabic (Tunisia)',
    localName: '(العربية (تونس',
  },
  {
    locale: 'ar-YE',
    name: 'Arabic (Yemen)',
    localName: '(العربية (اليمن',
  },
  {
    locale: 'be',
    name: 'Belarusian',
    localName: 'беларускі',
  },
  {
    locale: 'be-BY',
    name: 'Belarusian (Belarus)',
    localName: 'беларускі (Беларусь)',
  },
  {
    locale: 'bg',
    name: 'Bulgarian',
    localName: 'български',
  },
  {
    locale: 'bg-BG',
    name: 'Bulgarian (Bulgaria)',
    localName: 'български (България)',
  },
  {
    locale: 'ca',
    name: 'Catalan',
    localName: 'català',
  },
  {
    locale: 'ca-ES',
    name: 'Catalan (Spain)',
    localName: 'català (Espanya)',
  },
  {
    locale: 'cs',
    name: 'Czech',
    localName: 'čeština',
  },
  {
    locale: 'cs-CZ',
    name: 'Czech (Czech Republic)',
    localName: 'čeština (Česká republika)',
  },
  {
    locale: 'da',
    name: 'Danish',
    localName: 'Dansk',
  },
  {
    locale: 'da-DK',
    name: 'Danish (Denmark)',
    localName: 'Dansk (Danmark)',
  },
  {
    locale: 'de',
    name: 'German',
    localName: 'Deutsch',
  },
  {
    locale: 'de-AT',
    name: 'German (Austria)',
    localName: 'Deutsch (Österreich)',
  },
  {
    locale: 'de-CH',
    name: 'German (Switzerland)',
    localName: 'Deutsch (Schweiz)',
  },
  {
    locale: 'de-DE',
    name: 'German (Germany)',
    localName: 'Deutsch (Deutschland)',
  },
  {
    locale: 'de-LU',
    name: 'German (Luxembourg)',
    localName: 'Deutsch (Luxemburg)',
  },
  {
    locale: 'el',
    name: 'Greek',
    localName: 'Ελληνικά',
  },
  {
    locale: 'el-CY',
    name: 'Greek (Cyprus)',
    localName: 'Ελληνικά (Κύπρος)',
  },
  {
    locale: 'el-GR',
    name: 'Greek (Greece)',
    localName: 'Ελληνικά (Ελλάδα)',
  },
  {
    locale: 'en',
    name: 'English',
    localName: 'English',
  },
  {
    locale: 'en-AU',
    name: 'English (Australia)',
    localName: 'English (Australia)',
  },
  {
    locale: 'en-CA',
    name: 'English (Canada)',
    localName: 'English (Canada)',
  },
  {
    locale: 'en-GB',
    name: 'English (United Kingdom)',
    localName: 'English (United Kingdom)',
  },
  {
    locale: 'en-IE',
    name: 'English (Ireland)',
    localName: 'English (Ireland)',
  },
  {
    locale: 'en-IN',
    name: 'English (India)',
    localName: 'English (India)',
  },
  {
    locale: 'en-MT',
    name: 'English (Malta)',
    localName: 'English (Malta)',
  },
  {
    locale: 'en-NZ',
    name: 'English (New Zealand)',
    localName: 'English (New Zealand)',
  },
  {
    locale: 'en-PH',
    name: 'English (Philippines)',
    localName: 'English (Philippines)',
  },
  {
    locale: 'en-SG',
    name: 'English (Singapore)',
    localName: 'English (Singapore)',
  },
  {
    locale: 'en-US',
    name: 'English (United States)',
    localName: 'English (United States)',
  },
  {
    locale: 'en-ZA',
    name: 'English (South Africa)',
    localName: 'English (South Africa)',
  },
  {
    locale: 'es',
    name: 'Spanish',
    localName: 'español',
  },
  {
    locale: 'es-AR',
    name: 'Spanish (Argentina)',
    localName: 'español (Argentina)',
  },
  {
    locale: 'es-BO',
    name: 'Spanish (Bolivia)',
    localName: 'español (Bolivia)',
  },
  {
    locale: 'es-CL',
    name: 'Spanish (Chile)',
    localName: 'español (Chile)',
  },
  {
    locale: 'es-CO',
    name: 'Spanish (Colombia)',
    localName: 'español (Colombia)',
  },
  {
    locale: 'es-CR',
    name: 'Spanish (Costa Rica)',
    localName: 'español (Costa Rica)',
  },
  {
    locale: 'es-DO',
    name: 'Spanish (Dominican Republic)',
    localName: 'español (República Dominicana)',
  },
  {
    locale: 'es-EC',
    name: 'Spanish (Ecuador)',
    localName: 'español (Ecuador)',
  },
  {
    locale: 'es-ES',
    name: 'Spanish (Spain)',
    localName: 'español (España)',
  },
  {
    locale: 'es-GT',
    name: 'Spanish (Guatemala)',
    localName: 'español (Guatemala)',
  },
  {
    locale: 'es-HN',
    name: 'Spanish (Honduras)',
    localName: 'español (Honduras)',
  },
  {
    locale: 'es-MX',
    name: 'Spanish (Mexico)',
    localName: 'español (México)',
  },
  {
    locale: 'es-NI',
    name: 'Spanish (Nicaragua)',
    localName: 'español (Nicaragua)',
  },
  {
    locale: 'es-PA',
    name: 'Spanish (Panama)',
    localName: 'español (Panamá)',
  },
  {
    locale: 'es-PE',
    name: 'Spanish (Peru)',
    localName: 'español (Perú)',
  },
  {
    locale: 'es-PR',
    name: 'Spanish (Puerto Rico)',
    localName: 'español (Puerto Rico)',
  },
  {
    locale: 'es-PY',
    name: 'Spanish (Paraguay)',
    localName: 'español (Paraguay)',
  },
  {
    locale: 'es-SV',
    name: 'Spanish (El Salvador)',
    localName: 'español (El Salvador)',
  },
  {
    locale: 'es-US',
    name: 'Spanish (United States)',
    localName: 'español (Estados Unidos)',
  },
  {
    locale: 'es-UY',
    name: 'Spanish (Uruguay)',
    localName: 'español (Uruguay)',
  },
  {
    locale: 'es-VE',
    name: 'Spanish (Venezuela)',
    localName: 'español (Venezuela)',
  },
  {
    locale: 'et',
    name: 'Estonian',
    localName: 'Eesti',
  },
  {
    locale: 'et-EE',
    name: 'Estonian (Estonia)',
    localName: 'Eesti (Eesti)',
  },
  {
    locale: 'fi',
    name: 'Finnish',
    localName: 'suomi',
  },
  {
    locale: 'fi-FI',
    name: 'Finnish (Finland)',
    localName: 'suomi (Suomi)',
  },
  {
    locale: 'fr',
    name: 'French',
    localName: 'français',
  },
  {
    locale: 'fr-BE',
    name: 'French (Belgium)',
    localName: 'français (Belgique)',
  },
  {
    locale: 'fr-CA',
    name: 'French (Canada)',
    localName: 'français (Canada)',
  },
  {
    locale: 'fr-CH',
    name: 'French (Switzerland)',
    localName: 'français (Suisse)',
  },
  {
    locale: 'fr-FR',
    name: 'French (France)',
    localName: 'français (France)',
  },
  {
    locale: 'fr-LU',
    name: 'French (Luxembourg)',
    localName: 'français (Luxembourg)',
  },
  {
    locale: 'ga',
    name: 'Irish',
    localName: 'Gaeilge',
  },
  {
    locale: 'ga-IE',
    name: 'Irish (Ireland)',
    localName: 'Gaeilge (Éire)',
  },
  {
    locale: 'hi-IN',
    name: 'Hindi (India)',
    localName: 'हिंदी (भारत)',
  },
  {
    locale: 'hr',
    name: 'Croatian',
    localName: 'hrvatski',
  },
  {
    locale: 'hr-HR',
    name: 'Croatian (Croatia)',
    localName: 'hrvatski (Hrvatska)',
  },
  {
    locale: 'hu',
    name: 'Hungarian',
    localName: 'magyar',
  },
  {
    locale: 'hu-HU',
    name: 'Hungarian (Hungary)',
    localName: 'magyar (Magyarország)',
  },
  {
    locale: 'in',
    name: 'Indonesian',
    localName: 'Bahasa Indonesia',
  },
  {
    locale: 'in-ID',
    name: 'Indonesian (Indonesia)',
    localName: 'Bahasa Indonesia (Indonesia)',
  },
  {
    locale: 'is',
    name: 'Icelandic',
    localName: 'íslenska',
  },
  {
    locale: 'is-IS',
    name: 'Icelandic (Iceland)',
    localName: 'íslenska (Ísland)',
  },
  {
    locale: 'it',
    name: 'Italian',
    localName: 'italiano',
  },
  {
    locale: 'it-CH',
    name: 'Italian (Switzerland)',
    localName: 'italiano (Svizzera)',
  },
  {
    locale: 'it-IT',
    name: 'Italian (Italy)',
    localName: 'italiano (Italia)',
  },
  {
    locale: 'iw',
    name: 'Hebrew',
    localName: 'עברית',
  },
  {
    locale: 'iw-IL',
    name: 'Hebrew (Israel)',
    localName: 'עברית (ישראל)',
  },
  {
    locale: 'ja',
    name: 'Japanese',
    localName: '日本語',
  },
  {
    locale: 'ja-JP',
    name: 'Japanese (Japan)',
    localName: '日本語 (日本)',
  },
  {
    locale: 'ja-JP-JP-#u-ca-japanese',
    name: 'Japanese (Japan,JP)',
    localName: '日本語 (日本,JP)',
  },
  {
    locale: 'ko',
    name: 'Korean',
    localName: '한국어',
  },
  {
    locale: 'ko-KR',
    name: 'Korean (South Korea)',
    localName: '한국어 (대한민국)',
  },
  {
    locale: 'lt',
    name: 'Lithuanian',
    localName: 'Lietuvių',
  },
  {
    locale: 'lt-LT',
    name: 'Lithuanian (Lithuania)',
    localName: 'Lietuvių (Lietuva)',
  },
  {
    locale: 'lv',
    name: 'Latvian',
    localName: 'Latviešu',
  },
  {
    locale: 'lv-LV',
    name: 'Latvian (Latvia)',
    localName: 'Latviešu (Latvija)',
  },
  {
    locale: 'mk',
    name: 'Macedonian',
    localName: 'македонски',
  },
  {
    locale: 'mk-MK',
    name: 'Macedonian (Macedonia)',
    localName: 'македонски (Македонија)',
  },
  {
    locale: 'ms',
    name: 'Malay',
    localName: 'Bahasa Melayu',
  },
  {
    locale: 'ms-MY',
    name: 'Malay (Malaysia)',
    localName: 'Bahasa Melayu (Malaysia)',
  },
  {
    locale: 'mt',
    name: 'Maltese',
    localName: 'Malti',
  },
  {
    locale: 'mt-MT',
    name: 'Maltese (Malta)',
    localName: 'Malti (Malta)',
  },
  {
    locale: 'nb-NO',
    name: 'Norwegian Bokmål',
    localName: 'Norway (Bokmål)',
  },
  {
    locale: 'nl',
    name: 'Dutch',
    localName: 'Nederlands',
  },
  {
    locale: 'nl-BE',
    name: 'Dutch (Belgium)',
    localName: 'Nederlands (België)',
  },
  {
    locale: 'nl-NL',
    name: 'Dutch (Netherlands)',
    localName: 'Nederlands (Nederland)',
  },
  {
    locale: 'no',
    name: 'Norwegian',
    localName: 'norsk',
  },
  {
    locale: 'no-NO',
    name: 'Norwegian (Norway)',
    localName: 'norsk (Norge)',
  },
  {
    locale: 'no-NO-NY',
    name: 'Norwegian (Norway,Nynorsk)',
    localName: 'norsk (Norge,nynorsk)',
  },
  {
    locale: 'pl',
    name: 'Polish',
    localName: 'polski',
  },
  {
    locale: 'pl-PL',
    name: 'Polish (Poland)',
    localName: 'polski (Polska)',
  },
  {
    locale: 'pt',
    name: 'Portuguese',
    localName: 'português',
  },
  {
    locale: 'pt-BR',
    name: 'Portuguese (Brazil)',
    localName: 'português (Brasil)',
  },
  {
    locale: 'pt-PT',
    name: 'Portuguese (Portugal)',
    localName: 'português (Portugal)',
  },
  {
    locale: 'ro',
    name: 'Romanian',
    localName: 'română',
  },
  {
    locale: 'ro-RO',
    name: 'Romanian (Romania)',
    localName: 'română (România)',
  },
  {
    locale: 'ru',
    name: 'Russian',
    localName: 'русский',
  },
  {
    locale: 'ru-RU',
    name: 'Russian (Russia)',
    localName: 'русский (Россия)',
  },
  {
    locale: 'sk',
    name: 'Slovak',
    localName: 'Slovenčina',
  },
  {
    locale: 'sk-SK',
    name: 'Slovak (Slovakia)',
    localName: 'Slovenčina (Slovenská republika)',
  },
  {
    locale: 'sl',
    name: 'Slovenian',
    localName: 'Slovenščina',
  },
  {
    locale: 'sl-SI',
    name: 'Slovenian (Slovenia)',
    localName: 'Slovenščina (Slovenija)',
  },
  {
    locale: 'sq',
    name: 'Albanian',
    localName: 'shqipe',
  },
  {
    locale: 'sq-AL',
    name: 'Albanian (Albania)',
    localName: 'shqipe (Shqipëria)',
  },
  {
    locale: 'sr',
    name: 'Serbian',
    localName: 'Српски',
  },
  {
    locale: 'sr-#Latn',
    name: 'Serbian (Latin)',
    localName: 'Srpski (Latin)',
  },
  {
    locale: 'sr-BA',
    name: 'Serbian (Bosnia and Herzegovina)',
    localName: 'Српски (Босна и Херцеговина)',
  },
  {
    locale: 'sr-BA-#Latn',
    name: 'Serbian (Latin,Bosnia and Herzegovina)',
    localName: 'Srpski (Latin,Bosna i Hercegovina)',
  },
  {
    locale: 'sr-CS',
    name: 'Serbian (Serbia and Montenegro)',
    localName: 'Српски (Србија и Црна Гора)',
  },
  {
    locale: 'sr-ME',
    name: 'Serbian (Montenegro)',
    localName: 'Српски (Montenegro)',
  },
  {
    locale: 'sr-ME-#Latn',
    name: 'Serbian (Latin,Montenegro)',
    localName: 'Srpski (Latin,Crna Gora)',
  },
  {
    locale: 'sr-RS',
    name: 'Serbian (Serbia)',
    localName: 'Српски (Serbia)',
  },
  {
    locale: 'sr-RS-#Latn',
    name: 'Serbian (Latin,Serbia)',
    localName: 'Srpski (Latin,Srbija)',
  },
  {
    locale: 'sv',
    name: 'Swedish',
    localName: 'svenska',
  },
  {
    locale: 'sv-SE',
    name: 'Swedish (Sweden)',
    localName: 'svenska (Sverige)',
  },
  {
    locale: 'th',
    name: 'Thai',
    localName: 'ไทย',
  },
  {
    locale: 'th-TH',
    name: 'Thai (Thailand)',
    localName: 'ไทย (ประเทศไทย)',
  },
  {
    locale: 'th-TH-TH-#u-nu-thai',
    name: 'Thai (Thailand,TH)',
    localName: 'ไทย (ประเทศไทย,TH)',
  },
  {
    locale: 'tr',
    name: 'Turkish',
    localName: 'Türkçe',
  },
  {
    locale: 'tr-TR',
    name: 'Turkish (Turkey)',
    localName: 'Türkçe (Türkiye)',
  },
  {
    locale: 'uk',
    name: 'Ukrainian',
    localName: 'українська',
  },
  {
    locale: 'uk-UA',
    name: 'Ukrainian (Ukraine)',
    localName: 'українська (Україна)',
  },
  {
    locale: 'vi',
    name: 'Vietnamese',
    localName: 'Tiếng Việt',
  },
  {
    locale: 'vi-VN',
    name: 'Vietnamese (Vietnam)',
    localName: 'Tiếng Việt (Việt Nam)',
  },
  {
    locale: 'zh',
    name: 'Chinese',
    localName: '中文',
  },
  {
    locale: 'zh-CN',
    name: 'Chinese (China)',
    localName: '中文 (中国)',
  },
  {
    locale: 'zh-HK',
    name: 'Chinese (Hong Kong)',
    localName: '中文 (香港)',
  },
  {
    locale: 'zh-SG',
    name: 'Chinese (Singapore)',
    localName: '中文 (新加坡)',
  },
  {
    locale: 'zh-TW',
    name: 'Chinese (Taiwan)',
    localName: '中文 (台灣)',
  },
];

export default selectLanguages;
