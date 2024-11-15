(function() {
  var bcv_parser;

  bcv_parser = require("../../js/sr_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.options.osis_compaction_strategy = "b";
      return p.options.sequence_combination_strategy = "combine";
    });
    it("should round-trip OSIS references", function() {
      var bc, bcv, bcv_range, book, books, i, len, results;
      p.set_options({
        osis_compaction_strategy: "bc"
      });
      books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
      results = [];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
      }
      return results;
    });
    it("should round-trip OSIS Apocrypha references", function() {
      var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
      p.set_options({
        osis_compaction_strategy: "bc",
        ps151_strategy: "b"
      });
      p.include_apocrypha(true);
      books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
      }
      p.set_options({
        ps151_strategy: "bc"
      });
      expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
      expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
      expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
      p.include_apocrypha(false);
      results = [];
      for (j = 0, len1 = books.length; j < len1; j++) {
        book = books[j];
        bc = book + ".1";
        results.push(expect(p.parse(bc).osis()).toEqual(""));
      }
      return results;
    });
    return it("should handle a preceding character", function() {
      expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
      expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
      expect(p.parse("1Ps 1").osis()).toEqual("");
      return expect(p.parse("11Sam 1").osis()).toEqual("");
    });
  });

  describe("Localized book Gen (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (sr)", function() {
      
		expect(p.parse("Прва Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Прва Мојсијева 1:1'")
		expect(p.parse("1.. Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. Мојсијева 1:1'")
		expect(p.parse("1. Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Мојсијева 1:1'")
		expect(p.parse("I. Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Мојсијева 1:1'")
		expect(p.parse("1 Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Мојсијева 1:1'")
		expect(p.parse("I Мојсијева 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Мојсијева 1:1'")
		expect(p.parse("Прва Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Прва Мојс 1:1'")
		expect(p.parse("1.. Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. Мојс 1:1'")
		expect(p.parse("1. Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. Мојс 1:1'")
		expect(p.parse("I. Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. Мојс 1:1'")
		expect(p.parse("Постање 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Постање 1:1'")
		expect(p.parse("1 Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 Мојс 1:1'")
		expect(p.parse("I Мојс 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I Мојс 1:1'")
		expect(p.parse("Пост 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Пост 1:1'")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1", "parsing: 'Gen 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПРВА МОЈСИЈЕВА 1:1'")
		expect(p.parse("1.. МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. МОЈСИЈЕВА 1:1'")
		expect(p.parse("1. МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. МОЈСИЈЕВА 1:1'")
		expect(p.parse("I. МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. МОЈСИЈЕВА 1:1'")
		expect(p.parse("1 МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 МОЈСИЈЕВА 1:1'")
		expect(p.parse("I МОЈСИЈЕВА 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I МОЈСИЈЕВА 1:1'")
		expect(p.parse("ПРВА МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПРВА МОЈС 1:1'")
		expect(p.parse("1.. МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: '1.. МОЈС 1:1'")
		expect(p.parse("1. МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: '1. МОЈС 1:1'")
		expect(p.parse("I. МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I. МОЈС 1:1'")
		expect(p.parse("ПОСТАЊЕ 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПОСТАЊЕ 1:1'")
		expect(p.parse("1 МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: '1 МОЈС 1:1'")
		expect(p.parse("I МОЈС 1:1").osis()).toEqual("Gen.1.1", "parsing: 'I МОЈС 1:1'")
		expect(p.parse("ПОСТ 1:1").osis()).toEqual("Gen.1.1", "parsing: 'ПОСТ 1:1'")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1", "parsing: 'GEN 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Exod (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (sr)", function() {
      
		expect(p.parse("Друга Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Друга Мојсијева 1:1'")
		expect(p.parse("2.. Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. Мојсијева 1:1'")
		expect(p.parse("II. Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Мојсијева 1:1'")
		expect(p.parse("2. Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Мојсијева 1:1'")
		expect(p.parse("II Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Мојсијева 1:1'")
		expect(p.parse("2 Мојсијева 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Мојсијева 1:1'")
		expect(p.parse("Друга Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Друга Мојс 1:1'")
		expect(p.parse("2.. Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. Мојс 1:1'")
		expect(p.parse("II. Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. Мојс 1:1'")
		expect(p.parse("2. Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. Мојс 1:1'")
		expect(p.parse("II Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II Мојс 1:1'")
		expect(p.parse("Егзодус 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Егзодус 1:1'")
		expect(p.parse("Излазак 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Излазак 1:1'")
		expect(p.parse("2 Мојс 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 Мојс 1:1'")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Exod 1:1'")
		expect(p.parse("Изл 1:1").osis()).toEqual("Exod.1.1", "parsing: 'Изл 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ДРУГА МОЈСИЈЕВА 1:1'")
		expect(p.parse("2.. МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. МОЈСИЈЕВА 1:1'")
		expect(p.parse("II. МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. МОЈСИЈЕВА 1:1'")
		expect(p.parse("2. МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. МОЈСИЈЕВА 1:1'")
		expect(p.parse("II МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II МОЈСИЈЕВА 1:1'")
		expect(p.parse("2 МОЈСИЈЕВА 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 МОЈСИЈЕВА 1:1'")
		expect(p.parse("ДРУГА МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ДРУГА МОЈС 1:1'")
		expect(p.parse("2.. МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: '2.. МОЈС 1:1'")
		expect(p.parse("II. МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II. МОЈС 1:1'")
		expect(p.parse("2. МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: '2. МОЈС 1:1'")
		expect(p.parse("II МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: 'II МОЈС 1:1'")
		expect(p.parse("ЕГЗОДУС 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ЕГЗОДУС 1:1'")
		expect(p.parse("ИЗЛАЗАК 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ИЗЛАЗАК 1:1'")
		expect(p.parse("2 МОЈС 1:1").osis()).toEqual("Exod.1.1", "parsing: '2 МОЈС 1:1'")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1", "parsing: 'EXOD 1:1'")
		expect(p.parse("ИЗЛ 1:1").osis()).toEqual("Exod.1.1", "parsing: 'ИЗЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bel (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (sr)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1", "parsing: 'Bel 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lev (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (sr)", function() {
      
		expect(p.parse("Трећом Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Трећом Мојсијева 1:1'")
		expect(p.parse("Трећа Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Трећа Мојсијева 1:1'")
		expect(p.parse("III. Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Мојсијева 1:1'")
		expect(p.parse("3.. Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: '3.. Мојсијева 1:1'")
		expect(p.parse("III Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Мојсијева 1:1'")
		expect(p.parse("3. Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Мојсијева 1:1'")
		expect(p.parse("3 Мојсијева 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Мојсијева 1:1'")
		expect(p.parse("Трећом Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Трећом Мојс 1:1'")
		expect(p.parse("Трећа Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Трећа Мојс 1:1'")
		expect(p.parse("III. Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. Мојс 1:1'")
		expect(p.parse("3.. Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: '3.. Мојс 1:1'")
		expect(p.parse("III Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III Мојс 1:1'")
		expect(p.parse("Левитска 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Левитска 1:1'")
		expect(p.parse("3. Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. Мојс 1:1'")
		expect(p.parse("3 Мојс 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 Мојс 1:1'")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Lev 1:1'")
		expect(p.parse("Лев 1:1").osis()).toEqual("Lev.1.1", "parsing: 'Лев 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ТРЕЋОМ МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ТРЕЋОМ МОЈСИЈЕВА 1:1'")
		expect(p.parse("ТРЕЋА МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ТРЕЋА МОЈСИЈЕВА 1:1'")
		expect(p.parse("III. МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. МОЈСИЈЕВА 1:1'")
		expect(p.parse("3.. МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: '3.. МОЈСИЈЕВА 1:1'")
		expect(p.parse("III МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III МОЈСИЈЕВА 1:1'")
		expect(p.parse("3. МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. МОЈСИЈЕВА 1:1'")
		expect(p.parse("3 МОЈСИЈЕВА 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 МОЈСИЈЕВА 1:1'")
		expect(p.parse("ТРЕЋОМ МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ТРЕЋОМ МОЈС 1:1'")
		expect(p.parse("ТРЕЋА МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ТРЕЋА МОЈС 1:1'")
		expect(p.parse("III. МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III. МОЈС 1:1'")
		expect(p.parse("3.. МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: '3.. МОЈС 1:1'")
		expect(p.parse("III МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: 'III МОЈС 1:1'")
		expect(p.parse("ЛЕВИТСКА 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ЛЕВИТСКА 1:1'")
		expect(p.parse("3. МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: '3. МОЈС 1:1'")
		expect(p.parse("3 МОЈС 1:1").osis()).toEqual("Lev.1.1", "parsing: '3 МОЈС 1:1'")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1", "parsing: 'LEV 1:1'")
		expect(p.parse("ЛЕВ 1:1").osis()).toEqual("Lev.1.1", "parsing: 'ЛЕВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Num (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (sr)", function() {
      
		expect(p.parse("Четврта Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: 'Четврта Мојсијева 1:1'")
		expect(p.parse("4.. Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: '4.. Мојсијева 1:1'")
		expect(p.parse("IV. Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Мојсијева 1:1'")
		expect(p.parse("4. Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Мојсијева 1:1'")
		expect(p.parse("IV Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Мојсијева 1:1'")
		expect(p.parse("Четврта Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: 'Четврта Мојс 1:1'")
		expect(p.parse("4 Мојсијева 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Мојсијева 1:1'")
		expect(p.parse("4.. Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: '4.. Мојс 1:1'")
		expect(p.parse("IV. Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. Мојс 1:1'")
		expect(p.parse("4. Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: '4. Мојс 1:1'")
		expect(p.parse("IV Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV Мојс 1:1'")
		expect(p.parse("Бројеви 1:1").osis()).toEqual("Num.1.1", "parsing: 'Бројеви 1:1'")
		expect(p.parse("4 Мојс 1:1").osis()).toEqual("Num.1.1", "parsing: '4 Мојс 1:1'")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1", "parsing: 'Num 1:1'")
		expect(p.parse("Бр 1:1").osis()).toEqual("Num.1.1", "parsing: 'Бр 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЧЕТВРТА МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: 'ЧЕТВРТА МОЈСИЈЕВА 1:1'")
		expect(p.parse("4.. МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: '4.. МОЈСИЈЕВА 1:1'")
		expect(p.parse("IV. МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. МОЈСИЈЕВА 1:1'")
		expect(p.parse("4. МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: '4. МОЈСИЈЕВА 1:1'")
		expect(p.parse("IV МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV МОЈСИЈЕВА 1:1'")
		expect(p.parse("ЧЕТВРТА МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: 'ЧЕТВРТА МОЈС 1:1'")
		expect(p.parse("4 МОЈСИЈЕВА 1:1").osis()).toEqual("Num.1.1", "parsing: '4 МОЈСИЈЕВА 1:1'")
		expect(p.parse("4.. МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: '4.. МОЈС 1:1'")
		expect(p.parse("IV. МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV. МОЈС 1:1'")
		expect(p.parse("4. МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: '4. МОЈС 1:1'")
		expect(p.parse("IV МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: 'IV МОЈС 1:1'")
		expect(p.parse("БРОЈЕВИ 1:1").osis()).toEqual("Num.1.1", "parsing: 'БРОЈЕВИ 1:1'")
		expect(p.parse("4 МОЈС 1:1").osis()).toEqual("Num.1.1", "parsing: '4 МОЈС 1:1'")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1", "parsing: 'NUM 1:1'")
		expect(p.parse("БР 1:1").osis()).toEqual("Num.1.1", "parsing: 'БР 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sir (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (sr)", function() {
      
		expect(p.parse("Премудрости Исуса сина Сирахова 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Премудрости Исуса сина Сирахова 1:1'")
		expect(p.parse("Еклезијастикус 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Еклезијастикус 1:1'")
		expect(p.parse("Сирина 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Сирина 1:1'")
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Sir 1:1'")
		expect(p.parse("ИсС 1:1").osis()).toEqual("Sir.1.1", "parsing: 'ИсС 1:1'")
		expect(p.parse("Сир 1:1").osis()).toEqual("Sir.1.1", "parsing: 'Сир 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Wis (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (sr)", function() {
      
		expect(p.parse("Премудорсти Соломонове 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Премудорсти Соломонове 1:1'")
		expect(p.parse("Мудрости Соломонове 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Мудрости Соломонове 1:1'")
		expect(p.parse("Мудрости 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Мудрости 1:1'")
		expect(p.parse("Прем Сол 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Прем Сол 1:1'")
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1", "parsing: 'Wis 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Lam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (sr)", function() {
      
		expect(p.parse("Плач Јеремијин 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Плач Јеремијин 1:1'")
		expect(p.parse("Плач 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Плач 1:1'")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1", "parsing: 'Lam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПЛАЧ ЈЕРЕМИЈИН 1:1").osis()).toEqual("Lam.1.1", "parsing: 'ПЛАЧ ЈЕРЕМИЈИН 1:1'")
		expect(p.parse("ПЛАЧ 1:1").osis()).toEqual("Lam.1.1", "parsing: 'ПЛАЧ 1:1'")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1", "parsing: 'LAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book EpJer (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (sr)", function() {
      
		expect(p.parse("Посланица Јеремијина 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'Посланица Јеремијина 1:1'")
		expect(p.parse("Писма Јеремије 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'Писма Јеремије 1:1'")
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1", "parsing: 'EpJer 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rev (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (sr)", function() {
      
		expect(p.parse("Откривење Јованово 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Откривење Јованово 1:1'")
		expect(p.parse("Откровење Јованово 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Откровење Јованово 1:1'")
		expect(p.parse("Откривење 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Откривење 1:1'")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Rev 1:1'")
		expect(p.parse("Отк 1:1").osis()).toEqual("Rev.1.1", "parsing: 'Отк 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ОТКРИВЕЊЕ ЈОВАНОВО 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ОТКРИВЕЊЕ ЈОВАНОВО 1:1'")
		expect(p.parse("ОТКРОВЕЊЕ ЈОВАНОВО 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ОТКРОВЕЊЕ ЈОВАНОВО 1:1'")
		expect(p.parse("ОТКРИВЕЊЕ 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ОТКРИВЕЊЕ 1:1'")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1", "parsing: 'REV 1:1'")
		expect(p.parse("ОТК 1:1").osis()).toEqual("Rev.1.1", "parsing: 'ОТК 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrMan (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (sr)", function() {
      
		expect(p.parse("Молитва Манасијина 1:1").osis()).toEqual("PrMan.1.1", "parsing: 'Молитва Манасијина 1:1'")
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1", "parsing: 'PrMan 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Deut (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (sr)", function() {
      
		expect(p.parse("Поновљени закони 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Поновљени закони 1:1'")
		expect(p.parse("Пета Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Пета Мојсијева 1:1'")
		expect(p.parse("5.. Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: '5.. Мојсијева 1:1'")
		expect(p.parse("5. Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Мојсијева 1:1'")
		expect(p.parse("V. Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Мојсијева 1:1'")
		expect(p.parse("5 Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Мојсијева 1:1'")
		expect(p.parse("V Мојсијева 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Мојсијева 1:1'")
		expect(p.parse("Пета Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Пета Мојс 1:1'")
		expect(p.parse("5.. Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: '5.. Мојс 1:1'")
		expect(p.parse("5. Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. Мојс 1:1'")
		expect(p.parse("V. Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. Мојс 1:1'")
		expect(p.parse("5 Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 Мојс 1:1'")
		expect(p.parse("V Мојс 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V Мојс 1:1'")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Deut 1:1'")
		expect(p.parse("Понз 1:1").osis()).toEqual("Deut.1.1", "parsing: 'Понз 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОНОВЉЕНИ ЗАКОНИ 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПОНОВЉЕНИ ЗАКОНИ 1:1'")
		expect(p.parse("ПЕТА МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПЕТА МОЈСИЈЕВА 1:1'")
		expect(p.parse("5.. МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: '5.. МОЈСИЈЕВА 1:1'")
		expect(p.parse("5. МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. МОЈСИЈЕВА 1:1'")
		expect(p.parse("V. МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. МОЈСИЈЕВА 1:1'")
		expect(p.parse("5 МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 МОЈСИЈЕВА 1:1'")
		expect(p.parse("V МОЈСИЈЕВА 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V МОЈСИЈЕВА 1:1'")
		expect(p.parse("ПЕТА МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПЕТА МОЈС 1:1'")
		expect(p.parse("5.. МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: '5.. МОЈС 1:1'")
		expect(p.parse("5. МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: '5. МОЈС 1:1'")
		expect(p.parse("V. МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V. МОЈС 1:1'")
		expect(p.parse("5 МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: '5 МОЈС 1:1'")
		expect(p.parse("V МОЈС 1:1").osis()).toEqual("Deut.1.1", "parsing: 'V МОЈС 1:1'")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1", "parsing: 'DEUT 1:1'")
		expect(p.parse("ПОНЗ 1:1").osis()).toEqual("Deut.1.1", "parsing: 'ПОНЗ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Josh (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (sr)", function() {
      
		expect(p.parse("Исус Навин 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Исус Навин 1:1'")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1", "parsing: 'Josh 1:1'")
		expect(p.parse("ИНав 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ИНав 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ИСУС НАВИН 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ИСУС НАВИН 1:1'")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1", "parsing: 'JOSH 1:1'")
		expect(p.parse("ИНАВ 1:1").osis()).toEqual("Josh.1.1", "parsing: 'ИНАВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Judg (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (sr)", function() {
      
		expect(p.parse("Судија 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Судија 1:1'")
		expect(p.parse("Судије 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Судије 1:1'")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Judg 1:1'")
		expect(p.parse("Суд 1:1").osis()).toEqual("Judg.1.1", "parsing: 'Суд 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("СУДИЈА 1:1").osis()).toEqual("Judg.1.1", "parsing: 'СУДИЈА 1:1'")
		expect(p.parse("СУДИЈЕ 1:1").osis()).toEqual("Judg.1.1", "parsing: 'СУДИЈЕ 1:1'")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1", "parsing: 'JUDG 1:1'")
		expect(p.parse("СУД 1:1").osis()).toEqual("Judg.1.1", "parsing: 'СУД 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ruth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (sr)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Ruth 1:1'")
		expect(p.parse("Рута 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Рута 1:1'")
		expect(p.parse("Рут 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'Рут 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'RUTH 1:1'")
		expect(p.parse("РУТА 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'РУТА 1:1'")
		expect(p.parse("РУТ 1:1").osis()).toEqual("Ruth.1.1", "parsing: 'РУТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (sr)", function() {
      
		expect(p.parse("Прва Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Прва Јездрина 1:1'")
		expect(p.parse("1.. Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1.. Јездрина 1:1'")
		expect(p.parse("Прва Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'Прва Ездрина 1:1'")
		expect(p.parse("1. Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Јездрина 1:1'")
		expect(p.parse("1.. Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1.. Ездрина 1:1'")
		expect(p.parse("I. Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Јездрина 1:1'")
		expect(p.parse("1 Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Јездрина 1:1'")
		expect(p.parse("1. Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1. Ездрина 1:1'")
		expect(p.parse("I Јездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Јездрина 1:1'")
		expect(p.parse("I. Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I. Ездрина 1:1'")
		expect(p.parse("1 Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Ездрина 1:1'")
		expect(p.parse("I Ездрина 1:1").osis()).toEqual("1Esd.1.1", "parsing: 'I Ездрина 1:1'")
		expect(p.parse("1 Јез 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1 Јез 1:1'")
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1", "parsing: '1Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (sr)", function() {
      
		expect(p.parse("Друга Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Друга Јездрина 1:1'")
		expect(p.parse("Друга Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'Друга Ездрина 1:1'")
		expect(p.parse("2.. Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2.. Јездрина 1:1'")
		expect(p.parse("II. Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Јездрина 1:1'")
		expect(p.parse("2. Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Јездрина 1:1'")
		expect(p.parse("2.. Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2.. Ездрина 1:1'")
		expect(p.parse("II Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Јездрина 1:1'")
		expect(p.parse("II. Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II. Ездрина 1:1'")
		expect(p.parse("2 Јездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Јездрина 1:1'")
		expect(p.parse("2. Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2. Ездрина 1:1'")
		expect(p.parse("II Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: 'II Ездрина 1:1'")
		expect(p.parse("2 Ездрина 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Ездрина 1:1'")
		expect(p.parse("2 Јез 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2 Јез 1:1'")
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1", "parsing: '2Esd 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Isa (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (sr)", function() {
      
		expect(p.parse("Исаија 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Исаија 1:1'")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Isa 1:1'")
		expect(p.parse("Ис 1:1").osis()).toEqual("Isa.1.1", "parsing: 'Ис 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ИСАИЈА 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ИСАИЈА 1:1'")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ISA 1:1'")
		expect(p.parse("ИС 1:1").osis()).toEqual("Isa.1.1", "parsing: 'ИС 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Sam (sr)", function() {
      
		expect(p.parse("Друга Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Друга Самуилова 1:1'")
		expect(p.parse("Друга краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'Друга краљевима 1:1'")
		expect(p.parse("2.. Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. Самуилова 1:1'")
		expect(p.parse("2.. краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. краљевима 1:1'")
		expect(p.parse("II. Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. Самуилова 1:1'")
		expect(p.parse("II. краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. краљевима 1:1'")
		expect(p.parse("2. Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. Самуилова 1:1'")
		expect(p.parse("2. краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. краљевима 1:1'")
		expect(p.parse("II Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II Самуилова 1:1'")
		expect(p.parse("II краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II краљевима 1:1'")
		expect(p.parse("2 Самуилова 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Самуилова 1:1'")
		expect(p.parse("2 краљевима 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 краљевима 1:1'")
		expect(p.parse("2 Сам 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 Сам 1:1'")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2Sam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ДРУГА САМУИЛОВА 1:1'")
		expect(p.parse("ДРУГА КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'ДРУГА КРАЉЕВИМА 1:1'")
		expect(p.parse("2.. САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. САМУИЛОВА 1:1'")
		expect(p.parse("2.. КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2.. КРАЉЕВИМА 1:1'")
		expect(p.parse("II. САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. САМУИЛОВА 1:1'")
		expect(p.parse("II. КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II. КРАЉЕВИМА 1:1'")
		expect(p.parse("2. САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. САМУИЛОВА 1:1'")
		expect(p.parse("2. КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2. КРАЉЕВИМА 1:1'")
		expect(p.parse("II САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II САМУИЛОВА 1:1'")
		expect(p.parse("II КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: 'II КРАЉЕВИМА 1:1'")
		expect(p.parse("2 САМУИЛОВА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 САМУИЛОВА 1:1'")
		expect(p.parse("2 КРАЉЕВИМА 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 КРАЉЕВИМА 1:1'")
		expect(p.parse("2 САМ 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2 САМ 1:1'")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1", "parsing: '2SAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Sam (sr)", function() {
      
		expect(p.parse("Прва Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прва Самуилова 1:1'")
		expect(p.parse("Прва краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'Прва краљевима 1:1'")
		expect(p.parse("1.. Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. Самуилова 1:1'")
		expect(p.parse("1.. краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. краљевима 1:1'")
		expect(p.parse("1. Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. Самуилова 1:1'")
		expect(p.parse("1. краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. краљевима 1:1'")
		expect(p.parse("I. Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. Самуилова 1:1'")
		expect(p.parse("I. краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. краљевима 1:1'")
		expect(p.parse("1 Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Самуилова 1:1'")
		expect(p.parse("1 краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 краљевима 1:1'")
		expect(p.parse("I Самуилова 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I Самуилова 1:1'")
		expect(p.parse("I краљевима 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I краљевима 1:1'")
		expect(p.parse("1 Сам 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 Сам 1:1'")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1Sam 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВА САМУИЛОВА 1:1'")
		expect(p.parse("ПРВА КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'ПРВА КРАЉЕВИМА 1:1'")
		expect(p.parse("1.. САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. САМУИЛОВА 1:1'")
		expect(p.parse("1.. КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1.. КРАЉЕВИМА 1:1'")
		expect(p.parse("1. САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. САМУИЛОВА 1:1'")
		expect(p.parse("1. КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1. КРАЉЕВИМА 1:1'")
		expect(p.parse("I. САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. САМУИЛОВА 1:1'")
		expect(p.parse("I. КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I. КРАЉЕВИМА 1:1'")
		expect(p.parse("1 САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 САМУИЛОВА 1:1'")
		expect(p.parse("1 КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 КРАЉЕВИМА 1:1'")
		expect(p.parse("I САМУИЛОВА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I САМУИЛОВА 1:1'")
		expect(p.parse("I КРАЉЕВИМА 1:1").osis()).toEqual("1Sam.1.1", "parsing: 'I КРАЉЕВИМА 1:1'")
		expect(p.parse("1 САМ 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1 САМ 1:1'")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1", "parsing: '1SAM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Kgs (sr)", function() {
      
		expect(p.parse("Четврта краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Четврта краљевства 1:1'")
		expect(p.parse("Четврта краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Четврта краљевима 1:1'")
		expect(p.parse("Друга о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Друга о царевима 1:1'")
		expect(p.parse("2.. о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. о царевима 1:1'")
		expect(p.parse("4.. краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4.. краљевства 1:1'")
		expect(p.parse("II. о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. о царевима 1:1'")
		expect(p.parse("IV. краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV. краљевства 1:1'")
		expect(p.parse("2. о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. о царевима 1:1'")
		expect(p.parse("4. краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4. краљевства 1:1'")
		expect(p.parse("4.. краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4.. краљевима 1:1'")
		expect(p.parse("II о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II о царевима 1:1'")
		expect(p.parse("IV краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV краљевства 1:1'")
		expect(p.parse("IV. краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV. краљевима 1:1'")
		expect(p.parse("Друга краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Друга краљева 1:1'")
		expect(p.parse("2 о царевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 о царевима 1:1'")
		expect(p.parse("4 краљевства 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4 краљевства 1:1'")
		expect(p.parse("4. краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4. краљевима 1:1'")
		expect(p.parse("IV краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV краљевима 1:1'")
		expect(p.parse("Друга Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'Друга Царева 1:1'")
		expect(p.parse("2.. краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. краљева 1:1'")
		expect(p.parse("4 краљевима 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4 краљевима 1:1'")
		expect(p.parse("II. краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. краљева 1:1'")
		expect(p.parse("2. краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. краљева 1:1'")
		expect(p.parse("2.. Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. Царева 1:1'")
		expect(p.parse("II краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II краљева 1:1'")
		expect(p.parse("II. Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. Царева 1:1'")
		expect(p.parse("2 краљева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 краљева 1:1'")
		expect(p.parse("2. Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. Царева 1:1'")
		expect(p.parse("II Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II Царева 1:1'")
		expect(p.parse("2 Царева 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Царева 1:1'")
		expect(p.parse("2 Цар 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 Цар 1:1'")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2Kgs 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЧЕТВРТА КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ЧЕТВРТА КРАЉЕВСТВА 1:1'")
		expect(p.parse("ЧЕТВРТА КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ЧЕТВРТА КРАЉЕВИМА 1:1'")
		expect(p.parse("ДРУГА О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ДРУГА О ЦАРЕВИМА 1:1'")
		expect(p.parse("2.. О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. О ЦАРЕВИМА 1:1'")
		expect(p.parse("4.. КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4.. КРАЉЕВСТВА 1:1'")
		expect(p.parse("II. О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. О ЦАРЕВИМА 1:1'")
		expect(p.parse("IV. КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV. КРАЉЕВСТВА 1:1'")
		expect(p.parse("2. О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. О ЦАРЕВИМА 1:1'")
		expect(p.parse("4. КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4. КРАЉЕВСТВА 1:1'")
		expect(p.parse("4.. КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4.. КРАЉЕВИМА 1:1'")
		expect(p.parse("II О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II О ЦАРЕВИМА 1:1'")
		expect(p.parse("IV КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV КРАЉЕВСТВА 1:1'")
		expect(p.parse("IV. КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV. КРАЉЕВИМА 1:1'")
		expect(p.parse("ДРУГА КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ДРУГА КРАЉЕВА 1:1'")
		expect(p.parse("2 О ЦАРЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 О ЦАРЕВИМА 1:1'")
		expect(p.parse("4 КРАЉЕВСТВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4 КРАЉЕВСТВА 1:1'")
		expect(p.parse("4. КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4. КРАЉЕВИМА 1:1'")
		expect(p.parse("IV КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'IV КРАЉЕВИМА 1:1'")
		expect(p.parse("ДРУГА ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'ДРУГА ЦАРЕВА 1:1'")
		expect(p.parse("2.. КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. КРАЉЕВА 1:1'")
		expect(p.parse("4 КРАЉЕВИМА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '4 КРАЉЕВИМА 1:1'")
		expect(p.parse("II. КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. КРАЉЕВА 1:1'")
		expect(p.parse("2. КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. КРАЉЕВА 1:1'")
		expect(p.parse("2.. ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2.. ЦАРЕВА 1:1'")
		expect(p.parse("II КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II КРАЉЕВА 1:1'")
		expect(p.parse("II. ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II. ЦАРЕВА 1:1'")
		expect(p.parse("2 КРАЉЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 КРАЉЕВА 1:1'")
		expect(p.parse("2. ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2. ЦАРЕВА 1:1'")
		expect(p.parse("II ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: 'II ЦАРЕВА 1:1'")
		expect(p.parse("2 ЦАРЕВА 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 ЦАРЕВА 1:1'")
		expect(p.parse("2 ЦАР 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2 ЦАР 1:1'")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1", "parsing: '2KGS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Kgs (sr)", function() {
      
		expect(p.parse("Трећом краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Трећом краљевства 1:1'")
		expect(p.parse("Трећа краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Трећа краљевства 1:1'")
		expect(p.parse("Трећом краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Трећом краљевима 1:1'")
		expect(p.parse("III. краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III. краљевства 1:1'")
		expect(p.parse("Прва о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прва о царевима 1:1'")
		expect(p.parse("Трећа краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Трећа краљевима 1:1'")
		expect(p.parse("1.. о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. о царевима 1:1'")
		expect(p.parse("3.. краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3.. краљевства 1:1'")
		expect(p.parse("III краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III краљевства 1:1'")
		expect(p.parse("III. краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III. краљевима 1:1'")
		expect(p.parse("1. о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. о царевима 1:1'")
		expect(p.parse("3. краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3. краљевства 1:1'")
		expect(p.parse("3.. краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3.. краљевима 1:1'")
		expect(p.parse("I. о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. о царевима 1:1'")
		expect(p.parse("III краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III краљевима 1:1'")
		expect(p.parse("1 о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 о царевима 1:1'")
		expect(p.parse("3 краљевства 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3 краљевства 1:1'")
		expect(p.parse("3. краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3. краљевима 1:1'")
		expect(p.parse("I о царевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I о царевима 1:1'")
		expect(p.parse("Прва краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прва краљева 1:1'")
		expect(p.parse("1.. краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. краљева 1:1'")
		expect(p.parse("3 краљевима 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3 краљевима 1:1'")
		expect(p.parse("Прва Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'Прва Царева 1:1'")
		expect(p.parse("1. краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. краљева 1:1'")
		expect(p.parse("1.. Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. Царева 1:1'")
		expect(p.parse("I. краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. краљева 1:1'")
		expect(p.parse("1 краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 краљева 1:1'")
		expect(p.parse("1. Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. Царева 1:1'")
		expect(p.parse("I краљева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I краљева 1:1'")
		expect(p.parse("I. Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. Царева 1:1'")
		expect(p.parse("1 Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Царева 1:1'")
		expect(p.parse("I Царева 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I Царева 1:1'")
		expect(p.parse("1 Цар 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 Цар 1:1'")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1Kgs 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ТРЕЋОМ КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ТРЕЋОМ КРАЉЕВСТВА 1:1'")
		expect(p.parse("ТРЕЋА КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ТРЕЋА КРАЉЕВСТВА 1:1'")
		expect(p.parse("ТРЕЋОМ КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ТРЕЋОМ КРАЉЕВИМА 1:1'")
		expect(p.parse("III. КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III. КРАЉЕВСТВА 1:1'")
		expect(p.parse("ПРВА О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВА О ЦАРЕВИМА 1:1'")
		expect(p.parse("ТРЕЋА КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ТРЕЋА КРАЉЕВИМА 1:1'")
		expect(p.parse("1.. О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. О ЦАРЕВИМА 1:1'")
		expect(p.parse("3.. КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3.. КРАЉЕВСТВА 1:1'")
		expect(p.parse("III КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III КРАЉЕВСТВА 1:1'")
		expect(p.parse("III. КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III. КРАЉЕВИМА 1:1'")
		expect(p.parse("1. О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. О ЦАРЕВИМА 1:1'")
		expect(p.parse("3. КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3. КРАЉЕВСТВА 1:1'")
		expect(p.parse("3.. КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3.. КРАЉЕВИМА 1:1'")
		expect(p.parse("I. О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. О ЦАРЕВИМА 1:1'")
		expect(p.parse("III КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'III КРАЉЕВИМА 1:1'")
		expect(p.parse("1 О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 О ЦАРЕВИМА 1:1'")
		expect(p.parse("3 КРАЉЕВСТВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3 КРАЉЕВСТВА 1:1'")
		expect(p.parse("3. КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3. КРАЉЕВИМА 1:1'")
		expect(p.parse("I О ЦАРЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I О ЦАРЕВИМА 1:1'")
		expect(p.parse("ПРВА КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВА КРАЉЕВА 1:1'")
		expect(p.parse("1.. КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. КРАЉЕВА 1:1'")
		expect(p.parse("3 КРАЉЕВИМА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '3 КРАЉЕВИМА 1:1'")
		expect(p.parse("ПРВА ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'ПРВА ЦАРЕВА 1:1'")
		expect(p.parse("1. КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. КРАЉЕВА 1:1'")
		expect(p.parse("1.. ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1.. ЦАРЕВА 1:1'")
		expect(p.parse("I. КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. КРАЉЕВА 1:1'")
		expect(p.parse("1 КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 КРАЉЕВА 1:1'")
		expect(p.parse("1. ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1. ЦАРЕВА 1:1'")
		expect(p.parse("I КРАЉЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I КРАЉЕВА 1:1'")
		expect(p.parse("I. ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I. ЦАРЕВА 1:1'")
		expect(p.parse("1 ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 ЦАРЕВА 1:1'")
		expect(p.parse("I ЦАРЕВА 1:1").osis()).toEqual("1Kgs.1.1", "parsing: 'I ЦАРЕВА 1:1'")
		expect(p.parse("1 ЦАР 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1 ЦАР 1:1'")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1", "parsing: '1KGS 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Chr (sr)", function() {
      
		expect(p.parse("Друга Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Друга Паралипоменону 1:1'")
		expect(p.parse("2.. Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. Паралипоменону 1:1'")
		expect(p.parse("II. Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. Паралипоменону 1:1'")
		expect(p.parse("2. Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. Паралипоменону 1:1'")
		expect(p.parse("II Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II Паралипоменону 1:1'")
		expect(p.parse("2 Паралипоменону 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Паралипоменону 1:1'")
		expect(p.parse("Друга дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Друга дневника 1:1'")
		expect(p.parse("Друга хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'Друга хроника 1:1'")
		expect(p.parse("2.. дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. дневника 1:1'")
		expect(p.parse("II. дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. дневника 1:1'")
		expect(p.parse("2. дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. дневника 1:1'")
		expect(p.parse("2.. хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. хроника 1:1'")
		expect(p.parse("II дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II дневника 1:1'")
		expect(p.parse("II. хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. хроника 1:1'")
		expect(p.parse("2 Дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Дневника 1:1'")
		expect(p.parse("2 дневника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 дневника 1:1'")
		expect(p.parse("2. хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. хроника 1:1'")
		expect(p.parse("II хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II хроника 1:1'")
		expect(p.parse("2 хроника 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 хроника 1:1'")
		expect(p.parse("2 хрон 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 хрон 1:1'")
		expect(p.parse("2 Дн 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 Дн 1:1'")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2Chr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ДРУГА ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("2.. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("II. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("2. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("II ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("2 ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("ДРУГА ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ДРУГА ДНЕВНИКА 1:1'")
		expect(p.parse("ДРУГА ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'ДРУГА ХРОНИКА 1:1'")
		expect(p.parse("2.. ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. ДНЕВНИКА 1:1'")
		expect(p.parse("II. ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. ДНЕВНИКА 1:1'")
		expect(p.parse("2. ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. ДНЕВНИКА 1:1'")
		expect(p.parse("2.. ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2.. ХРОНИКА 1:1'")
		expect(p.parse("II ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II ДНЕВНИКА 1:1'")
		expect(p.parse("II. ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II. ХРОНИКА 1:1'")
		expect(p.parse("2 ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ДНЕВНИКА 1:1'")
		expect(p.parse("2 ДНЕВНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ДНЕВНИКА 1:1'")
		expect(p.parse("2. ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2. ХРОНИКА 1:1'")
		expect(p.parse("II ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: 'II ХРОНИКА 1:1'")
		expect(p.parse("2 ХРОНИКА 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ХРОНИКА 1:1'")
		expect(p.parse("2 ХРОН 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ХРОН 1:1'")
		expect(p.parse("2 ДН 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2 ДН 1:1'")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1", "parsing: '2CHR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Chr (sr)", function() {
      
		expect(p.parse("Прва Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прва Паралипоменону 1:1'")
		expect(p.parse("1.. Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. Паралипоменону 1:1'")
		expect(p.parse("1. Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. Паралипоменону 1:1'")
		expect(p.parse("I. Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. Паралипоменону 1:1'")
		expect(p.parse("1 Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Паралипоменону 1:1'")
		expect(p.parse("I Паралипоменону 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I Паралипоменону 1:1'")
		expect(p.parse("Прва дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прва дневника 1:1'")
		expect(p.parse("1.. дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. дневника 1:1'")
		expect(p.parse("Прва хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'Прва хроника 1:1'")
		expect(p.parse("1. дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. дневника 1:1'")
		expect(p.parse("1.. хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. хроника 1:1'")
		expect(p.parse("I. дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. дневника 1:1'")
		expect(p.parse("1 Дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Дневника 1:1'")
		expect(p.parse("1 дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 дневника 1:1'")
		expect(p.parse("1. хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. хроника 1:1'")
		expect(p.parse("I дневника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I дневника 1:1'")
		expect(p.parse("I. хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. хроника 1:1'")
		expect(p.parse("1 хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 хроника 1:1'")
		expect(p.parse("I хроника 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I хроника 1:1'")
		expect(p.parse("1 хрон 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 хрон 1:1'")
		expect(p.parse("1 Дн 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 Дн 1:1'")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1Chr 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВА ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("1.. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("1. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("I. ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("1 ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("I ПАРАЛИПОМЕНОНУ 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I ПАРАЛИПОМЕНОНУ 1:1'")
		expect(p.parse("ПРВА ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВА ДНЕВНИКА 1:1'")
		expect(p.parse("1.. ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. ДНЕВНИКА 1:1'")
		expect(p.parse("ПРВА ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'ПРВА ХРОНИКА 1:1'")
		expect(p.parse("1. ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. ДНЕВНИКА 1:1'")
		expect(p.parse("1.. ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1.. ХРОНИКА 1:1'")
		expect(p.parse("I. ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. ДНЕВНИКА 1:1'")
		expect(p.parse("1 ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ДНЕВНИКА 1:1'")
		expect(p.parse("1 ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ДНЕВНИКА 1:1'")
		expect(p.parse("1. ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1. ХРОНИКА 1:1'")
		expect(p.parse("I ДНЕВНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I ДНЕВНИКА 1:1'")
		expect(p.parse("I. ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I. ХРОНИКА 1:1'")
		expect(p.parse("1 ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ХРОНИКА 1:1'")
		expect(p.parse("I ХРОНИКА 1:1").osis()).toEqual("1Chr.1.1", "parsing: 'I ХРОНИКА 1:1'")
		expect(p.parse("1 ХРОН 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ХРОН 1:1'")
		expect(p.parse("1 ДН 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1 ДН 1:1'")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1", "parsing: '1CHR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezra (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (sr)", function() {
      
		expect(p.parse("Јездра 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Јездра 1:1'")
		expect(p.parse("Езрина 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Езрина 1:1'")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Ezra 1:1'")
		expect(p.parse("Езр 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'Езр 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕЗДРА 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'ЈЕЗДРА 1:1'")
		expect(p.parse("ЕЗРИНА 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'ЕЗРИНА 1:1'")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'EZRA 1:1'")
		expect(p.parse("ЕЗР 1:1").osis()).toEqual("Ezra.1.1", "parsing: 'ЕЗР 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Neh (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (sr)", function() {
      
		expect(p.parse("Немија 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Немија 1:1'")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Neh 1:1'")
		expect(p.parse("Нем 1:1").osis()).toEqual("Neh.1.1", "parsing: 'Нем 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("НЕМИЈА 1:1").osis()).toEqual("Neh.1.1", "parsing: 'НЕМИЈА 1:1'")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1", "parsing: 'NEH 1:1'")
		expect(p.parse("НЕМ 1:1").osis()).toEqual("Neh.1.1", "parsing: 'НЕМ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (sr)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1", "parsing: 'GkEsth 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Esth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (sr)", function() {
      
		expect(p.parse("Јестира 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Јестира 1:1'")
		expect(p.parse("Естер 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Естер 1:1'")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Esth 1:1'")
		expect(p.parse("Јест 1:1").osis()).toEqual("Esth.1.1", "parsing: 'Јест 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕСТИРА 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ЈЕСТИРА 1:1'")
		expect(p.parse("ЕСТЕР 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ЕСТЕР 1:1'")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ESTH 1:1'")
		expect(p.parse("ЈЕСТ 1:1").osis()).toEqual("Esth.1.1", "parsing: 'ЈЕСТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Job (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (sr)", function() {
      
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1", "parsing: 'Job 1:1'")
		expect(p.parse("Јов 1:1").osis()).toEqual("Job.1.1", "parsing: 'Јов 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1", "parsing: 'JOB 1:1'")
		expect(p.parse("ЈОВ 1:1").osis()).toEqual("Job.1.1", "parsing: 'ЈОВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ps (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (sr)", function() {
      
		expect(p.parse("Псалми Давидови 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Псалми Давидови 1:1'")
		expect(p.parse("Psalam 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Psalam 1:1'")
		expect(p.parse("Псалам 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Псалам 1:1'")
		expect(p.parse("Псалми 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Псалми 1:1'")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Ps 1:1'")
		expect(p.parse("Пс 1:1").osis()).toEqual("Ps.1.1", "parsing: 'Пс 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПСАЛМИ ДАВИДОВИ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПСАЛМИ ДАВИДОВИ 1:1'")
		expect(p.parse("PSALAM 1:1").osis()).toEqual("Ps.1.1", "parsing: 'PSALAM 1:1'")
		expect(p.parse("ПСАЛАМ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПСАЛАМ 1:1'")
		expect(p.parse("ПСАЛМИ 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПСАЛМИ 1:1'")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1", "parsing: 'PS 1:1'")
		expect(p.parse("ПС 1:1").osis()).toEqual("Ps.1.1", "parsing: 'ПС 1:1'")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (sr)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1", "parsing: 'PrAzar 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Prov (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (sr)", function() {
      
		expect(p.parse("Приче Соломонове 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Приче Соломонове 1:1'")
		expect(p.parse("Приче Соломунове 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Приче Соломунове 1:1'")
		expect(p.parse("Изреке 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Изреке 1:1'")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Prov 1:1'")
		expect(p.parse("Пр 1:1").osis()).toEqual("Prov.1.1", "parsing: 'Пр 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРИЧЕ СОЛОМОНОВЕ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ПРИЧЕ СОЛОМОНОВЕ 1:1'")
		expect(p.parse("ПРИЧЕ СОЛОМУНОВЕ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ПРИЧЕ СОЛОМУНОВЕ 1:1'")
		expect(p.parse("ИЗРЕКЕ 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ИЗРЕКЕ 1:1'")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1", "parsing: 'PROV 1:1'")
		expect(p.parse("ПР 1:1").osis()).toEqual("Prov.1.1", "parsing: 'ПР 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eccl (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (sr)", function() {
      
		expect(p.parse("Проповедник 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Проповедник 1:1'")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Eccl 1:1'")
		expect(p.parse("Проп 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'Проп 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРОПОВЕДНИК 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ПРОПОВЕДНИК 1:1'")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ECCL 1:1'")
		expect(p.parse("ПРОП 1:1").osis()).toEqual("Eccl.1.1", "parsing: 'ПРОП 1:1'")
		;
      return true;
    });
  });

  describe("Localized book SgThree (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (sr)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1", "parsing: 'SgThree 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Song (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (sr)", function() {
      
		expect(p.parse("Песма над песмама 1:1").osis()).toEqual("Song.1.1", "parsing: 'Песма над песмама 1:1'")
		expect(p.parse("Песма Соломонова 1:1").osis()).toEqual("Song.1.1", "parsing: 'Песма Соломонова 1:1'")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1", "parsing: 'Song 1:1'")
		expect(p.parse("Пнп 1:1").osis()).toEqual("Song.1.1", "parsing: 'Пнп 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПЕСМА НАД ПЕСМАМА 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПЕСМА НАД ПЕСМАМА 1:1'")
		expect(p.parse("ПЕСМА СОЛОМОНОВА 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПЕСМА СОЛОМОНОВА 1:1'")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1", "parsing: 'SONG 1:1'")
		expect(p.parse("ПНП 1:1").osis()).toEqual("Song.1.1", "parsing: 'ПНП 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jer (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (sr)", function() {
      
		expect(p.parse("Jevrejima 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jevrejima 1:1'")
		expect(p.parse("Јеремија 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Јеремија 1:1'")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Jer 1:1'")
		expect(p.parse("Јер 1:1").osis()).toEqual("Jer.1.1", "parsing: 'Јер 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JEVREJIMA 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JEVREJIMA 1:1'")
		expect(p.parse("ЈЕРЕМИЈА 1:1").osis()).toEqual("Jer.1.1", "parsing: 'ЈЕРЕМИЈА 1:1'")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1", "parsing: 'JER 1:1'")
		expect(p.parse("ЈЕР 1:1").osis()).toEqual("Jer.1.1", "parsing: 'ЈЕР 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Ezek (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (sr)", function() {
      
		expect(p.parse("Језекиљ 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Језекиљ 1:1'")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Ezek 1:1'")
		expect(p.parse("Јез 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'Јез 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕЗЕКИЉ 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'ЈЕЗЕКИЉ 1:1'")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'EZEK 1:1'")
		expect(p.parse("ЈЕЗ 1:1").osis()).toEqual("Ezek.1.1", "parsing: 'ЈЕЗ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Dan (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (sr)", function() {
      
		expect(p.parse("Данило 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Данило 1:1'")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Dan 1:1'")
		expect(p.parse("Дан 1:1").osis()).toEqual("Dan.1.1", "parsing: 'Дан 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДАНИЛО 1:1").osis()).toEqual("Dan.1.1", "parsing: 'ДАНИЛО 1:1'")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1", "parsing: 'DAN 1:1'")
		expect(p.parse("ДАН 1:1").osis()).toEqual("Dan.1.1", "parsing: 'ДАН 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hos (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (sr)", function() {
      
		expect(p.parse("Осија 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Осија 1:1'")
		expect(p.parse("Хошеа 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Хошеа 1:1'")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Hos 1:1'")
		expect(p.parse("Ос 1:1").osis()).toEqual("Hos.1.1", "parsing: 'Ос 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ОСИЈА 1:1").osis()).toEqual("Hos.1.1", "parsing: 'ОСИЈА 1:1'")
		expect(p.parse("ХОШЕА 1:1").osis()).toEqual("Hos.1.1", "parsing: 'ХОШЕА 1:1'")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1", "parsing: 'HOS 1:1'")
		expect(p.parse("ОС 1:1").osis()).toEqual("Hos.1.1", "parsing: 'ОС 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Joel (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (sr)", function() {
      
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Joel 1:1'")
		expect(p.parse("Јоил 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Јоил 1:1'")
		expect(p.parse("Јоиљ 1:1").osis()).toEqual("Joel.1.1", "parsing: 'Јоиљ 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1", "parsing: 'JOEL 1:1'")
		expect(p.parse("ЈОИЛ 1:1").osis()).toEqual("Joel.1.1", "parsing: 'ЈОИЛ 1:1'")
		expect(p.parse("ЈОИЉ 1:1").osis()).toEqual("Joel.1.1", "parsing: 'ЈОИЉ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Amos (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (sr)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Amos 1:1'")
		expect(p.parse("Амос 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Амос 1:1'")
		expect(p.parse("Ам 1:1").osis()).toEqual("Amos.1.1", "parsing: 'Ам 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1", "parsing: 'AMOS 1:1'")
		expect(p.parse("АМОС 1:1").osis()).toEqual("Amos.1.1", "parsing: 'АМОС 1:1'")
		expect(p.parse("АМ 1:1").osis()).toEqual("Amos.1.1", "parsing: 'АМ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Obad (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (sr)", function() {
      
		expect(p.parse("Авдија 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Авдија 1:1'")
		expect(p.parse("Авдије 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Авдије 1:1'")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Obad 1:1'")
		expect(p.parse("Авд 1:1").osis()).toEqual("Obad.1.1", "parsing: 'Авд 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("АВДИЈА 1:1").osis()).toEqual("Obad.1.1", "parsing: 'АВДИЈА 1:1'")
		expect(p.parse("АВДИЈЕ 1:1").osis()).toEqual("Obad.1.1", "parsing: 'АВДИЈЕ 1:1'")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1", "parsing: 'OBAD 1:1'")
		expect(p.parse("АВД 1:1").osis()).toEqual("Obad.1.1", "parsing: 'АВД 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jonah (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (sr)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Jonah 1:1'")
		expect(p.parse("Јона 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'Јона 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'JONAH 1:1'")
		expect(p.parse("ЈОНА 1:1").osis()).toEqual("Jonah.1.1", "parsing: 'ЈОНА 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mic (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (sr)", function() {
      
		expect(p.parse("Михеј 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Михеј 1:1'")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Mic 1:1'")
		expect(p.parse("Мих 1:1").osis()).toEqual("Mic.1.1", "parsing: 'Мих 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("МИХЕЈ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'МИХЕЈ 1:1'")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1", "parsing: 'MIC 1:1'")
		expect(p.parse("МИХ 1:1").osis()).toEqual("Mic.1.1", "parsing: 'МИХ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Nah (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (sr)", function() {
      
		expect(p.parse("Наум 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Наум 1:1'")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1", "parsing: 'Nah 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("НАУМ 1:1").osis()).toEqual("Nah.1.1", "parsing: 'НАУМ 1:1'")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1", "parsing: 'NAH 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hab (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (sr)", function() {
      
		expect(p.parse("Авакум 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Авакум 1:1'")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Hab 1:1'")
		expect(p.parse("Ав 1:1").osis()).toEqual("Hab.1.1", "parsing: 'Ав 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("АВАКУМ 1:1").osis()).toEqual("Hab.1.1", "parsing: 'АВАКУМ 1:1'")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1", "parsing: 'HAB 1:1'")
		expect(p.parse("АВ 1:1").osis()).toEqual("Hab.1.1", "parsing: 'АВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zeph (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (sr)", function() {
      
		expect(p.parse("Софонија 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Софонија 1:1'")
		expect(p.parse("Софоније 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Софоније 1:1'")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Zeph 1:1'")
		expect(p.parse("Соф 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'Соф 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("СОФОНИЈА 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'СОФОНИЈА 1:1'")
		expect(p.parse("СОФОНИЈЕ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'СОФОНИЈЕ 1:1'")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'ZEPH 1:1'")
		expect(p.parse("СОФ 1:1").osis()).toEqual("Zeph.1.1", "parsing: 'СОФ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Hag (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (sr)", function() {
      
		expect(p.parse("Агеј 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Агеј 1:1'")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Hag 1:1'")
		expect(p.parse("Аг 1:1").osis()).toEqual("Hag.1.1", "parsing: 'Аг 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("АГЕЈ 1:1").osis()).toEqual("Hag.1.1", "parsing: 'АГЕЈ 1:1'")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1", "parsing: 'HAG 1:1'")
		expect(p.parse("АГ 1:1").osis()).toEqual("Hag.1.1", "parsing: 'АГ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Zech (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (sr)", function() {
      
		expect(p.parse("Захарија 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Захарија 1:1'")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Zech 1:1'")
		expect(p.parse("Зах 1:1").osis()).toEqual("Zech.1.1", "parsing: 'Зах 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЗАХАРИЈА 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ЗАХАРИЈА 1:1'")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ZECH 1:1'")
		expect(p.parse("ЗАХ 1:1").osis()).toEqual("Zech.1.1", "parsing: 'ЗАХ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mal (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (sr)", function() {
      
		expect(p.parse("Малахија 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Малахија 1:1'")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Mal 1:1'")
		expect(p.parse("Мал 1:1").osis()).toEqual("Mal.1.1", "parsing: 'Мал 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("МАЛАХИЈА 1:1").osis()).toEqual("Mal.1.1", "parsing: 'МАЛАХИЈА 1:1'")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1", "parsing: 'MAL 1:1'")
		expect(p.parse("МАЛ 1:1").osis()).toEqual("Mal.1.1", "parsing: 'МАЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Matt (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (sr)", function() {
      
		expect(p.parse("Јеванђеље по Матеју 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Јеванђеље по Матеју 1:1'")
		expect(p.parse("Еванђеље по Матеју 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Еванђеље по Матеју 1:1'")
		expect(p.parse("Матеја 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Матеја 1:1'")
		expect(p.parse("Матеј 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Матеј 1:1'")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Matt 1:1'")
		expect(p.parse("Мт 1:1").osis()).toEqual("Matt.1.1", "parsing: 'Мт 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕВАНЂЕЉЕ ПО МАТЕЈУ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'ЈЕВАНЂЕЉЕ ПО МАТЕЈУ 1:1'")
		expect(p.parse("ЕВАНЂЕЉЕ ПО МАТЕЈУ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'ЕВАНЂЕЉЕ ПО МАТЕЈУ 1:1'")
		expect(p.parse("МАТЕЈА 1:1").osis()).toEqual("Matt.1.1", "parsing: 'МАТЕЈА 1:1'")
		expect(p.parse("МАТЕЈ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'МАТЕЈ 1:1'")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1", "parsing: 'MATT 1:1'")
		expect(p.parse("МТ 1:1").osis()).toEqual("Matt.1.1", "parsing: 'МТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (sr)", function() {
      
		expect(p.parse("Друга Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Друга Макабејаца 1:1'")
		expect(p.parse("Друга Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Друга Макавејска 1:1'")
		expect(p.parse("2.. Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2.. Макабејаца 1:1'")
		expect(p.parse("2.. Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2.. Макавејска 1:1'")
		expect(p.parse("II. Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Макабејаца 1:1'")
		expect(p.parse("II. Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Макавејска 1:1'")
		expect(p.parse("Друга Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'Друга Макавеја 1:1'")
		expect(p.parse("2. Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Макабејаца 1:1'")
		expect(p.parse("2. Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Макавејска 1:1'")
		expect(p.parse("II Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Макабејаца 1:1'")
		expect(p.parse("II Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Макавејска 1:1'")
		expect(p.parse("2 Макабејаца 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Макабејаца 1:1'")
		expect(p.parse("2 Макавејска 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Макавејска 1:1'")
		expect(p.parse("2.. Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2.. Макавеја 1:1'")
		expect(p.parse("II. Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II. Макавеја 1:1'")
		expect(p.parse("2. Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2. Макавеја 1:1'")
		expect(p.parse("II Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: 'II Макавеја 1:1'")
		expect(p.parse("2 Макавеја 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Макавеја 1:1'")
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2Macc 1:1'")
		expect(p.parse("2 Мк 1:1").osis()).toEqual("2Macc.1.1", "parsing: '2 Мк 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (sr)", function() {
      
		expect(p.parse("Трећом Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећом Макабејаца 1:1'")
		expect(p.parse("Трећом Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећом Макавејска 1:1'")
		expect(p.parse("Трећа Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећа Макабејаца 1:1'")
		expect(p.parse("Трећа Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећа Макавејска 1:1'")
		expect(p.parse("III. Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Макабејаца 1:1'")
		expect(p.parse("III. Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Макавејска 1:1'")
		expect(p.parse("Трећом Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећом Макавеја 1:1'")
		expect(p.parse("3.. Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3.. Макабејаца 1:1'")
		expect(p.parse("3.. Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3.. Макавејска 1:1'")
		expect(p.parse("III Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Макабејаца 1:1'")
		expect(p.parse("III Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Макавејска 1:1'")
		expect(p.parse("Трећа Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'Трећа Макавеја 1:1'")
		expect(p.parse("3. Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Макабејаца 1:1'")
		expect(p.parse("3. Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Макавејска 1:1'")
		expect(p.parse("III. Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III. Макавеја 1:1'")
		expect(p.parse("3 Макабејаца 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Макабејаца 1:1'")
		expect(p.parse("3 Макавејска 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Макавејска 1:1'")
		expect(p.parse("3.. Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3.. Макавеја 1:1'")
		expect(p.parse("III Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: 'III Макавеја 1:1'")
		expect(p.parse("3. Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3. Макавеја 1:1'")
		expect(p.parse("3 Макавеја 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Макавеја 1:1'")
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3Macc 1:1'")
		expect(p.parse("3 Мк 1:1").osis()).toEqual("3Macc.1.1", "parsing: '3 Мк 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (sr)", function() {
      
		expect(p.parse("Четврта Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Четврта Макабејаца 1:1'")
		expect(p.parse("Четврта Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Четврта Макавејска 1:1'")
		expect(p.parse("Четврта Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'Четврта Макавеја 1:1'")
		expect(p.parse("4.. Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4.. Макабејаца 1:1'")
		expect(p.parse("4.. Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4.. Макавејска 1:1'")
		expect(p.parse("IV. Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Макабејаца 1:1'")
		expect(p.parse("IV. Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Макавејска 1:1'")
		expect(p.parse("4. Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Макабејаца 1:1'")
		expect(p.parse("4. Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Макавејска 1:1'")
		expect(p.parse("IV Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Макабејаца 1:1'")
		expect(p.parse("IV Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Макавејска 1:1'")
		expect(p.parse("4 Макабејаца 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Макабејаца 1:1'")
		expect(p.parse("4 Макавејска 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Макавејска 1:1'")
		expect(p.parse("4.. Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4.. Макавеја 1:1'")
		expect(p.parse("IV. Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV. Макавеја 1:1'")
		expect(p.parse("4. Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4. Макавеја 1:1'")
		expect(p.parse("IV Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: 'IV Макавеја 1:1'")
		expect(p.parse("4 Макавеја 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Макавеја 1:1'")
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4Macc 1:1'")
		expect(p.parse("4 Мк 1:1").osis()).toEqual("4Macc.1.1", "parsing: '4 Мк 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (sr)", function() {
      
		expect(p.parse("Прва Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Прва Макабејаца 1:1'")
		expect(p.parse("Прва Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Прва Макавејска 1:1'")
		expect(p.parse("1.. Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1.. Макабејаца 1:1'")
		expect(p.parse("1.. Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1.. Макавејска 1:1'")
		expect(p.parse("1. Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Макабејаца 1:1'")
		expect(p.parse("1. Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Макавејска 1:1'")
		expect(p.parse("I. Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Макабејаца 1:1'")
		expect(p.parse("I. Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Макавејска 1:1'")
		expect(p.parse("Прва Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'Прва Макавеја 1:1'")
		expect(p.parse("1 Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Макабејаца 1:1'")
		expect(p.parse("1 Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Макавејска 1:1'")
		expect(p.parse("1.. Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1.. Макавеја 1:1'")
		expect(p.parse("I Макабејаца 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Макабејаца 1:1'")
		expect(p.parse("I Макавејска 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Макавејска 1:1'")
		expect(p.parse("1. Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1. Макавеја 1:1'")
		expect(p.parse("I. Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I. Макавеја 1:1'")
		expect(p.parse("1 Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Макавеја 1:1'")
		expect(p.parse("I Макавеја 1:1").osis()).toEqual("1Macc.1.1", "parsing: 'I Макавеја 1:1'")
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1Macc 1:1'")
		expect(p.parse("1 Мк 1:1").osis()).toEqual("1Macc.1.1", "parsing: '1 Мк 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Mark (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (sr)", function() {
      
		expect(p.parse("Јеванђеље по Марку 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Јеванђеље по Марку 1:1'")
		expect(p.parse("Еванђеље по Марку 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Еванђеље по Марку 1:1'")
		expect(p.parse("Маркo 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Маркo 1:1'")
		expect(p.parse("Марко 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Марко 1:1'")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Mark 1:1'")
		expect(p.parse("Мк 1:1").osis()).toEqual("Mark.1.1", "parsing: 'Мк 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕВАНЂЕЉЕ ПО МАРКУ 1:1").osis()).toEqual("Mark.1.1", "parsing: 'ЈЕВАНЂЕЉЕ ПО МАРКУ 1:1'")
		expect(p.parse("ЕВАНЂЕЉЕ ПО МАРКУ 1:1").osis()).toEqual("Mark.1.1", "parsing: 'ЕВАНЂЕЉЕ ПО МАРКУ 1:1'")
		expect(p.parse("МАРКO 1:1").osis()).toEqual("Mark.1.1", "parsing: 'МАРКO 1:1'")
		expect(p.parse("МАРКО 1:1").osis()).toEqual("Mark.1.1", "parsing: 'МАРКО 1:1'")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1", "parsing: 'MARK 1:1'")
		expect(p.parse("МК 1:1").osis()).toEqual("Mark.1.1", "parsing: 'МК 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Luke (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (sr)", function() {
      
		expect(p.parse("Јеванђеље по Луки 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Јеванђеље по Луки 1:1'")
		expect(p.parse("Еванђеље по Луки 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Еванђеље по Луки 1:1'")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Luke 1:1'")
		expect(p.parse("Лукa 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Лукa 1:1'")
		expect(p.parse("Лука 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Лука 1:1'")
		expect(p.parse("Лк 1:1").osis()).toEqual("Luke.1.1", "parsing: 'Лк 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕВАНЂЕЉЕ ПО ЛУКИ 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЈЕВАНЂЕЉЕ ПО ЛУКИ 1:1'")
		expect(p.parse("ЕВАНЂЕЉЕ ПО ЛУКИ 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЕВАНЂЕЉЕ ПО ЛУКИ 1:1'")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1", "parsing: 'LUKE 1:1'")
		expect(p.parse("ЛУКA 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЛУКA 1:1'")
		expect(p.parse("ЛУКА 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЛУКА 1:1'")
		expect(p.parse("ЛК 1:1").osis()).toEqual("Luke.1.1", "parsing: 'ЛК 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1John (sr)", function() {
      
		expect(p.parse("Прва посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва посланица Јованова 1:1'")
		expect(p.parse("1.. посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. посланица Јованова 1:1'")
		expect(p.parse("1. посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1. посланица Јованова 1:1'")
		expect(p.parse("I. посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. посланица Јованова 1:1'")
		expect(p.parse("1 посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1 посланица Јованова 1:1'")
		expect(p.parse("I посланица Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'I посланица Јованова 1:1'")
		expect(p.parse("Прва Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'Прва Јованова 1:1'")
		expect(p.parse("1.. Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. Јованова 1:1'")
		expect(p.parse("1. Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1. Јованова 1:1'")
		expect(p.parse("I. Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. Јованова 1:1'")
		expect(p.parse("1 Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Јованова 1:1'")
		expect(p.parse("I Јованова 1:1").osis()).toEqual("1John.1.1", "parsing: 'I Јованова 1:1'")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1", "parsing: '1John 1:1'")
		expect(p.parse("1 Јн 1:1").osis()).toEqual("1John.1.1", "parsing: '1 Јн 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("1.. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("1. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("I. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("1 ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("I ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("ПРВА ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'ПРВА ЈОВАНОВА 1:1'")
		expect(p.parse("1.. ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1.. ЈОВАНОВА 1:1'")
		expect(p.parse("1. ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1. ЈОВАНОВА 1:1'")
		expect(p.parse("I. ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'I. ЈОВАНОВА 1:1'")
		expect(p.parse("1 ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ЈОВАНОВА 1:1'")
		expect(p.parse("I ЈОВАНОВА 1:1").osis()).toEqual("1John.1.1", "parsing: 'I ЈОВАНОВА 1:1'")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1", "parsing: '1JOHN 1:1'")
		expect(p.parse("1 ЈН 1:1").osis()).toEqual("1John.1.1", "parsing: '1 ЈН 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2John (sr)", function() {
      
		expect(p.parse("Друга посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'Друга посланица Јованова 1:1'")
		expect(p.parse("2.. посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. посланица Јованова 1:1'")
		expect(p.parse("II. посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. посланица Јованова 1:1'")
		expect(p.parse("2. посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2. посланица Јованова 1:1'")
		expect(p.parse("II посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'II посланица Јованова 1:1'")
		expect(p.parse("2 посланица Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2 посланица Јованова 1:1'")
		expect(p.parse("Друга Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'Друга Јованова 1:1'")
		expect(p.parse("2.. Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. Јованова 1:1'")
		expect(p.parse("II. Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. Јованова 1:1'")
		expect(p.parse("2. Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2. Јованова 1:1'")
		expect(p.parse("II Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: 'II Јованова 1:1'")
		expect(p.parse("2 Јованова 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Јованова 1:1'")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1", "parsing: '2John 1:1'")
		expect(p.parse("2 Јн 1:1").osis()).toEqual("2John.1.1", "parsing: '2 Јн 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'ДРУГА ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("2.. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("II. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("2. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("II ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("2 ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("ДРУГА ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'ДРУГА ЈОВАНОВА 1:1'")
		expect(p.parse("2.. ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2.. ЈОВАНОВА 1:1'")
		expect(p.parse("II. ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'II. ЈОВАНОВА 1:1'")
		expect(p.parse("2. ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2. ЈОВАНОВА 1:1'")
		expect(p.parse("II ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: 'II ЈОВАНОВА 1:1'")
		expect(p.parse("2 ЈОВАНОВА 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ЈОВАНОВА 1:1'")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1", "parsing: '2JOHN 1:1'")
		expect(p.parse("2 ЈН 1:1").osis()).toEqual("2John.1.1", "parsing: '2 ЈН 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 3John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3John (sr)", function() {
      
		expect(p.parse("Трећом посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трећом посланица Јованова 1:1'")
		expect(p.parse("Трећа посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трећа посланица Јованова 1:1'")
		expect(p.parse("III. посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. посланица Јованова 1:1'")
		expect(p.parse("3.. посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. посланица Јованова 1:1'")
		expect(p.parse("III посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'III посланица Јованова 1:1'")
		expect(p.parse("3. посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3. посланица Јованова 1:1'")
		expect(p.parse("3 посланица Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3 посланица Јованова 1:1'")
		expect(p.parse("Трећом Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трећом Јованова 1:1'")
		expect(p.parse("Трећа Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'Трећа Јованова 1:1'")
		expect(p.parse("III. Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. Јованова 1:1'")
		expect(p.parse("3.. Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. Јованова 1:1'")
		expect(p.parse("III Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: 'III Јованова 1:1'")
		expect(p.parse("3. Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3. Јованова 1:1'")
		expect(p.parse("3 Јованова 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Јованова 1:1'")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1", "parsing: '3John 1:1'")
		expect(p.parse("3 Јн 1:1").osis()).toEqual("3John.1.1", "parsing: '3 Јн 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ТРЕЋОМ ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕЋОМ ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("ТРЕЋА ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕЋА ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("III. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("3.. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("III ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("3. ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("3 ПОСЛАНИЦА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ПОСЛАНИЦА ЈОВАНОВА 1:1'")
		expect(p.parse("ТРЕЋОМ ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕЋОМ ЈОВАНОВА 1:1'")
		expect(p.parse("ТРЕЋА ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'ТРЕЋА ЈОВАНОВА 1:1'")
		expect(p.parse("III. ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'III. ЈОВАНОВА 1:1'")
		expect(p.parse("3.. ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3.. ЈОВАНОВА 1:1'")
		expect(p.parse("III ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: 'III ЈОВАНОВА 1:1'")
		expect(p.parse("3. ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3. ЈОВАНОВА 1:1'")
		expect(p.parse("3 ЈОВАНОВА 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ЈОВАНОВА 1:1'")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1", "parsing: '3JOHN 1:1'")
		expect(p.parse("3 ЈН 1:1").osis()).toEqual("3John.1.1", "parsing: '3 ЈН 1:1'")
		;
      return true;
    });
  });

  describe("Localized book John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (sr)", function() {
      
		expect(p.parse("Јеванђеље по Јовану 1:1").osis()).toEqual("John.1.1", "parsing: 'Јеванђеље по Јовану 1:1'")
		expect(p.parse("Еванђеље по Јовану 1:1").osis()).toEqual("John.1.1", "parsing: 'Еванђеље по Јовану 1:1'")
		expect(p.parse("Jovan 1:1").osis()).toEqual("John.1.1", "parsing: 'Jovan 1:1'")
		expect(p.parse("Јован 1:1").osis()).toEqual("John.1.1", "parsing: 'Јован 1:1'")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1", "parsing: 'John 1:1'")
		expect(p.parse("Јн 1:1").osis()).toEqual("John.1.1", "parsing: 'Јн 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ЈЕВАНЂЕЉЕ ПО ЈОВАНУ 1:1").osis()).toEqual("John.1.1", "parsing: 'ЈЕВАНЂЕЉЕ ПО ЈОВАНУ 1:1'")
		expect(p.parse("ЕВАНЂЕЉЕ ПО ЈОВАНУ 1:1").osis()).toEqual("John.1.1", "parsing: 'ЕВАНЂЕЉЕ ПО ЈОВАНУ 1:1'")
		expect(p.parse("JOVAN 1:1").osis()).toEqual("John.1.1", "parsing: 'JOVAN 1:1'")
		expect(p.parse("ЈОВАН 1:1").osis()).toEqual("John.1.1", "parsing: 'ЈОВАН 1:1'")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1", "parsing: 'JOHN 1:1'")
		expect(p.parse("ЈН 1:1").osis()).toEqual("John.1.1", "parsing: 'ЈН 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Acts (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (sr)", function() {
      
		expect(p.parse("Дела Апостолска 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела Апостолска 1:1'")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Acts 1:1'")
		expect(p.parse("Дела 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дела 1:1'")
		expect(p.parse("Дап 1:1").osis()).toEqual("Acts.1.1", "parsing: 'Дап 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДЕЛА АПОСТОЛСКА 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА АПОСТОЛСКА 1:1'")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ACTS 1:1'")
		expect(p.parse("ДЕЛА 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДЕЛА 1:1'")
		expect(p.parse("ДАП 1:1").osis()).toEqual("Acts.1.1", "parsing: 'ДАП 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Rom (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (sr)", function() {
      
		expect(p.parse("Посланица Римљанима 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Посланица Римљанима 1:1'")
		expect(p.parse("Римљанима 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Римљанима 1:1'")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Rom 1:1'")
		expect(p.parse("Рим 1:1").osis()).toEqual("Rom.1.1", "parsing: 'Рим 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА РИМЉАНИМА 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ПОСЛАНИЦА РИМЉАНИМА 1:1'")
		expect(p.parse("РИМЉАНИМА 1:1").osis()).toEqual("Rom.1.1", "parsing: 'РИМЉАНИМА 1:1'")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1", "parsing: 'ROM 1:1'")
		expect(p.parse("РИМ 1:1").osis()).toEqual("Rom.1.1", "parsing: 'РИМ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Cor (sr)", function() {
      
		expect(p.parse("Друга посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Друга посланица Коринћанима 1:1'")
		expect(p.parse("2.. посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. посланица Коринћанима 1:1'")
		expect(p.parse("II. посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. посланица Коринћанима 1:1'")
		expect(p.parse("2. посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. посланица Коринћанима 1:1'")
		expect(p.parse("II посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II посланица Коринћанима 1:1'")
		expect(p.parse("2 посланица Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 посланица Коринћанима 1:1'")
		expect(p.parse("Друга Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'Друга Коринћанима 1:1'")
		expect(p.parse("2.. Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. Коринћанима 1:1'")
		expect(p.parse("II. Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. Коринћанима 1:1'")
		expect(p.parse("2. Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. Коринћанима 1:1'")
		expect(p.parse("II Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II Коринћанима 1:1'")
		expect(p.parse("2 Коринћанима 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Коринћанима 1:1'")
		expect(p.parse("2 Кор 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 Кор 1:1'")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2Cor 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ДРУГА ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("2.. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("II. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("2. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("II ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("2 ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("ДРУГА КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'ДРУГА КОРИНЋАНИМА 1:1'")
		expect(p.parse("2.. КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2.. КОРИНЋАНИМА 1:1'")
		expect(p.parse("II. КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II. КОРИНЋАНИМА 1:1'")
		expect(p.parse("2. КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2. КОРИНЋАНИМА 1:1'")
		expect(p.parse("II КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: 'II КОРИНЋАНИМА 1:1'")
		expect(p.parse("2 КОРИНЋАНИМА 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОРИНЋАНИМА 1:1'")
		expect(p.parse("2 КОР 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2 КОР 1:1'")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1", "parsing: '2COR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Cor (sr)", function() {
      
		expect(p.parse("Прва посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва посланица Коринћанима 1:1'")
		expect(p.parse("1.. посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. посланица Коринћанима 1:1'")
		expect(p.parse("1. посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. посланица Коринћанима 1:1'")
		expect(p.parse("I. посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. посланица Коринћанима 1:1'")
		expect(p.parse("1 посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 посланица Коринћанима 1:1'")
		expect(p.parse("I посланица Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I посланица Коринћанима 1:1'")
		expect(p.parse("Прва Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'Прва Коринћанима 1:1'")
		expect(p.parse("1.. Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. Коринћанима 1:1'")
		expect(p.parse("1. Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. Коринћанима 1:1'")
		expect(p.parse("I. Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. Коринћанима 1:1'")
		expect(p.parse("1 Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Коринћанима 1:1'")
		expect(p.parse("I Коринћанима 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I Коринћанима 1:1'")
		expect(p.parse("1 Кор 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 Кор 1:1'")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1Cor 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("1.. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("1. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("I. ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("1 ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("I ПОСЛАНИЦА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I ПОСЛАНИЦА КОРИНЋАНИМА 1:1'")
		expect(p.parse("ПРВА КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'ПРВА КОРИНЋАНИМА 1:1'")
		expect(p.parse("1.. КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1.. КОРИНЋАНИМА 1:1'")
		expect(p.parse("1. КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1. КОРИНЋАНИМА 1:1'")
		expect(p.parse("I. КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I. КОРИНЋАНИМА 1:1'")
		expect(p.parse("1 КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОРИНЋАНИМА 1:1'")
		expect(p.parse("I КОРИНЋАНИМА 1:1").osis()).toEqual("1Cor.1.1", "parsing: 'I КОРИНЋАНИМА 1:1'")
		expect(p.parse("1 КОР 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1 КОР 1:1'")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1", "parsing: '1COR 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Gal (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (sr)", function() {
      
		expect(p.parse("Посланица Галаћанима 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Посланица Галаћанима 1:1'")
		expect(p.parse("Посланица Галатима 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Посланица Галатима 1:1'")
		expect(p.parse("Галаћанима 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Галаћанима 1:1'")
		expect(p.parse("Галатима 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Галатима 1:1'")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Gal 1:1'")
		expect(p.parse("Гал 1:1").osis()).toEqual("Gal.1.1", "parsing: 'Гал 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ГАЛАЋАНИМА 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ПОСЛАНИЦА ГАЛАЋАНИМА 1:1'")
		expect(p.parse("ПОСЛАНИЦА ГАЛАТИМА 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ПОСЛАНИЦА ГАЛАТИМА 1:1'")
		expect(p.parse("ГАЛАЋАНИМА 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛАЋАНИМА 1:1'")
		expect(p.parse("ГАЛАТИМА 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛАТИМА 1:1'")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1", "parsing: 'GAL 1:1'")
		expect(p.parse("ГАЛ 1:1").osis()).toEqual("Gal.1.1", "parsing: 'ГАЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Eph (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (sr)", function() {
      
		expect(p.parse("Посланица Ефесцима 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Посланица Ефесцима 1:1'")
		expect(p.parse("Ефесцима 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Ефесцима 1:1'")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Eph 1:1'")
		expect(p.parse("Еф 1:1").osis()).toEqual("Eph.1.1", "parsing: 'Еф 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ЕФЕСЦИМА 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ПОСЛАНИЦА ЕФЕСЦИМА 1:1'")
		expect(p.parse("ЕФЕСЦИМА 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ЕФЕСЦИМА 1:1'")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1", "parsing: 'EPH 1:1'")
		expect(p.parse("ЕФ 1:1").osis()).toEqual("Eph.1.1", "parsing: 'ЕФ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phil (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (sr)", function() {
      
		expect(p.parse("Посланица Филипљанима 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Посланица Филипљанима 1:1'")
		expect(p.parse("Филибљанима 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Филибљанима 1:1'")
		expect(p.parse("Филипљанима 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Филипљанима 1:1'")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Phil 1:1'")
		expect(p.parse("Флп 1:1").osis()).toEqual("Phil.1.1", "parsing: 'Флп 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ФИЛИПЉАНИМА 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ПОСЛАНИЦА ФИЛИПЉАНИМА 1:1'")
		expect(p.parse("ФИЛИБЉАНИМА 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ФИЛИБЉАНИМА 1:1'")
		expect(p.parse("ФИЛИПЉАНИМА 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ФИЛИПЉАНИМА 1:1'")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1", "parsing: 'PHIL 1:1'")
		expect(p.parse("ФЛП 1:1").osis()).toEqual("Phil.1.1", "parsing: 'ФЛП 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Col (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (sr)", function() {
      
		expect(p.parse("Посланица Колошанима 1:1").osis()).toEqual("Col.1.1", "parsing: 'Посланица Колошанима 1:1'")
		expect(p.parse("Колошанима 1:1").osis()).toEqual("Col.1.1", "parsing: 'Колошанима 1:1'")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1", "parsing: 'Col 1:1'")
		expect(p.parse("Кол 1:1").osis()).toEqual("Col.1.1", "parsing: 'Кол 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА КОЛОШАНИМА 1:1").osis()).toEqual("Col.1.1", "parsing: 'ПОСЛАНИЦА КОЛОШАНИМА 1:1'")
		expect(p.parse("КОЛОШАНИМА 1:1").osis()).toEqual("Col.1.1", "parsing: 'КОЛОШАНИМА 1:1'")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1", "parsing: 'COL 1:1'")
		expect(p.parse("КОЛ 1:1").osis()).toEqual("Col.1.1", "parsing: 'КОЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Thess (sr)", function() {
      
		expect(p.parse("Друга посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Друга посланица Солуњанима 1:1'")
		expect(p.parse("2.. посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. посланица Солуњанима 1:1'")
		expect(p.parse("II. посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. посланица Солуњанима 1:1'")
		expect(p.parse("2. посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. посланица Солуњанима 1:1'")
		expect(p.parse("II посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II посланица Солуњанима 1:1'")
		expect(p.parse("2 посланица Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 посланица Солуњанима 1:1'")
		expect(p.parse("Друга Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'Друга Солуњанима 1:1'")
		expect(p.parse("2.. Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. Солуњанима 1:1'")
		expect(p.parse("II. Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. Солуњанима 1:1'")
		expect(p.parse("2. Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. Солуњанима 1:1'")
		expect(p.parse("II Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II Солуњанима 1:1'")
		expect(p.parse("2 Солуњанима 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Солуњанима 1:1'")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2Thess 1:1'")
		expect(p.parse("2 Сол 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 Сол 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ДРУГА ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("2.. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("II. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("2. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("II ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("2 ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("ДРУГА СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'ДРУГА СОЛУЊАНИМА 1:1'")
		expect(p.parse("2.. СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2.. СОЛУЊАНИМА 1:1'")
		expect(p.parse("II. СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II. СОЛУЊАНИМА 1:1'")
		expect(p.parse("2. СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2. СОЛУЊАНИМА 1:1'")
		expect(p.parse("II СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: 'II СОЛУЊАНИМА 1:1'")
		expect(p.parse("2 СОЛУЊАНИМА 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 СОЛУЊАНИМА 1:1'")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2THESS 1:1'")
		expect(p.parse("2 СОЛ 1:1").osis()).toEqual("2Thess.1.1", "parsing: '2 СОЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Thess (sr)", function() {
      
		expect(p.parse("Прва посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва посланица Солуњанима 1:1'")
		expect(p.parse("1.. посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. посланица Солуњанима 1:1'")
		expect(p.parse("1. посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. посланица Солуњанима 1:1'")
		expect(p.parse("I. посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. посланица Солуњанима 1:1'")
		expect(p.parse("1 посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 посланица Солуњанима 1:1'")
		expect(p.parse("I посланица Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I посланица Солуњанима 1:1'")
		expect(p.parse("Прва Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'Прва Солуњанима 1:1'")
		expect(p.parse("1.. Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. Солуњанима 1:1'")
		expect(p.parse("1. Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. Солуњанима 1:1'")
		expect(p.parse("I. Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. Солуњанима 1:1'")
		expect(p.parse("1 Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Солуњанима 1:1'")
		expect(p.parse("I Солуњанима 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I Солуњанима 1:1'")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1Thess 1:1'")
		expect(p.parse("1 Сол 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 Сол 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("1.. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("1. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("I. ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("1 ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("I ПОСЛАНИЦА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I ПОСЛАНИЦА СОЛУЊАНИМА 1:1'")
		expect(p.parse("ПРВА СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'ПРВА СОЛУЊАНИМА 1:1'")
		expect(p.parse("1.. СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1.. СОЛУЊАНИМА 1:1'")
		expect(p.parse("1. СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1. СОЛУЊАНИМА 1:1'")
		expect(p.parse("I. СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I. СОЛУЊАНИМА 1:1'")
		expect(p.parse("1 СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 СОЛУЊАНИМА 1:1'")
		expect(p.parse("I СОЛУЊАНИМА 1:1").osis()).toEqual("1Thess.1.1", "parsing: 'I СОЛУЊАНИМА 1:1'")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1THESS 1:1'")
		expect(p.parse("1 СОЛ 1:1").osis()).toEqual("1Thess.1.1", "parsing: '1 СОЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Tim (sr)", function() {
      
		expect(p.parse("Друга посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Друга посланица Тимотеју 1:1'")
		expect(p.parse("2.. посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. посланица Тимотеју 1:1'")
		expect(p.parse("II. посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. посланица Тимотеју 1:1'")
		expect(p.parse("2. посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. посланица Тимотеју 1:1'")
		expect(p.parse("II посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II посланица Тимотеју 1:1'")
		expect(p.parse("2 посланица Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 посланица Тимотеју 1:1'")
		expect(p.parse("Друга Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Друга Тимотеју 1:1'")
		expect(p.parse("Друга Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'Друга Тимотију 1:1'")
		expect(p.parse("2.. Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. Тимотеју 1:1'")
		expect(p.parse("2.. Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. Тимотију 1:1'")
		expect(p.parse("II. Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Тимотеју 1:1'")
		expect(p.parse("II. Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. Тимотију 1:1'")
		expect(p.parse("2. Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Тимотеју 1:1'")
		expect(p.parse("2. Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. Тимотију 1:1'")
		expect(p.parse("II Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Тимотеју 1:1'")
		expect(p.parse("II Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II Тимотију 1:1'")
		expect(p.parse("2 Тимотеју 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Тимотеју 1:1'")
		expect(p.parse("2 Тимотију 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Тимотију 1:1'")
		expect(p.parse("2 Тим 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 Тим 1:1'")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2Tim 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ДРУГА ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("2.. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("II. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("2. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("II ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("2 ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("ДРУГА ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ДРУГА ТИМОТЕЈУ 1:1'")
		expect(p.parse("ДРУГА ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'ДРУГА ТИМОТИЈУ 1:1'")
		expect(p.parse("2.. ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. ТИМОТЕЈУ 1:1'")
		expect(p.parse("2.. ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2.. ТИМОТИЈУ 1:1'")
		expect(p.parse("II. ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. ТИМОТЕЈУ 1:1'")
		expect(p.parse("II. ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II. ТИМОТИЈУ 1:1'")
		expect(p.parse("2. ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. ТИМОТЕЈУ 1:1'")
		expect(p.parse("2. ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2. ТИМОТИЈУ 1:1'")
		expect(p.parse("II ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II ТИМОТЕЈУ 1:1'")
		expect(p.parse("II ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: 'II ТИМОТИЈУ 1:1'")
		expect(p.parse("2 ТИМОТЕЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ТИМОТЕЈУ 1:1'")
		expect(p.parse("2 ТИМОТИЈУ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ТИМОТИЈУ 1:1'")
		expect(p.parse("2 ТИМ 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2 ТИМ 1:1'")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1", "parsing: '2TIM 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Tim (sr)", function() {
      
		expect(p.parse("Прва посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прва посланица Тимотеју 1:1'")
		expect(p.parse("1.. посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. посланица Тимотеју 1:1'")
		expect(p.parse("1. посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. посланица Тимотеју 1:1'")
		expect(p.parse("I. посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. посланица Тимотеју 1:1'")
		expect(p.parse("1 посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 посланица Тимотеју 1:1'")
		expect(p.parse("I посланица Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I посланица Тимотеју 1:1'")
		expect(p.parse("Прва Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прва Тимотеју 1:1'")
		expect(p.parse("1.. Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. Тимотеју 1:1'")
		expect(p.parse("1. Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. Тимотеју 1:1'")
		expect(p.parse("I. Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. Тимотеју 1:1'")
		expect(p.parse("1 Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Тимотеју 1:1'")
		expect(p.parse("I Тимотеју 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I Тимотеју 1:1'")
		expect(p.parse("Тимотију 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Тимотију 1:1'")
		expect(p.parse("1 Тим 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 Тим 1:1'")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1Tim 1:1'")
		expect(p.parse("Прва 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'Прва 1:1'")
		expect(p.parse("1.. 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. 1:1'")
		expect(p.parse("1. 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. 1:1'")
		expect(p.parse("I. 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. 1:1'")
		expect(p.parse("1 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 1:1'")
		expect(p.parse("I 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВА ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("1.. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("1. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("I. ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("1 ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("I ПОСЛАНИЦА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I ПОСЛАНИЦА ТИМОТЕЈУ 1:1'")
		expect(p.parse("ПРВА ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВА ТИМОТЕЈУ 1:1'")
		expect(p.parse("1.. ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. ТИМОТЕЈУ 1:1'")
		expect(p.parse("1. ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. ТИМОТЕЈУ 1:1'")
		expect(p.parse("I. ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. ТИМОТЕЈУ 1:1'")
		expect(p.parse("1 ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 ТИМОТЕЈУ 1:1'")
		expect(p.parse("I ТИМОТЕЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I ТИМОТЕЈУ 1:1'")
		expect(p.parse("ТИМОТИЈУ 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ТИМОТИЈУ 1:1'")
		expect(p.parse("1 ТИМ 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 ТИМ 1:1'")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1TIM 1:1'")
		expect(p.parse("ПРВА 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'ПРВА 1:1'")
		expect(p.parse("1.. 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1.. 1:1'")
		expect(p.parse("1. 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1. 1:1'")
		expect(p.parse("I. 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I. 1:1'")
		expect(p.parse("1 1:1").osis()).toEqual("1Tim.1.1", "parsing: '1 1:1'")
		expect(p.parse("I 1:1").osis()).toEqual("1Tim.1.1", "parsing: 'I 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Titus (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (sr)", function() {
      
		expect(p.parse("Посланица Титу 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Посланица Титу 1:1'")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Titus 1:1'")
		expect(p.parse("Титу 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Титу 1:1'")
		expect(p.parse("Тит 1:1").osis()).toEqual("Titus.1.1", "parsing: 'Тит 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ТИТУ 1:1").osis()).toEqual("Titus.1.1", "parsing: 'ПОСЛАНИЦА ТИТУ 1:1'")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1", "parsing: 'TITUS 1:1'")
		expect(p.parse("ТИТУ 1:1").osis()).toEqual("Titus.1.1", "parsing: 'ТИТУ 1:1'")
		expect(p.parse("ТИТ 1:1").osis()).toEqual("Titus.1.1", "parsing: 'ТИТ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Phlm (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (sr)", function() {
      
		expect(p.parse("Посланица Филимону 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Посланица Филимону 1:1'")
		expect(p.parse("Филимону 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Филимону 1:1'")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Phlm 1:1'")
		expect(p.parse("Фил 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'Фил 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ФИЛИМОНУ 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ПОСЛАНИЦА ФИЛИМОНУ 1:1'")
		expect(p.parse("ФИЛИМОНУ 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ФИЛИМОНУ 1:1'")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'PHLM 1:1'")
		expect(p.parse("ФИЛ 1:1").osis()).toEqual("Phlm.1.1", "parsing: 'ФИЛ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Heb (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (sr)", function() {
      
		expect(p.parse("Посланица Јеврејима 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Посланица Јеврејима 1:1'")
		expect(p.parse("Jevrejima 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Jevrejima 1:1'")
		expect(p.parse("Јеврејима 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Јеврејима 1:1'")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Heb 1:1'")
		expect(p.parse("Јев 1:1").osis()).toEqual("Heb.1.1", "parsing: 'Јев 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ЈЕВРЕЈИМА 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ПОСЛАНИЦА ЈЕВРЕЈИМА 1:1'")
		expect(p.parse("JEVREJIMA 1:1").osis()).toEqual("Heb.1.1", "parsing: 'JEVREJIMA 1:1'")
		expect(p.parse("ЈЕВРЕЈИМА 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ЈЕВРЕЈИМА 1:1'")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1", "parsing: 'HEB 1:1'")
		expect(p.parse("ЈЕВ 1:1").osis()).toEqual("Heb.1.1", "parsing: 'ЈЕВ 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jas (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (sr)", function() {
      
		expect(p.parse("Посланица Јаковљева 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Посланица Јаковљева 1:1'")
		expect(p.parse("Јаковљева 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Јаковљева 1:1'")
		expect(p.parse("Јаковова 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Јаковова 1:1'")
		expect(p.parse("Јаков 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Јаков 1:1'")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Jas 1:1'")
		expect(p.parse("Јак 1:1").osis()).toEqual("Jas.1.1", "parsing: 'Јак 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ЈАКОВЉЕВА 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ПОСЛАНИЦА ЈАКОВЉЕВА 1:1'")
		expect(p.parse("ЈАКОВЉЕВА 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ЈАКОВЉЕВА 1:1'")
		expect(p.parse("ЈАКОВОВА 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ЈАКОВОВА 1:1'")
		expect(p.parse("ЈАКОВ 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ЈАКОВ 1:1'")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1", "parsing: 'JAS 1:1'")
		expect(p.parse("ЈАК 1:1").osis()).toEqual("Jas.1.1", "parsing: 'ЈАК 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Pet (sr)", function() {
      
		expect(p.parse("Друга посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Друга посланица Петрова 1:1'")
		expect(p.parse("2.. посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. посланица Петрова 1:1'")
		expect(p.parse("II. посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. посланица Петрова 1:1'")
		expect(p.parse("2. посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. посланица Петрова 1:1'")
		expect(p.parse("II посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II посланица Петрова 1:1'")
		expect(p.parse("2 посланица Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 посланица Петрова 1:1'")
		expect(p.parse("Друга Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'Друга Петрова 1:1'")
		expect(p.parse("2.. Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. Петрова 1:1'")
		expect(p.parse("II. Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. Петрова 1:1'")
		expect(p.parse("2. Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. Петрова 1:1'")
		expect(p.parse("II Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II Петрова 1:1'")
		expect(p.parse("2 Петрова 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Петрова 1:1'")
		expect(p.parse("2 Петр 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Петр 1:1'")
		expect(p.parse("2 Пет 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 Пет 1:1'")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2Pet 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ДРУГА ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ДРУГА ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("2.. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("II. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("2. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("II ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("2 ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("ДРУГА ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'ДРУГА ПЕТРОВА 1:1'")
		expect(p.parse("2.. ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2.. ПЕТРОВА 1:1'")
		expect(p.parse("II. ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II. ПЕТРОВА 1:1'")
		expect(p.parse("2. ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2. ПЕТРОВА 1:1'")
		expect(p.parse("II ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: 'II ПЕТРОВА 1:1'")
		expect(p.parse("2 ПЕТРОВА 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПЕТРОВА 1:1'")
		expect(p.parse("2 ПЕТР 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПЕТР 1:1'")
		expect(p.parse("2 ПЕТ 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2 ПЕТ 1:1'")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1", "parsing: '2PET 1:1'")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Pet (sr)", function() {
      
		expect(p.parse("Прва посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва посланица Петрова 1:1'")
		expect(p.parse("1.. посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. посланица Петрова 1:1'")
		expect(p.parse("1. посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. посланица Петрова 1:1'")
		expect(p.parse("I. посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. посланица Петрова 1:1'")
		expect(p.parse("1 посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 посланица Петрова 1:1'")
		expect(p.parse("I посланица Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I посланица Петрова 1:1'")
		expect(p.parse("Прва Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'Прва Петрова 1:1'")
		expect(p.parse("1.. Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. Петрова 1:1'")
		expect(p.parse("1. Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. Петрова 1:1'")
		expect(p.parse("I. Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. Петрова 1:1'")
		expect(p.parse("1 Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Петрова 1:1'")
		expect(p.parse("I Петрова 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I Петрова 1:1'")
		expect(p.parse("1 Петр 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Петр 1:1'")
		expect(p.parse("1 Пет 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 Пет 1:1'")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1Pet 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПРВА ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("1.. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("1. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("I. ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("1 ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("I ПОСЛАНИЦА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПОСЛАНИЦА ПЕТРОВА 1:1'")
		expect(p.parse("ПРВА ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'ПРВА ПЕТРОВА 1:1'")
		expect(p.parse("1.. ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1.. ПЕТРОВА 1:1'")
		expect(p.parse("1. ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1. ПЕТРОВА 1:1'")
		expect(p.parse("I. ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I. ПЕТРОВА 1:1'")
		expect(p.parse("1 ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПЕТРОВА 1:1'")
		expect(p.parse("I ПЕТРОВА 1:1").osis()).toEqual("1Pet.1.1", "parsing: 'I ПЕТРОВА 1:1'")
		expect(p.parse("1 ПЕТР 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПЕТР 1:1'")
		expect(p.parse("1 ПЕТ 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1 ПЕТ 1:1'")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1", "parsing: '1PET 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jude (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (sr)", function() {
      
		expect(p.parse("Посланица Јудина 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Посланица Јудина 1:1'")
		expect(p.parse("Јаковљевог 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Јаковљевог 1:1'")
		expect(p.parse("Јудина 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Јудина 1:1'")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Jude 1:1'")
		expect(p.parse("Јуде 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Јуде 1:1'")
		expect(p.parse("Јд 1:1").osis()).toEqual("Jude.1.1", "parsing: 'Јд 1:1'")
		p.include_apocrypha(false)
		expect(p.parse("ПОСЛАНИЦА ЈУДИНА 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ПОСЛАНИЦА ЈУДИНА 1:1'")
		expect(p.parse("ЈАКОВЉЕВОГ 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ЈАКОВЉЕВОГ 1:1'")
		expect(p.parse("ЈУДИНА 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ЈУДИНА 1:1'")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1", "parsing: 'JUDE 1:1'")
		expect(p.parse("ЈУДЕ 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ЈУДЕ 1:1'")
		expect(p.parse("ЈД 1:1").osis()).toEqual("Jude.1.1", "parsing: 'ЈД 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Tob (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (sr)", function() {
      
		expect(p.parse("Књига Товијина 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Књига Товијина 1:1'")
		expect(p.parse("Тобија 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Тобија 1:1'")
		expect(p.parse("Товит 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Товит 1:1'")
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Tob 1:1'")
		expect(p.parse("Тов 1:1").osis()).toEqual("Tob.1.1", "parsing: 'Тов 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Jdt (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (sr)", function() {
      
		expect(p.parse("Књига о Јудити 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Књига о Јудити 1:1'")
		expect(p.parse("Јудита 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Јудита 1:1'")
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Jdt 1:1'")
		expect(p.parse("Јуд 1:1").osis()).toEqual("Jdt.1.1", "parsing: 'Јуд 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Bar (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (sr)", function() {
      
		expect(p.parse("Барух 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Барух 1:1'")
		expect(p.parse("Варух 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Варух 1:1'")
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Bar 1:1'")
		expect(p.parse("Вар 1:1").osis()).toEqual("Bar.1.1", "parsing: 'Вар 1:1'")
		;
      return true;
    });
  });

  describe("Localized book Sus (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (sr)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1", "parsing: 'Sus 1:1'")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["sr"]);
    });
    it("should handle ranges (sr)", function() {
      expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2", "parsing: 'Titus 1:1 - 2'");
      expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2", "parsing: 'Matt 1-2'");
      return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3", "parsing: 'Phlm 2 - 3'");
    });
    it("should handle chapters (sr)", function() {
      expect(p.parse("Titus 1:1, поглавља 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, поглавља 2'");
      expect(p.parse("Matt 3:4 ПОГЛАВЉА 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 ПОГЛАВЉА 6'");
      expect(p.parse("Titus 1:1, глава 2").osis()).toEqual("Titus.1.1,Titus.2", "parsing: 'Titus 1:1, глава 2'");
      return expect(p.parse("Matt 3:4 ГЛАВА 6").osis()).toEqual("Matt.3.4,Matt.6", "parsing: 'Matt 3:4 ГЛАВА 6'");
    });
    it("should handle verses (sr)", function() {
      expect(p.parse("Exod 1:1 стихови 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 стихови 3'");
      expect(p.parse("Phlm СТИХОВИ 6").osis()).toEqual("Phlm.1.6", "parsing: 'Phlm СТИХОВИ 6'");
      expect(p.parse("Exod 1:1 стих 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 стих 3'");
      return expect(p.parse("Phlm СТИХ 6").osis()).toEqual("Phlm.1.6", "parsing: 'Phlm СТИХ 6'");
    });
    it("should handle 'and' (sr)", function() {
      expect(p.parse("Exod 1:1 и 3").osis()).toEqual("Exod.1.1,Exod.1.3", "parsing: 'Exod 1:1 и 3'");
      return expect(p.parse("Phlm 2 И 6").osis()).toEqual("Phlm.1.2,Phlm.1.6", "parsing: 'Phlm 2 И 6'");
    });
    it("should handle titles (sr)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'Ps 3 title, 4:2, 5:title'");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1", "parsing: 'PS 3 TITLE, 4:2, 5:TITLE'");
    });
    it("should handle 'ff' (sr)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'Rev 3ff, 4:2ff'");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11", "parsing: 'REV 3 FF, 4:2 FF'");
    });
    it("should handle translations (sr)", function() {
      expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
      return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
    });
    it("should handle book ranges (sr)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("Прва - Трећом  Јованова").osis()).toEqual("1John.1-3John.1", "parsing: 'Прва - Трећом  Јованова'");
    });
    return it("should handle boundaries (sr)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28", "parsing: '\u2014Matt\u2014'");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1", "parsing: '\u201cMatt 1:1\u201d'");
    });
  });

}).call(this);
